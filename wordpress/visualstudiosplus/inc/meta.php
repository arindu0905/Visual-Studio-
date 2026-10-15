<?php
/**
 * Meta boxes for the theme's post types. No plugin required.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

/** Field definitions per post type: key => [label, type, help]. */
function vsp_meta_fields( $type ) {
	$image = array( __( 'Fallback image', 'vsp' ), 'text', __( 'Used when no featured image is set. A file name from the theme’s media folder or a full URL.', 'vsp' ) );
	$fields = array(
		'vsp_project' => array(
			'client'      => array( __( 'Client', 'vsp' ), 'text', '' ),
			'category'    => array( __( 'Format', 'vsp' ), 'text', __( 'e.g. Hospitality Film', 'vsp' ) ),
			'youtube_id'  => array( __( 'YouTube video ID', 'vsp' ), 'text', __( 'The part after “watch?v=”. Its poster frame is used as the cover unless a featured image is set.', 'vsp' ) ),
			'cover_alt'   => array( __( 'Cover description (alt text)', 'vsp' ), 'text', '' ),
			'letterboxed' => array( __( 'Video is letterboxed', 'vsp' ), 'checkbox', __( 'Zooms the poster slightly to hide black bars.', 'vsp' ) ),
		),
		'vsp_service' => array(
			'summary'   => array( __( 'Summary', 'vsp' ), 'textarea', '' ),
			'scope'     => array( __( 'What’s included', 'vsp' ), 'textarea', __( 'One item per line.', 'vsp' ) ),
			'link'      => array( __( '“See the work” link', 'vsp' ), 'text', __( 'Optional, e.g. /work/', 'vsp' ) ),
			'image_alt' => array( __( 'Image description (alt text)', 'vsp' ), 'text', '' ),
			'image'     => $image,
		),
		'vsp_photo'   => array(
			'image'  => $image,
			'width'  => array( __( 'Fallback image width', 'vsp' ), 'number', '' ),
			'height' => array( __( 'Fallback image height', 'vsp' ), 'number', '' ),
		),
		'vsp_client'  => array(
			'category' => array( __( 'Sector', 'vsp' ), 'text', __( 'e.g. Luxury Hospitality', 'vsp' ) ),
			'color'    => array( __( 'Keep original logo colours', 'vsp' ), 'checkbox', __( 'Logos are shown in white on the dark background. Tick this for logos with a solid shape that would turn into a white block.', 'vsp' ) ),
			'image'    => $image,
		),
		'vsp_case'    => array(
			'client'       => array( __( 'Client', 'vsp' ), 'text', '' ),
			'tagline'      => array( __( 'Tagline', 'vsp' ), 'text', '' ),
			'type'         => array( __( 'Type', 'vsp' ), 'text', __( 'e.g. Digital Case Study, Digital Retainer, Branding Project, TVC Campaign', 'vsp' ) ),
			'year'         => array( __( 'Year', 'vsp' ), 'text', '' ),
			'metric'       => array( __( 'Headline result', 'vsp' ), 'text', __( 'e.g. +142%', 'vsp' ) ),
			'metric_label' => array( __( 'Result label', 'vsp' ), 'text', __( 'e.g. Social Engagement Lift', 'vsp' ) ),
			'tags'         => array( __( 'Tags', 'vsp' ), 'textarea', __( 'One per line.', 'vsp' ) ),
			'summary'      => array( __( 'Summary', 'vsp' ), 'textarea', __( 'Shown when the case study is featured on the homepage (the first three).', 'vsp' ) ),
		),
	);
	return isset( $fields[ $type ] ) ? $fields[ $type ] : array();
}

add_action(
	'add_meta_boxes',
	function () {
		foreach ( array( 'vsp_project', 'vsp_service', 'vsp_photo', 'vsp_client', 'vsp_case' ) as $type ) {
			add_meta_box( 'vsp_details', __( 'Details', 'vsp' ), 'vsp_render_meta_box', $type, 'normal', 'high' );
		}
	}
);

function vsp_render_meta_box( $post ) {
	wp_nonce_field( 'vsp_meta', 'vsp_meta_nonce' );
	echo '<table class="form-table" role="presentation"><tbody>';
	foreach ( vsp_meta_fields( $post->post_type ) as $key => $f ) {
		list( $label, $type, $help ) = $f;
		$id    = 'vsp_' . $key;
		$value = get_post_meta( $post->ID, '_vsp_' . $key, true );
		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
		if ( 'textarea' === $type ) {
			printf( '<textarea id="%1$s" name="%1$s" rows="4" class="large-text">%2$s</textarea>', esc_attr( $id ), esc_textarea( $value ) );
		} elseif ( 'checkbox' === $type ) {
			printf( '<input type="checkbox" id="%1$s" name="%1$s" value="1" %2$s>', esc_attr( $id ), checked( $value, '1', false ) );
		} else {
			printf( '<input type="%3$s" id="%1$s" name="%1$s" value="%2$s" class="regular-text">', esc_attr( $id ), esc_attr( $value ), esc_attr( $type ) );
		}
		if ( $help ) {
			echo '<p class="description">' . esc_html( $help ) . '</p>';
		}
		echo '</td></tr>';
	}
	echo '</tbody></table>';
	if ( 'vsp_project' === $post->post_type ) {
		echo '<p class="description">' . esc_html__( 'The Excerpt is used as the film’s description.', 'vsp' ) . '</p>';
	}
	if ( 'vsp_photo' === $post->post_type ) {
		echo '<p class="description">' . esc_html__( 'The title is used as the photo’s description (alt text). Pick its category in the sidebar.', 'vsp' ) . '</p>';
	}
}

add_action(
	'save_post',
	function ( $post_id, $post ) {
		if ( ! isset( $_POST['vsp_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['vsp_meta_nonce'] ), 'vsp_meta' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		foreach ( vsp_meta_fields( $post->post_type ) as $key => $f ) {
			$name = 'vsp_' . $key;
			$raw  = isset( $_POST[ $name ] ) ? wp_unslash( $_POST[ $name ] ) : '';
			switch ( $f[1] ) {
				case 'checkbox':
					$val = $raw ? '1' : '';
					break;
				case 'textarea':
					$val = sanitize_textarea_field( $raw );
					break;
				case 'number':
					$val = '' === $raw ? '' : absint( $raw );
					break;
				default:
					$val = sanitize_text_field( $raw );
			}
			update_post_meta( $post_id, '_vsp_' . $key, $val );
		}
	},
	10,
	2
);
