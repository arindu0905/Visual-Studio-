<?php
/**
 * Theme setup, assets, head tags.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain( 'vsp', get_template_directory() . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
		add_theme_support( 'custom-logo', array( 'height' => 240, 'width' => 696, 'flex-height' => true, 'flex-width' => true ) );
		add_theme_support( 'responsive-embeds' );
		register_nav_menus(
			array(
				'primary' => __( 'Main menu', 'vsp' ),
				'footer'  => __( 'Footer menu', 'vsp' ),
			)
		);
	}
);

/** Cache-busting version: the file's modified time. */
function vsp_ver( $rel ) {
	$path = get_template_directory() . '/' . $rel;
	return file_exists( $path ) ? (string) filemtime( $path ) : wp_get_theme()->get( 'Version' );
}

add_action(
	'wp_enqueue_scripts',
	function () {
		$uri = get_template_directory_uri();
		wp_enqueue_style( 'vsp-theme', $uri . '/assets/css/theme.css', array(), vsp_ver( 'assets/css/theme.css' ) );
		wp_enqueue_script( 'lenis', $uri . '/assets/vendor/lenis.min.js', array(), vsp_ver( 'assets/vendor/lenis.min.js' ), array( 'in_footer' => true, 'strategy' => 'defer' ) );
		wp_enqueue_script( 'vsp-theme', $uri . '/assets/js/theme.js', array( 'lenis' ), vsp_ver( 'assets/js/theme.js' ), array( 'in_footer' => true, 'strategy' => 'defer' ) );

		$site = vsp_site();
		wp_localize_script(
			'vsp-theme',
			'VSP',
			array(
				'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
				'showreel' => $site['media']['showreel'],
				'poster'   => $site['media']['poster'],
				'loop'     => $site['media']['showreel_loop'],
				'email'    => $site['contact']['email'],
			)
		);
	}
);

add_action(
	'wp_head',
	function () {
		?>
<meta name="theme-color" content="#0c0e0c">
<meta name="color-scheme" content="dark">
<script>
document.documentElement.classList.add("js");
try{
	if(sessionStorage.getItem("vsp-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen");
	if(sessionStorage.getItem("vsp-nav")){sessionStorage.removeItem("vsp-nav");if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("curtain")}
}catch(e){}
</script>
<noscript><style>.preloader{display:none!important}</style></noscript>
		<?php
	},
	1
);

/** Favicons from the original site unless a Site Icon is set in the Customizer. */
add_action(
	'wp_head',
	function () {
		if ( has_site_icon() ) {
			return;
		}
		printf( '<link rel="icon" href="%s" sizes="32x32">' . "\n", esc_url( vsp_asset( 'cropped-VSP-Square-logo-11-32x32.jpg' ) ) );
		printf( '<link rel="icon" href="%s" sizes="192x192">' . "\n", esc_url( vsp_asset( 'cropped-VSP-Square-logo-11-192x192.jpg' ) ) );
		printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( vsp_asset( 'cropped-VSP-Square-logo-11-180x180.jpg' ) ) );
	}
);

/** Basic description / Open Graph tags — skipped when an SEO plugin is active. */
function vsp_has_seo_plugin() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' ) || class_exists( 'The_SEO_Framework\Load' );
}

add_action(
	'wp_head',
	function () {
		if ( vsp_has_seo_plugin() ) {
			return;
		}
		$site  = vsp_site();
		$desc  = $site['description'];
		$image = vsp_asset( 'D85_3829-HDR.webp' );
		$title = wp_get_document_title();
		$type  = 'website';
		if ( is_singular( 'vsp_project' ) ) {
			$p     = get_queried_object();
			$desc  = $p->post_excerpt ? $p->post_excerpt : $desc;
			$img   = vsp_post_image( $p->ID );
			$image = $img ? $img['src'] : $image;
			$type  = 'video.other';
		} elseif ( is_page( 'about' ) ) {
			$desc = $site['about']['statement'] . ' ' . $site['about']['body'];
		} elseif ( is_page( 'photography' ) ) {
			$desc = 'The Visual Studios Plus photography portfolio — food, fashion, jewellery and hospitality, interior & architecture photography from Colombo, Sri Lanka.';
		} elseif ( is_page( 'services' ) ) {
			$desc = 'Videography, photography, social media strategy, paid media strategy and branding strategy from Visual Studios Plus, Colombo.';
		} elseif ( is_page( 'contact' ) ) {
			$desc = sprintf( 'Contact Visual Studios Plus — %s, %s. %s.', $site['contact']['email'], implode( ' / ', $site['contact']['phones'] ), implode( ', ', $site['contact']['address'] ) );
		} elseif ( is_post_type_archive( 'vsp_project' ) ) {
			$desc = 'Films and photography by Visual Studios Plus — hospitality, food, product launch and corporate videography, plus food, fashion, jewellery and hospitality photography.';
		} elseif ( is_singular() && has_excerpt() ) {
			$desc = get_the_excerpt();
		}
		$url = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
		printf( '<meta name="description" content="%s">' . "\n", esc_attr( $desc ) );
		printf( '<meta property="og:type" content="%s">' . "\n", esc_attr( $type ) );
		printf( '<meta property="og:site_name" content="%s">' . "\n", esc_attr( $site['name'] ) );
		printf( '<meta property="og:title" content="%s">' . "\n", esc_attr( $title ) );
		printf( '<meta property="og:description" content="%s">' . "\n", esc_attr( is_front_page() ? $site['tagline'] : $desc ) );
		printf( '<meta property="og:url" content="%s">' . "\n", esc_url( $url ) );
		printf( '<meta property="og:image" content="%s">' . "\n", esc_url( $image ) );
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";

		if ( is_front_page() ) {
			$ld = array(
				'@context'      => 'https://schema.org',
				'@type'         => 'Organization',
				'name'          => $site['name'],
				'alternateName' => $site['short_name'],
				'url'           => home_url( '/' ),
				'logo'          => $site['media']['logo'],
				'description'   => $site['description'],
				'email'         => $site['contact']['email'],
				'telephone'     => $site['contact']['phones'],
				'address'       => array(
					'@type'           => 'PostalAddress',
					'streetAddress'   => isset( $site['contact']['address'][0] ) ? $site['contact']['address'][0] : '',
					'addressLocality' => 'Colombo',
					'addressCountry'  => 'LK',
				),
				'sameAs'        => wp_list_pluck( vsp_socials(), 'href' ),
			);
			echo '<script type="application/ld+json">' . wp_json_encode( $ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
		}
	},
	5
);

/** Title tagline: “Visual Studios Plus — The Digital Creative Marketing Agency”. */
add_filter( 'document_title_separator', fn() => '—' );
add_filter(
	'document_title_parts',
	function ( $parts ) {
		if ( is_front_page() ) {
			$parts['title']   = vsp_site()['name'];
			$parts['tagline'] = get_bloginfo( 'description' ) ? get_bloginfo( 'description' ) : __( 'The Digital Creative Marketing Agency', 'vsp' );
		} elseif ( is_post_type_archive( 'vsp_project' ) ) {
			$parts['title'] = __( 'Work', 'vsp' );
		} elseif ( is_page( 'photography' ) ) {
			$parts['title'] = __( 'Photography Portfolio', 'vsp' );
		} elseif ( is_singular( 'vsp_project' ) ) {
			$cat = get_post_meta( get_queried_object_id(), '_vsp_category', true );
			if ( $cat ) {
				$parts['title'] .= ' — ' . $cat;
			}
		}
		return $parts;
	}
);

/** Keep the old WordPress URL working for SEO and shared links. */
add_action(
	'template_redirect',
	function () {
		if ( is_404() ) {
			$path = trim( (string) wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '', PHP_URL_PATH ), '/' );
			if ( preg_match( '#(^|/)photography-portfolio$#', $path ) ) {
				wp_safe_redirect( vsp_page_url( 'photography' ), 301 );
				exit;
			}
		}
	}
);

/** Show every film on the Work archive. */
add_action(
	'pre_get_posts',
	function ( $q ) {
		if ( ! is_admin() && $q->is_main_query() && $q->is_post_type_archive( 'vsp_project' ) ) {
			$q->set( 'posts_per_page', -1 );
		}
	}
);

add_filter(
	'body_class',
	function ( $classes ) {
		$classes[] = 'min-h-dvh bg-ink text-bone';
		return $classes;
	}
);
