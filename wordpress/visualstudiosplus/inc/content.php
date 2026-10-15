<?php
/**
 * Content getters. Each returns the same shape as the Next.js data files, read
 * from the Customizer / post types, falling back to the defaults.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

/** Split a textarea / comma list into trimmed, non-empty items. */
function vsp_lines( $text, $sep = "\n" ) {
	if ( is_array( $text ) ) {
		return $text;
	}
	return array_values( array_filter( array_map( 'trim', explode( $sep, (string) $text ) ), 'strlen' ) );
}

function vsp_mod( $key, $default ) {
	$v = get_theme_mod( 'vsp_' . $key, '' );
	return ( '' === $v || null === $v ) ? $default : $v;
}

function vsp_site() {
	static $site = null;
	if ( null !== $site ) {
		return $site;
	}
	$d    = vsp_default_site();
	$site = array(
		'name'        => get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : $d['name'],
		'short_name'  => vsp_mod( 'short_name', $d['short_name'] ),
		'tagline'     => vsp_mod( 'tagline', $d['tagline'] ),
		'eyebrow'     => vsp_mod( 'eyebrow', $d['eyebrow'] ),
		'intro'       => vsp_mod( 'intro', $d['intro'] ),
		'headline'    => array(
			'lead'     => vsp_mod( 'headline_lead', $d['headline']['lead'] ),
			'rotating' => vsp_lines( vsp_mod( 'headline_rotating', implode( ', ', $d['headline']['rotating'] ) ), ',' ),
			'tail'     => vsp_mod( 'headline_tail', $d['headline']['tail'] ),
		),
		'description' => vsp_mod( 'description', $d['description'] ),
		'about'       => array(
			'statement' => vsp_mod( 'about_statement', $d['about']['statement'] ),
			'body'      => vsp_mod( 'about_body', $d['about']['body'] ),
		),
		'videography' => array(
			'statement' => vsp_mod( 'video_statement', $d['videography']['statement'] ),
			'manifesto' => vsp_lines( vsp_mod( 'manifesto', implode( "\n", $d['videography']['manifesto'] ) ) ),
		),
		'contact'     => array(
			'email'   => vsp_mod( 'email', $d['contact']['email'] ),
			'phones'  => vsp_lines( vsp_mod( 'phones', implode( "\n", $d['contact']['phones'] ) ) ),
			'address' => vsp_lines( vsp_mod( 'address', implode( "\n", $d['contact']['address'] ) ) ),
		),
		'media'       => array(
			'logo'          => $d['media']['logo'],
			'showreel'      => vsp_mod( 'showreel', $d['media']['showreel'] ),
			'showreel_loop' => array( (float) vsp_mod( 'loop_start', $d['media']['showreel_loop'][0] ), (float) vsp_mod( 'loop_end', $d['media']['showreel_loop'][1] ) ),
			'poster'        => vsp_mod( 'poster', $d['media']['poster'] ),
		),
	);

	$logo_id = get_theme_mod( 'custom_logo' );
	if ( $logo_id ) {
		$src = wp_get_attachment_image_url( $logo_id, 'full' );
		if ( $src ) {
			$site['media']['logo'] = $src;
		}
	}
	return $site;
}

/** @return array<int, array{label: string, href: string}> */
function vsp_socials() {
	$out = array();
	foreach ( vsp_default_socials() as $key => $s ) {
		$href = vsp_mod( 'social_' . $key, $s[1] );
		if ( $href ) {
			$out[] = array( 'label' => $s[0], 'href' => $href );
		}
	}
	return $out;
}

function vsp_tel( $phone ) {
	return 'tel:' . preg_replace( '/\s+/', '', $phone );
}

/** Featured image, else the `_vsp_image` fallback (theme file name or URL). */
function vsp_post_image( $post_id, $size = 'full' ) {
	$thumb = get_post_thumbnail_id( $post_id );
	if ( $thumb ) {
		$img = wp_get_attachment_image_src( $thumb, $size );
		if ( $img ) {
			return array( 'src' => $img[0], 'width' => (int) $img[1], 'height' => (int) $img[2], 'id' => (int) $thumb );
		}
	}
	$file = get_post_meta( $post_id, '_vsp_image', true );
	if ( $file ) {
		return array(
			'src'    => vsp_asset( $file ),
			'width'  => (int) get_post_meta( $post_id, '_vsp_width', true ),
			'height' => (int) get_post_meta( $post_id, '_vsp_height', true ),
			'id'     => 0,
		);
	}
	if ( 'vsp_project' === get_post_type( $post_id ) ) {
		$yt = get_post_meta( $post_id, '_vsp_youtube_id', true );
		if ( $yt ) {
			return array( 'src' => vsp_youtube_thumb( $yt ), 'width' => 1280, 'height' => 720, 'id' => 0 );
		}
	}
	return null;
}

function vsp_query_type( $type ) {
	return get_posts(
		array(
			'post_type'        => $type,
			'post_status'      => 'publish',
			'posts_per_page'   => -1,
			'orderby'          => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
			'suppress_filters' => false,
		)
	);
}

function vsp_projects() {
	static $list = null;
	if ( null !== $list ) {
		return $list;
	}
	$list = array_map( 'vsp_project_from_post', vsp_query_type( 'vsp_project' ) );
	if ( ! $list ) {
		foreach ( vsp_default_projects() as $p ) {
			$list[] = $p + array(
				'id'    => 0,
				'cover' => vsp_youtube_thumb( $p['youtube_id'] ),
				'url'   => home_url( '/work/' . $p['slug'] . '/' ),
			);
		}
	}
	return $list;
}

function vsp_project_from_post( $p ) {
	$img = vsp_post_image( $p->ID );
	return array(
		'id'          => $p->ID,
		'slug'        => $p->post_name,
		'title'       => get_the_title( $p ),
		'client'      => get_post_meta( $p->ID, '_vsp_client', true ),
		'category'    => get_post_meta( $p->ID, '_vsp_category', true ),
		'summary'     => $p->post_excerpt,
		'youtube_id'  => get_post_meta( $p->ID, '_vsp_youtube_id', true ),
		'cover'       => $img ? $img['src'] : '',
		'cover_alt'   => get_post_meta( $p->ID, '_vsp_cover_alt', true ),
		'letterboxed' => (bool) get_post_meta( $p->ID, '_vsp_letterboxed', true ),
		'url'         => get_permalink( $p ),
	);
}

function vsp_services() {
	static $list = null;
	if ( null !== $list ) {
		return $list;
	}
	$list = array();
	foreach ( vsp_query_type( 'vsp_service' ) as $p ) {
		$img    = vsp_post_image( $p->ID );
		$list[] = array(
			'slug'      => $p->post_name,
			'title'     => get_the_title( $p ),
			'summary'   => get_post_meta( $p->ID, '_vsp_summary', true ),
			'scope'     => vsp_lines( get_post_meta( $p->ID, '_vsp_scope', true ) ),
			'image'     => $img ? $img['src'] : '',
			'image_alt' => get_post_meta( $p->ID, '_vsp_image_alt', true ),
			'link'      => vsp_resolve_link( get_post_meta( $p->ID, '_vsp_link', true ) ),
		);
	}
	if ( ! $list ) {
		foreach ( vsp_default_services() as $s ) {
			$s['image'] = vsp_asset( $s['image'] );
			$s['link']  = vsp_resolve_link( $s['link'] );
			$list[]     = $s;
		}
	}
	return $list;
}

function vsp_resolve_link( $link ) {
	if ( ! $link ) {
		return '';
	}
	return preg_match( '#^(https?:)?//#', $link ) ? $link : home_url( $link );
}

function vsp_clients() {
	static $list = null;
	if ( null !== $list ) {
		return $list;
	}
	$list = array();
	foreach ( vsp_query_type( 'vsp_client' ) as $p ) {
		$img = vsp_post_image( $p->ID );
		if ( $img ) {
			$list[] = array( 'name' => get_the_title( $p ), 'logo' => $img['src'], 'category' => get_post_meta( $p->ID, '_vsp_category', true ), 'color' => (bool) get_post_meta( $p->ID, '_vsp_color', true ) );
		}
	}
	if ( ! $list ) {
		foreach ( vsp_default_clients() as $c ) {
			$list[] = array( 'name' => $c[0], 'logo' => vsp_asset( $c[1] ), 'category' => $c[2], 'color' => ! empty( $c[3] ) );
		}
	}
	return $list;
}

/** Text-only case studies, in display order. */
function vsp_cases() {
	static $list = null;
	if ( null !== $list ) {
		return $list;
	}
	$list = array();
	foreach ( vsp_query_type( 'vsp_case' ) as $p ) {
		$m      = function ( $k ) use ( $p ) {
			return (string) get_post_meta( $p->ID, '_vsp_' . $k, true );
		};
		$list[] = array(
			'title'        => get_the_title( $p ),
			'client'       => $m( 'client' ),
			'tagline'      => $m( 'tagline' ),
			'type'         => $m( 'type' ),
			'year'         => $m( 'year' ),
			'metric'       => $m( 'metric' ),
			'metric_label' => $m( 'metric_label' ),
			'tags'         => vsp_lines( $m( 'tags' ) ),
			'summary'      => $m( 'summary' ),
		);
	}
	if ( ! $list ) {
		$list = vsp_default_cases();
	}
	return $list;
}

/** @return array<string, array{id: string, label: string, short: string, cover: string, cover_alt: string}> keyed by slug */
function vsp_photo_categories() {
	static $cats = null;
	if ( null !== $cats ) {
		return $cats;
	}
	$defaults = vsp_default_photo_categories();
	$cats     = array();
	$terms    = get_terms( array( 'taxonomy' => 'vsp_photo_cat', 'hide_empty' => false, 'orderby' => 'term_order' ) );
	if ( ! is_wp_error( $terms ) && $terms ) {
		usort(
			$terms,
			function ( $a, $b ) use ( $defaults ) {
				$keys = array_keys( $defaults );
				$ia   = array_search( $a->slug, $keys, true );
				$ib   = array_search( $b->slug, $keys, true );
				return ( false === $ia ? 99 : $ia ) - ( false === $ib ? 99 : $ib );
			}
		);
		foreach ( $terms as $t ) {
			$d                 = isset( $defaults[ $t->slug ] ) ? $defaults[ $t->slug ] : array();
			$cats[ $t->slug ] = array(
				'id'        => $t->slug,
				'label'     => $t->name,
				'short'     => isset( $d['short'] ) ? $d['short'] : $t->name,
				'cover'     => isset( $d['cover'] ) ? vsp_asset( $d['cover'] ) : '',
				'cover_alt' => isset( $d['cover_alt'] ) ? $d['cover_alt'] : $t->name,
			);
		}
	} else {
		foreach ( $defaults as $slug => $d ) {
			$cats[ $slug ] = array(
				'id'        => $slug,
				'label'     => $d['label'],
				'short'     => $d['short'],
				'cover'     => vsp_asset( $d['cover'] ),
				'cover_alt' => $d['cover_alt'],
			);
		}
	}
	return $cats;
}

/** @return array<int, array{src: string, full: string, width: int, height: int, category: string, alt: string, file: string}> */
function vsp_photos() {
	static $list = null;
	if ( null !== $list ) {
		return $list;
	}
	$list  = array();
	$posts = vsp_query_type( 'vsp_photo' );
	if ( $posts ) {
		foreach ( $posts as $p ) {
			$img = vsp_post_image( $p->ID, 'large' );
			if ( ! $img ) {
				continue;
			}
			$full  = $img['id'] ? vsp_post_image( $p->ID, 'full' ) : $img;
			$terms = get_the_terms( $p, 'vsp_photo_cat' );
			$list[] = array(
				'src'      => $img['src'],
				'full'     => $full['src'],
				'width'    => $img['width'] ? $img['width'] : 1200,
				'height'   => $img['height'] ? $img['height'] : 800,
				'category' => ( $terms && ! is_wp_error( $terms ) ) ? $terms[0]->slug : '',
				'alt'      => get_the_title( $p ),
				'file'     => (string) get_post_meta( $p->ID, '_vsp_image', true ),
				'id'       => $img['id'],
			);
		}
		return $list;
	}
	$cats = vsp_default_photo_categories();
	foreach ( vsp_default_photos() as $i => $row ) {
		list( $file, $w, $h, $cat ) = $row;
		$list[] = array(
			'src'      => vsp_asset( $file ),
			'full'     => vsp_asset( $file ),
			'width'    => $w,
			'height'   => $h,
			'category' => $cat,
			'alt'      => vsp_default_photo_alt( $cat, $i ),
			'file'     => $file,
			'id'       => 0,
		);
	}
	return $list;
}

function vsp_default_photo_alt( $cat, $i ) {
	$cats = vsp_default_photo_categories();
	return sprintf( '%s by Visual Studios Plus — image %d', $cats[ $cat ]['alt'], $i + 1 );
}

function vsp_photo_count( $cat = '' ) {
	if ( ! $cat ) {
		return count( vsp_photos() );
	}
	return count( wp_list_filter( vsp_photos(), array( 'category' => $cat ) ) );
}

/** Find a photo by its original file name (curated picks on the homepage reel). */
function vsp_photo_by_file( $file ) {
	foreach ( vsp_photos() as $p ) {
		if ( $p['file'] === $file ) {
			return $p;
		}
	}
	return null;
}

/** URL of a theme page by slug, e.g. vsp_page_url( 'contact' ). */
function vsp_page_url( $slug ) {
	if ( 'work' === $slug ) {
		return get_post_type_archive_link( 'vsp_project' ) ? get_post_type_archive_link( 'vsp_project' ) : home_url( '/work/' );
	}
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' . $slug . '/' );
}
