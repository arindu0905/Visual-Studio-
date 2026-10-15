<?php
/**
 * One-click setup: on activation the theme creates the pages, menu and all the
 * content from the original site as editable posts. Appearance → VS+ Setup can
 * re-run it and copy the bundled images into the Media Library.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_switch_theme',
	function () {
		if ( ! get_option( 'vsp_seeded' ) ) {
			vsp_seed_content();
		}
		flush_rewrite_rules();
	}
);

/** Create whatever is missing. Safe to run repeatedly — existing items are left alone. */
function vsp_seed_content() {
	vsp_register_post_types();

	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}

	// Photo categories.
	foreach ( vsp_default_photo_categories() as $slug => $c ) {
		if ( ! term_exists( $slug, 'vsp_photo_cat' ) ) {
			wp_insert_term( $c['label'], 'vsp_photo_cat', array( 'slug' => $slug ) );
		}
	}

	$exists = function ( $type, $slug ) {
		return (bool) get_posts( array( 'post_type' => $type, 'name' => $slug, 'post_status' => 'any', 'numberposts' => 1, 'fields' => 'ids' ) );
	};
	$insert = function ( $args, $meta ) {
		$id = wp_insert_post( $args + array( 'post_status' => 'publish' ), true );
		if ( ! is_wp_error( $id ) ) {
			foreach ( $meta as $k => $v ) {
				update_post_meta( $id, '_vsp_' . $k, $v );
			}
		}
		return $id;
	};

	foreach ( vsp_default_projects() as $i => $p ) {
		if ( ! $exists( 'vsp_project', $p['slug'] ) ) {
			$insert(
				array( 'post_type' => 'vsp_project', 'post_name' => $p['slug'], 'post_title' => $p['title'], 'post_excerpt' => $p['summary'], 'menu_order' => $i ),
				array( 'client' => $p['client'], 'category' => $p['category'], 'youtube_id' => $p['youtube_id'], 'cover_alt' => $p['cover_alt'], 'letterboxed' => $p['letterboxed'] ? '1' : '' )
			);
		}
	}

	foreach ( vsp_default_services() as $i => $s ) {
		if ( ! $exists( 'vsp_service', $s['slug'] ) ) {
			$insert(
				array( 'post_type' => 'vsp_service', 'post_name' => $s['slug'], 'post_title' => $s['title'], 'menu_order' => $i ),
				array( 'summary' => $s['summary'], 'scope' => implode( "\n", $s['scope'] ), 'link' => $s['link'], 'image_alt' => $s['image_alt'], 'image' => $s['image'] )
			);
		}
	}

	foreach ( vsp_default_clients() as $i => $c ) {
		if ( ! $exists( 'vsp_client', sanitize_title( $c[0] ) ) ) {
			$insert( array( 'post_type' => 'vsp_client', 'post_name' => sanitize_title( $c[0] ), 'post_title' => $c[0], 'menu_order' => $i ), array( 'image' => $c[1], 'category' => $c[2], 'color' => empty( $c[3] ) ? '' : '1' ) );
		}
	}

	foreach ( vsp_default_cases() as $i => $c ) {
		if ( ! $exists( 'vsp_case', sanitize_title( $c['title'] ) ) ) {
			$insert(
				array( 'post_type' => 'vsp_case', 'post_name' => sanitize_title( $c['title'] ), 'post_title' => $c['title'], 'menu_order' => $i ),
				array(
					'client'       => $c['client'],
					'tagline'      => $c['tagline'],
					'type'         => $c['type'],
					'year'         => $c['year'],
					'metric'       => $c['metric'],
					'metric_label' => $c['metric_label'],
					'tags'         => implode( "\n", $c['tags'] ),
					'summary'      => $c['summary'],
				)
			);
		}
	}

	// Photographs — matched on their original file name.
	global $wpdb;
	$have = $wpdb->get_col( "SELECT pm.meta_value FROM {$wpdb->postmeta} pm JOIN {$wpdb->posts} p ON p.ID = pm.post_id WHERE pm.meta_key = '_vsp_image' AND p.post_type = 'vsp_photo'" );
	$have = array_flip( $have );
	wp_defer_term_counting( true );
	foreach ( vsp_default_photos() as $i => $row ) {
		list( $file, $w, $h, $cat ) = $row;
		if ( isset( $have[ $file ] ) ) {
			continue;
		}
		$id = $insert(
			array( 'post_type' => 'vsp_photo', 'post_title' => vsp_default_photo_alt( $cat, $i ), 'post_name' => sanitize_title( pathinfo( $file, PATHINFO_FILENAME ) ), 'menu_order' => $i ),
			array( 'image' => $file, 'width' => $w, 'height' => $h )
		);
		if ( ! is_wp_error( $id ) ) {
			wp_set_object_terms( $id, $cat, 'vsp_photo_cat' );
		}
	}
	wp_defer_term_counting( false );

	// Pages (their templates are picked by slug: page-about.php etc).
	$pages = array(
		'photography' => __( 'Photography', 'vsp' ),
		'services'    => __( 'Services', 'vsp' ),
		'about'       => __( 'About', 'vsp' ),
		'contact'     => __( 'Contact', 'vsp' ),
	);
	$page_ids = array();
	foreach ( $pages as $slug => $title ) {
		$page = get_page_by_path( $slug );
		$page_ids[ $slug ] = $page ? $page->ID : wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => $title ) );
	}

	// Main menu, unless one is already assigned.
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	if ( empty( $locations['primary'] ) ) {
		$menu = wp_get_nav_menu_object( 'Main menu' );
		$menu_id = $menu ? $menu->term_id : wp_create_nav_menu( 'Main menu' );
		if ( ! is_wp_error( $menu_id ) ) {
			if ( ! $menu ) {
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array( 'menu-item-title' => __( 'Projects', 'vsp' ), 'menu-item-type' => 'post_type_archive', 'menu-item-object' => 'vsp_project', 'menu-item-status' => 'publish' )
				);
				foreach ( $page_ids as $slug => $pid ) {
					if ( $pid && ! is_wp_error( $pid ) ) {
						wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-object-id' => $pid, 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
					}
				}
			}
			$locations['primary'] = $menu_id;
			set_theme_mod( 'nav_menu_locations', $locations );
		}
	}

	update_option( 'vsp_seeded', time() );
	flush_rewrite_rules();
}

/* ---------------------------------------------------------------------------
 * Appearance → VS+ Setup
 * ------------------------------------------------------------------------- */

add_action(
	'admin_menu',
	function () {
		add_theme_page( __( 'VS+ Setup', 'vsp' ), __( 'VS+ Setup', 'vsp' ), 'manage_options', 'vsp-setup', 'vsp_setup_page' );
	}
);

add_action(
	'admin_post_vsp_seed',
	function () {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'vsp_seed' ) ) {
			wp_die( esc_html__( 'Not allowed.', 'vsp' ) );
		}
		vsp_seed_content();
		wp_safe_redirect( admin_url( 'themes.php?page=vsp-setup&seeded=1' ) );
		exit;
	}
);

/** Posts whose image still points at a file inside the theme. */
function vsp_media_jobs() {
	return get_posts(
		array(
			'post_type'   => array( 'vsp_photo', 'vsp_client', 'vsp_service' ),
			'post_status' => 'any',
			'numberposts' => -1,
			'fields'      => 'ids',
			'orderby'     => 'ID',
			'order'       => 'ASC',
			'meta_query'  => array(
				'relation' => 'AND',
				array( 'key' => '_vsp_image', 'value' => '', 'compare' => '!=' ),
				array( 'key' => '_vsp_image', 'value' => '^https?://', 'compare' => 'NOT REGEXP' ),
				array( 'key' => '_thumbnail_id', 'compare' => 'NOT EXISTS' ),
			),
		)
	);
}

add_action(
	'wp_ajax_vsp_import_media',
	function () {
		check_ajax_referer( 'vsp_import_media' );
		if ( ! current_user_can( 'manage_options' ) || ! current_user_can( 'upload_files' ) ) {
			wp_send_json_error( 'forbidden', 403 );
		}
		require_once ABSPATH . 'wp-admin/includes/image.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';

		$map    = get_option( 'vsp_media_map', array() );
		$jobs   = vsp_media_jobs();
		$errors = array();
		foreach ( array_slice( $jobs, 0, 4 ) as $post_id ) {
			$file = get_post_meta( $post_id, '_vsp_image', true );
			$id   = isset( $map[ $file ] ) && get_post( $map[ $file ] ) ? $map[ $file ] : 0;
			if ( ! $id ) {
				$path = get_template_directory() . '/assets/media/' . basename( $file );
				if ( ! is_readable( $path ) ) {
					$errors[] = $file;
					update_post_meta( $post_id, '_thumbnail_id', 0 ); // skip next time
					continue;
				}
				$upload = wp_upload_bits( basename( $file ), null, file_get_contents( $path ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				if ( ! empty( $upload['error'] ) ) {
					$errors[] = $file . ': ' . $upload['error'];
					update_post_meta( $post_id, '_thumbnail_id', 0 );
					continue;
				}
				$type = wp_check_filetype( $upload['file'] );
				$id   = wp_insert_attachment(
					array(
						'post_mime_type' => $type['type'],
						'post_title'     => get_the_title( $post_id ),
						'post_status'    => 'inherit',
					),
					$upload['file']
				);
				wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $upload['file'] ) );
				$alt = 'vsp_service' === get_post_type( $post_id ) ? get_post_meta( $post_id, '_vsp_image_alt', true ) : get_the_title( $post_id );
				update_post_meta( $id, '_wp_attachment_image_alt', $alt );
				$map[ $file ] = $id;
			}
			set_post_thumbnail( $post_id, $id );
		}
		update_option( 'vsp_media_map', $map, false );
		wp_send_json_success( array( 'remaining' => count( vsp_media_jobs() ), 'errors' => $errors ) );
	}
);

function vsp_setup_page() {
	$remaining = count( vsp_media_jobs() );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Visual Studios Plus — Setup', 'vsp' ); ?></h1>
		<?php if ( isset( $_GET['seeded'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification ?>
			<div class="notice notice-success"><p><?php esc_html_e( 'Setup finished — any missing pages and content were created.', 'vsp' ); ?></p></div>
		<?php endif; ?>

		<h2><?php esc_html_e( '1. Content', 'vsp' ); ?></h2>
		<p><?php esc_html_e( 'On activation the theme created the Photography, Services, About and Contact pages, the main menu, and the films, services, clients and photographs from the original site. Run this again to recreate anything you deleted (existing items are never changed).', 'vsp' ); ?></p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="vsp_seed">
			<?php wp_nonce_field( 'vsp_seed' ); ?>
			<?php submit_button( __( 'Create missing content', 'vsp' ), 'secondary', 'submit', false ); ?>
		</form>

		<h2 style="margin-top:2em"><?php esc_html_e( '2. Images (optional, recommended)', 'vsp' ); ?></h2>
		<p><?php esc_html_e( 'The demo images are served from the theme folder. Copy them into the Media Library so WordPress generates responsive sizes and you can swap them like any other image.', 'vsp' ); ?></p>
		<p><strong id="vsp-remaining"><?php echo esc_html( $remaining ); ?></strong> <?php esc_html_e( 'items still use a theme image.', 'vsp' ); ?></p>
		<p><button type="button" class="button button-primary" id="vsp-import" <?php disabled( 0 === $remaining ); ?>><?php esc_html_e( 'Copy images to Media Library', 'vsp' ); ?></button> <span id="vsp-import-status"></span></p>

		<h2 style="margin-top:2em"><?php esc_html_e( 'Where to edit things', 'vsp' ); ?></h2>
		<ul style="list-style:disc;padding-left:1.5em">
			<li><?php echo wp_kses_post( __( '<strong>Appearance → Customize → Visual Studios Plus</strong>: headline, tagline, about text, contact details, social links, showreel.', 'vsp' ) ); ?></li>
			<li><?php echo wp_kses_post( __( '<strong>Films</strong>, <strong>Services</strong>, <strong>Photographs</strong>, <strong>Clients</strong> in the admin menu. Drag order with Page Attributes → Order.', 'vsp' ) ); ?></li>
			<li><?php echo wp_kses_post( __( '<strong>Appearance → Menus</strong>: the header menu. <strong>Appearance → Customize → Site Identity</strong>: logo and site icon.', 'vsp' ) ); ?></li>
		</ul>
	</div>
	<script>
	(function () {
		var btn = document.getElementById('vsp-import'), out = document.getElementById('vsp-import-status'), left = document.getElementById('vsp-remaining');
		btn && btn.addEventListener('click', function () {
			btn.disabled = true;
			var errs = [];
			(function step() {
				out.textContent = 'Copying…';
				var body = new FormData();
				body.append('action', 'vsp_import_media');
				body.append('_ajax_nonce', <?php echo wp_json_encode( wp_create_nonce( 'vsp_import_media' ) ); ?>);
				fetch(ajaxurl, { method: 'POST', body: body, credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (r) {
					if (!r.success) throw new Error(r.data || 'error');
					left.textContent = r.data.remaining;
					errs = errs.concat(r.data.errors);
					if (r.data.remaining > 0) step();
					else out.textContent = errs.length ? 'Done, with errors: ' + errs.join(', ') : 'Done.';
				}).catch(function (e) { out.textContent = 'Stopped: ' + e.message + ' — click again to resume.'; btn.disabled = false; });
			})();
		});
	})();
	</script>
	<?php
}
