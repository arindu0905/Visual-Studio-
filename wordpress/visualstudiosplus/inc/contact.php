<?php
/**
 * Contact form handler. Unlike the static site (which opened the visitor's
 * email app), enquiries are emailed to the Customizer address with wp_mail().
 * Works with JS (AJAX, no reload) and without (normal POST + redirect).
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_ajax_vsp_contact', 'vsp_handle_contact' );
add_action( 'wp_ajax_nopriv_vsp_contact', 'vsp_handle_contact' );
add_action( 'admin_post_vsp_contact', 'vsp_handle_contact' );
add_action( 'admin_post_nopriv_vsp_contact', 'vsp_handle_contact' );

function vsp_handle_contact() {
	$ajax = wp_doing_ajax();
	$back = wp_get_referer() ? wp_get_referer() : vsp_page_url( 'contact' );

	$finish = function ( $ok, $message ) use ( $ajax, $back ) {
		if ( $ajax ) {
			$ok ? wp_send_json_success( array( 'message' => $message ) ) : wp_send_json_error( array( 'message' => $message ), 400 );
		}
		wp_safe_redirect( add_query_arg( 'enquiry', $ok ? 'sent' : 'error', remove_query_arg( 'enquiry', $back ) ) . '#enquiry' );
		exit;
	};

	if ( ! isset( $_POST['vsp_contact_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['vsp_contact_nonce'] ), 'vsp_contact' ) ) {
		$finish( false, __( 'Your session expired — please reload the page and try again.', 'vsp' ) );
	}

	// Honeypot: real visitors never see or fill this field.
	if ( ! empty( $_POST['website'] ) ) {
		$finish( true, __( 'Thank you — we’ll be in touch shortly.', 'vsp' ) );
	}

	$name      = sanitize_text_field( wp_unslash( isset( $_POST['name'] ) ? $_POST['name'] : '' ) );
	$email     = sanitize_email( wp_unslash( isset( $_POST['email'] ) ? $_POST['email'] : '' ) );
	$company   = sanitize_text_field( wp_unslash( isset( $_POST['company'] ) ? $_POST['company'] : '' ) );
	$message   = sanitize_textarea_field( wp_unslash( isset( $_POST['message'] ) ? $_POST['message'] : '' ) );
	$interests = isset( $_POST['interests'] ) ? array_map( 'sanitize_text_field', (array) wp_unslash( $_POST['interests'] ) ) : array();

	if ( ! $name || ! is_email( $email ) || ! $message ) {
		$finish( false, __( 'Please fill in your name, a valid email and a message.', 'vsp' ) );
	}

	$lines = array_filter(
		array(
			'Name: ' . $name,
			'Email: ' . $email,
			$company ? 'Company: ' . $company : '',
			$interests ? 'Interested in: ' . implode( ', ', $interests ) : '',
		)
	);
	$body  = implode( "\n", $lines ) . "\n\n" . $message;
	$to    = vsp_site()['contact']['email'];
	$sent  = wp_mail(
		$to,
		sprintf( 'New project enquiry — %s', $name ),
		$body,
		array( 'Reply-To: ' . $name . ' <' . $email . '>' )
	);

	/** Fires after an enquiry is submitted, e.g. to store it in a CRM. */
	do_action( 'vsp_contact_submitted', compact( 'name', 'email', 'company', 'message', 'interests' ), $sent );

	if ( ! $sent ) {
		/* translators: %s: studio email address */
		$finish( false, sprintf( __( 'Sorry, the message could not be sent. Please email us at %s.', 'vsp' ), $to ) );
	}
	$finish( true, __( 'Thank you — your enquiry has been sent. We’ll be in touch shortly.', 'vsp' ) );
}
