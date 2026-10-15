<?php
/**
 * Customizer: Appearance → Customize → “Visual Studios Plus”.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'customize_register',
	function ( WP_Customize_Manager $wp ) {
		$d = vsp_default_site();

		$wp->add_panel( 'vsp', array( 'title' => __( 'Visual Studios Plus', 'vsp' ), 'priority' => 30 ) );

		$sections = array(
			'vsp_hero'    => __( 'Hero & intro', 'vsp' ),
			'vsp_about'   => __( 'About & videography', 'vsp' ),
			'vsp_contact' => __( 'Contact details', 'vsp' ),
			'vsp_social'  => __( 'Social links', 'vsp' ),
			'vsp_media'   => __( 'Showreel', 'vsp' ),
		);
		foreach ( $sections as $id => $title ) {
			$wp->add_section( $id, array( 'title' => $title, 'panel' => 'vsp' ) );
		}

		$add = function ( $key, $section, $label, $type, $default, $description = '' ) use ( $wp ) {
			$sanitize = array(
				'text'     => 'sanitize_text_field',
				'textarea' => 'sanitize_textarea_field',
				'email'    => 'sanitize_email',
				'url'      => 'esc_url_raw',
				'number'   => 'vsp_sanitize_number',
			);
			$wp->add_setting(
				'vsp_' . $key,
				array(
					'default'           => $default,
					'sanitize_callback' => $sanitize[ $type ],
				)
			);
			$wp->add_control(
				'vsp_' . $key,
				array(
					'label'       => $label,
					'section'     => $section,
					'type'        => $type,
					'description' => $description,
				)
			);
		};

		$add( 'eyebrow', 'vsp_hero', __( 'Hero — small label', 'vsp' ), 'text', $d['eyebrow'] );
		$add( 'headline_lead', 'vsp_hero', __( 'Headline — first line', 'vsp' ), 'text', $d['headline']['lead'] );
		$add( 'headline_rotating', 'vsp_hero', __( 'Headline — accent line', 'vsp' ), 'text', implode( ', ', $d['headline']['rotating'] ), __( 'Shown in the accent colour. Several words separated by commas rotate.', 'vsp' ) );
		$add( 'headline_tail', 'vsp_hero', __( 'Headline — last line', 'vsp' ), 'text', $d['headline']['tail'] );
		$add( 'intro', 'vsp_hero', __( 'Hero — intro paragraph', 'vsp' ), 'textarea', $d['intro'] );
		$add( 'tagline', 'vsp_hero', __( 'Tagline (footer & social sharing)', 'vsp' ), 'textarea', $d['tagline'] );
		$add( 'short_name', 'vsp_hero', __( 'Short name (logo alt text)', 'vsp' ), 'text', $d['short_name'] );
		$add( 'description', 'vsp_hero', __( 'Search engine description', 'vsp' ), 'textarea', $d['description'], __( 'Used when no SEO plugin is active.', 'vsp' ) );

		$add( 'about_statement', 'vsp_about', __( 'About — statement', 'vsp' ), 'textarea', $d['about']['statement'] );
		$add( 'about_body', 'vsp_about', __( 'About — body', 'vsp' ), 'textarea', $d['about']['body'] );
		$add( 'video_statement', 'vsp_about', __( 'Videography statement', 'vsp' ), 'textarea', $d['videography']['statement'] );
		$add( 'manifesto', 'vsp_about', __( 'Manifesto', 'vsp' ), 'textarea', implode( "\n", $d['videography']['manifesto'] ), __( 'One line each.', 'vsp' ) );

		$add( 'email', 'vsp_contact', __( 'Email', 'vsp' ), 'email', $d['contact']['email'], __( 'Enquiries from the contact form are sent here.', 'vsp' ) );
		$add( 'phones', 'vsp_contact', __( 'Phone numbers', 'vsp' ), 'textarea', implode( "\n", $d['contact']['phones'] ), __( 'One per line.', 'vsp' ) );
		$add( 'address', 'vsp_contact', __( 'Studio address', 'vsp' ), 'textarea', implode( "\n", $d['contact']['address'] ), __( 'One line each.', 'vsp' ) );

		foreach ( vsp_default_socials() as $key => $s ) {
			$add( 'social_' . $key, 'vsp_social', $s[0], 'url', $s[1] );
		}

		$wp->add_setting( 'vsp_showreel', array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
		$wp->add_control(
			new WP_Customize_Upload_Control(
				$wp,
				'vsp_showreel',
				array(
					'label'       => __( 'Showreel video (MP4)', 'vsp' ),
					'section'     => 'vsp_media',
					'mime_type'   => 'video',
					'description' => __( 'Leave empty to use the bundled showreel.', 'vsp' ),
				)
			)
		);
		$wp->add_setting( 'vsp_poster', array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
		$wp->add_control(
			new WP_Customize_Image_Control(
				$wp,
				'vsp_poster',
				array(
					'label'   => __( 'Showreel poster image', 'vsp' ),
					'section' => 'vsp_media',
				)
			)
		);
		$add( 'loop_start', 'vsp_media', __( 'Hero loop — start (seconds)', 'vsp' ), 'number', $d['media']['showreel_loop'][0] );
		$add( 'loop_end', 'vsp_media', __( 'Hero loop — end (seconds)', 'vsp' ), 'number', $d['media']['showreel_loop'][1] );
	}
);

function vsp_sanitize_number( $v ) {
	return is_numeric( $v ) ? $v + 0 : '';
}
