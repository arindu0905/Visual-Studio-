<?php
/**
 * Markup helpers — PHP equivalents of the small React UI components.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

function vsp_pad( $n, $len = 2 ) {
	return str_pad( (string) $n, $len, '0', STR_PAD_LEFT );
}

/** Lucide icons used by the design (inline SVG, inherits currentColor). */
function vsp_icon( $name, $class = 'size-4' ) {
	$paths = array(
		'arrow-up-right' => '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
		'arrow-right'    => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
		'arrow-left'     => '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
		'arrow-up'       => '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
		'arrow-down'     => '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
		'play'           => '<polygon points="6 3 20 12 6 21 6 3"/>',
		'x'              => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
		'check'          => '<path d="M20 6 9 17l-5-5"/>',
	);
	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}
	return sprintf(
		'<svg aria-hidden="true" class="%s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">%s</svg>',
		esc_attr( $class ),
		$paths[ $name ]
	);
}

/** Attributes for a fade + rise reveal (see [data-reveal] in theme.css). */
function vsp_reveal( $delay = 0, $y = 24 ) {
	return sprintf( ' data-reveal style="--d:%ss;--ry:%spx"', esc_attr( $delay ), esc_attr( $y ) );
}

/**
 * Word-by-word masked text reveal. The full text stays in the DOM, so screen
 * readers and search engines read it normally.
 *
 * @param string $text Plain text.
 * @param array  $args tag, id, class, word_class, delay, stagger, trigger ('view'|'mount').
 */
function vsp_split( $text, $args = array() ) {
	$a     = wp_parse_args(
		$args,
		array(
			'tag'        => 'p',
			'id'         => '',
			'class'      => '',
			'word_class' => '',
			'delay'      => 0,
			'stagger'    => 0.045,
			'trigger'    => 'view',
		)
	);
	$tag   = tag_escape( $a['tag'] );
	$words = preg_split( '/\s+/u', trim( $text ) );
	$html  = array();
	foreach ( $words as $i => $w ) {
		$html[] = sprintf(
			'<span class="split-w"><span class="split-i %s" style="--i:%d">%s</span></span>',
			esc_attr( $a['word_class'] ),
			$i,
			esc_html( $w )
		);
	}
	return sprintf(
		'<%1$s%2$s class="%3$s" data-split="%4$s" style="--d:%5$ss;--st:%6$ss">%7$s</%1$s>',
		$tag,
		$a['id'] ? ' id="' . esc_attr( $a['id'] ) . '"' : '',
		esc_attr( $a['class'] ),
		'mount' === $a['trigger'] ? 'mount' : 'view',
		esc_attr( $a['delay'] ),
		esc_attr( $a['stagger'] ),
		implode( ' ', $html )
	);
}

/** Small editorial label: (01) — Label */
function vsp_section_label( $index, $text, $class = '' ) {
	return sprintf(
		'<p class="eyebrow flex items-center gap-3 %s">%s<span aria-hidden="true" class="h-px w-8 bg-current opacity-40"></span><span>%s</span></p>',
		esc_attr( $class ),
		$index ? '<span class="text-bronze">(' . esc_html( $index ) . ')</span>' : '',
		esc_html( $text )
	);
}

/**
 * Primary call-to-action: a fill sweeps up on hover and the arrow swaps out diagonally.
 *
 * @param array $args variant ('solid'|'outline'), class, external, magnetic.
 */
function vsp_button( $href, $label, $args = array() ) {
	$a       = wp_parse_args( $args, array( 'variant' => 'solid', 'class' => '', 'external' => false, 'magnetic' => true ) );
	$outline = 'outline' === $a['variant'];
	$classes = 'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-wide transition-colors duration-500 '
		. ( $outline ? 'border border-bone/30 text-bone hover:border-bronze' : 'bg-bone text-ink' ) . ' ' . $a['class'];
	$hover   = $outline ? ' group-hover:text-ink' : '';
	$inner   = '<span aria-hidden="true" class="absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ' . ( $outline ? 'bg-bone' : 'bg-bronze' ) . '"></span>'
		. '<span class="relative z-10 transition-colors duration-500' . $hover . '">' . esc_html( $label ) . '</span>'
		. '<span class="relative z-10 grid size-5 place-items-center overflow-hidden transition-colors duration-500' . $hover . '">'
		. vsp_icon( 'arrow-up-right', 'size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-5 group-hover:translate-x-5' )
		. vsp_icon( 'arrow-up-right', 'absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0' )
		. '</span>';
	$el      = sprintf(
		'<a href="%s" class="%s"%s>%s</a>',
		esc_url( $href ),
		esc_attr( trim( $classes ) ),
		$a['external'] ? ' target="_blank" rel="noopener noreferrer"' : '',
		$inner
	);
	return $a['magnetic'] ? '<span class="inline-block" data-magnetic>' . $el . '</span>' : $el;
}

/**
 * Image in a fixed-ratio frame (ratio via `class`, e.g. "aspect-[4/5]") that
 * drifts on scroll and unveils itself with a clip-path wipe.
 *
 * @param array $args strength, class, img_class, reveal, distort, priority.
 */
function vsp_parallax_image( $src, $alt, $args = array() ) {
	$a = wp_parse_args(
		$args,
		array(
			'strength'  => 12,
			'class'     => '',
			'img_class' => '',
			'reveal'    => true,
			'distort'   => false,
			'priority'  => false,
		)
	);
	$s = (float) $a['strength'];
	return sprintf(
		'<div class="relative overflow-hidden bg-ink-3 %1$s" data-parallax="%2$s"%3$s><div class="px-inner absolute inset-x-0" style="top:-%2$s%%;bottom:-%2$s%%"><img src="%4$s" alt="%5$s" class="absolute inset-0 size-full object-cover %6$s" %7$s decoding="async">%8$s</div></div>',
		esc_attr( $a['class'] ),
		esc_attr( $s ),
		$a['reveal'] ? ' data-clip' : '',
		esc_url( $src ),
		esc_attr( $alt ),
		esc_attr( $a['img_class'] ),
		$a['priority'] ? 'fetchpriority="high"' : 'loading="lazy"',
		$a['distort'] ? '<canvas data-distort aria-hidden="true" class="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-300"></canvas>' : ''
	);
}

/** Menu items for a location, falling back to the site's default navigation. */
function vsp_nav_items( $location = 'primary' ) {
	$items     = array();
	$locations = get_nav_menu_locations();
	if ( ! empty( $locations[ $location ] ) ) {
		$menu = wp_get_nav_menu_items( $locations[ $location ] );
		if ( $menu ) {
			foreach ( $menu as $m ) {
				if ( ! $m->menu_item_parent ) {
					$items[] = array( 'label' => $m->title, 'href' => $m->url );
				}
			}
		}
	}
	if ( ! $items && 'footer' === $location ) {
		return array(
			array( 'label' => __( 'Home', 'vsp' ), 'href' => home_url( '/' ) ),
			array( 'label' => __( 'Projects & Archive', 'vsp' ), 'href' => vsp_page_url( 'work' ) ),
			array( 'label' => __( 'Photography', 'vsp' ), 'href' => vsp_page_url( 'photography' ) ),
			array( 'label' => __( 'Capabilities & Services', 'vsp' ), 'href' => vsp_page_url( 'services' ) ),
			array( 'label' => __( 'About Studio', 'vsp' ), 'href' => vsp_page_url( 'about' ) ),
			array( 'label' => __( 'Contact Studio', 'vsp' ), 'href' => vsp_page_url( 'contact' ) ),
		);
	}
	if ( ! $items ) {
		$items = array(
			array( 'label' => __( 'Projects', 'vsp' ), 'href' => vsp_page_url( 'work' ) ),
			array( 'label' => __( 'Photography', 'vsp' ), 'href' => vsp_page_url( 'photography' ) ),
			array( 'label' => __( 'Services', 'vsp' ), 'href' => vsp_page_url( 'services' ) ),
			array( 'label' => __( 'About', 'vsp' ), 'href' => vsp_page_url( 'about' ) ),
			array( 'label' => __( 'Contact', 'vsp' ), 'href' => vsp_page_url( 'contact' ) ),
		);
		if ( 'footer' === $location ) {
			array_unshift( $items, array( 'label' => __( 'Home', 'vsp' ), 'href' => home_url( '/' ) ) );
		}
	}
	return $items;
}

/** Is $href the current page (or a parent section of it)? */
function vsp_is_current( $href, $exact = false ) {
	$path = function ( $url ) {
		$p = wp_parse_url( $url, PHP_URL_PATH );
		return '/' . trim( (string) $p, '/' );
	};
	$here   = $path( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/' );
	$target = $path( $href );
	$home   = $path( home_url( '/' ) );
	if ( $here === $target ) {
		return true;
	}
	return ! $exact && $target !== $home && 0 === strpos( $here . '/', $target . '/' );
}
