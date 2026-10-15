<?php
/**
 * Editable content: Films (public, at /work/), Services, Clients and Photographs.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'vsp_register_post_types' );

function vsp_register_post_types() {
	register_post_type(
		'vsp_project',
		array(
			'labels'       => array(
				'name'          => __( 'Films', 'vsp' ),
				'singular_name' => __( 'Film', 'vsp' ),
				'add_new_item'  => __( 'Add new film', 'vsp' ),
				'edit_item'     => __( 'Edit film', 'vsp' ),
				'all_items'     => __( 'All films', 'vsp' ),
			),
			'public'       => true,
			'has_archive'  => 'work',
			'rewrite'      => array( 'slug' => 'work', 'with_front' => false ),
			'menu_icon'    => 'dashicons-video-alt3',
			'menu_position' => 21,
			'supports'     => array( 'title', 'excerpt', 'thumbnail', 'page-attributes' ),
			'show_in_rest' => true,
		)
	);

	$private = array(
		'public'             => false,
		'show_ui'            => true,
		'show_in_nav_menus'  => false,
		'publicly_queryable' => false,
		'exclude_from_search' => true,
		'show_in_rest'       => true,
	);

	register_post_type(
		'vsp_service',
		$private + array(
			'labels'        => array(
				'name'          => __( 'Services', 'vsp' ),
				'singular_name' => __( 'Service', 'vsp' ),
				'add_new_item'  => __( 'Add new service', 'vsp' ),
				'edit_item'     => __( 'Edit service', 'vsp' ),
			),
			'menu_icon'     => 'dashicons-lightbulb',
			'menu_position' => 22,
			'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
		)
	);

	register_post_type(
		'vsp_photo',
		$private + array(
			'labels'        => array(
				'name'          => __( 'Photographs', 'vsp' ),
				'singular_name' => __( 'Photograph', 'vsp' ),
				'add_new_item'  => __( 'Add new photograph', 'vsp' ),
				'edit_item'     => __( 'Edit photograph', 'vsp' ),
			),
			'menu_icon'     => 'dashicons-format-gallery',
			'menu_position' => 23,
			'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
		)
	);

	register_post_type(
		'vsp_client',
		$private + array(
			'labels'        => array(
				'name'          => __( 'Clients', 'vsp' ),
				'singular_name' => __( 'Client', 'vsp' ),
				'add_new_item'  => __( 'Add new client', 'vsp' ),
				'edit_item'     => __( 'Edit client', 'vsp' ),
				'featured_image' => __( 'Logo', 'vsp' ),
				'set_featured_image' => __( 'Set logo', 'vsp' ),
			),
			'menu_icon'     => 'dashicons-groups',
			'menu_position' => 24,
			'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
		)
	);

	register_post_type(
		'vsp_case',
		$private + array(
			'labels'        => array(
				'name'          => __( 'Case studies', 'vsp' ),
				'singular_name' => __( 'Case study', 'vsp' ),
				'add_new_item'  => __( 'Add new case study', 'vsp' ),
				'edit_item'     => __( 'Edit case study', 'vsp' ),
			),
			'menu_icon'     => 'dashicons-chart-line',
			'menu_position' => 22,
			'supports'      => array( 'title', 'page-attributes' ),
		)
	);

	register_taxonomy(
		'vsp_photo_cat',
		'vsp_photo',
		array(
			'labels'            => array(
				'name'          => __( 'Photo categories', 'vsp' ),
				'singular_name' => __( 'Photo category', 'vsp' ),
			),
			'public'            => false,
			'show_ui'           => true,
			'show_admin_column' => true,
			'hierarchical'      => true,
			'show_in_rest'      => true,
		)
	);
}

/** Show items in the order they appear on the site (Page Attributes → Order). */
add_action(
	'pre_get_posts',
	function ( $q ) {
		if ( ! is_admin() || ! $q->is_main_query() ) {
			return;
		}
		$type = $q->get( 'post_type' );
		if ( in_array( $type, array( 'vsp_project', 'vsp_service', 'vsp_photo', 'vsp_client', 'vsp_case' ), true ) && ! $q->get( 'orderby' ) ) {
			$q->set( 'orderby', array( 'menu_order' => 'ASC', 'date' => 'ASC' ) );
		}
	}
);

/** Thumbnail column in the admin lists. */
foreach ( array( 'vsp_project', 'vsp_service', 'vsp_photo', 'vsp_client', 'vsp_case' ) as $vsp_type ) {
	add_filter(
		"manage_{$vsp_type}_posts_columns",
		function ( $cols ) {
			return array_slice( $cols, 0, 1, true ) + array( 'vsp_thumb' => '' ) + $cols;
		}
	);
	add_action(
		"manage_{$vsp_type}_posts_custom_column",
		function ( $col, $post_id ) {
			if ( 'vsp_thumb' !== $col ) {
				return;
			}
			$img = vsp_post_image( $post_id );
			if ( $img ) {
				printf( '<img src="%s" alt="" style="width:64px;height:44px;object-fit:cover;background:#1b1b1b">', esc_url( $img['src'] ) );
			}
		},
		10,
		2
	);
}
unset( $vsp_type );

add_action(
	'admin_head',
	function () {
		echo '<style>.column-vsp_thumb{width:72px}</style>';
	}
);
