<?php
/**
 * Template Name: Photography portfolio
 *
 * Drifting photo wall, then the filterable archive with a lightbox
 * (?category=food|fashion|jewellery|hospitality).
 *
 * @package VisualStudiosPlus
 */

$vsp_photos = vsp_photos();
$vsp_cats   = vsp_photo_categories();
$vsp_page   = 24;
$vsp_req    = isset( $_GET['category'] ) ? sanitize_key( wp_unslash( $_GET['category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
$vsp_filter = isset( $vsp_cats[ $vsp_req ] ) ? $vsp_req : 'all';

// Interleave portrait/square frames into 5 columns so each column mixes categories.
$vsp_pool = array_values( array_filter( $vsp_photos, fn( $p ) => $p['height'] >= $p['width'] * 0.9 ) );
$vsp_pool = $vsp_pool ? $vsp_pool : $vsp_photos;
$vsp_cols = array_fill( 0, 5, array() );
if ( $vsp_pool ) {
	for ( $vsp_i = 0; $vsp_i < 30; $vsp_i++ ) {
		$vsp_cols[ $vsp_i % 5 ][] = $vsp_pool[ ( $vsp_i * 7 ) % count( $vsp_pool ) ];
	}
}
$vsp_speeds = array( '70s', '95s', '80s', '105s', '88s' );

$vsp_tabs = array( array( 'id' => 'all', 'label' => __( 'All', 'vsp' ), 'count' => count( $vsp_photos ) ) );
foreach ( $vsp_cats as $vsp_c ) {
	$vsp_tabs[] = array( 'id' => $vsp_c['id'], 'label' => $vsp_c['label'], 'count' => vsp_photo_count( $vsp_c['id'] ) );
}

get_header();
?>
<section class="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink">
	<div aria-hidden="true" class="absolute inset-0 -top-[10%] flex gap-3 px-3 md:gap-5 md:px-5 [transform:rotate(-4deg)_scale(1.18)]">
		<?php foreach ( $vsp_cols as $vsp_c => $vsp_col ) : ?>
			<div class="relative flex-1 overflow-hidden <?php echo 3 === $vsp_c ? 'hidden md:block' : ( 4 === $vsp_c ? 'hidden lg:block' : '' ); ?>">
				<div class="flex animate-[wall_var(--d)_linear_infinite] flex-col gap-3 md:gap-5" style="--d:<?php echo esc_attr( $vsp_speeds[ $vsp_c ] ); ?>;animation-direction:<?php echo $vsp_c % 2 ? 'reverse' : 'normal'; ?>">
					<?php foreach ( array_merge( $vsp_col, $vsp_col ) as $vsp_i => $vsp_p ) : ?>
						<div class="relative w-full overflow-hidden bg-ink-3" style="aspect-ratio:<?php echo (int) $vsp_p['width']; ?> / <?php echo (int) $vsp_p['height']; ?>">
							<img src="<?php echo esc_url( $vsp_p['src'] ); ?>" alt="" <?php echo $vsp_i < 3 ? '' : 'loading="lazy"'; ?> decoding="async" class="absolute inset-0 size-full object-cover">
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<div aria-hidden="true" class="absolute inset-0 bg-ink/55"></div>
	<div aria-hidden="true" class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,14,12,0.2),rgba(12,14,12,0.9)_75%)]"></div>
	<div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"></div>

	<div class="relative z-10 flex h-full flex-col justify-end">
		<div class="container-x pb-16 md:pb-24">
			<div<?php echo vsp_reveal( 0, 12 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="eyebrow flex items-center gap-3 text-bone/80">
					<span class="size-1.5 rounded-full bg-bronze" aria-hidden="true"></span>
					<?php /* translators: %d: number of images */ echo esc_html( sprintf( __( 'Photography — %d images', 'vsp' ), count( $vsp_photos ) ) ); ?>
				</p>
			</div>
			<?php echo vsp_split( __( 'Photography portfolio.', 'vsp' ), array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.1, 'class' => 'display-xl mt-8 max-w-[12ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<div class="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
				<div<?php echo vsp_reveal( 0.4 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<p class="max-w-md text-lg leading-relaxed text-bone/80 md:text-xl"><?php esc_html_e( 'Food, fashion, jewellery, hospitality, interiors and architecture. Select a frame to view it full screen.', 'vsp' ); ?></p>
				</div>
				<div<?php echo vsp_reveal( 0.5 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<a href="#gallery" class="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone">
						<span class="grid size-12 place-items-center rounded-full border border-bone/30 transition-colors duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
							<?php echo vsp_icon( 'arrow-down', 'size-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</span>
						<?php esc_html_e( 'Browse the archive', 'vsp' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="gallery" aria-label="<?php esc_attr_e( 'Photography gallery', 'vsp' ); ?>" class="container-x scroll-mt-4 pb-28 pt-16 md:pb-40 md:pt-24" data-gallery data-page="<?php echo (int) $vsp_page; ?>" data-filter="<?php echo esc_attr( $vsp_filter ); ?>">
	<div role="group" aria-label="<?php esc_attr_e( 'Filter photographs by category', 'vsp' ); ?>" class="g-tabs sticky top-0 z-20 -mx-5 mb-10 flex gap-1 overflow-x-auto border-b border-line bg-ink/80 px-5 py-3 backdrop-blur-xl [scrollbar-width:none] md:mx-0 md:mb-14 md:px-0 [&::-webkit-scrollbar]:hidden">
		<span aria-hidden="true" class="g-pill pointer-events-none absolute left-0 top-3 h-9 rounded-full bg-bone opacity-0"></span>
		<?php foreach ( $vsp_tabs as $vsp_t ) : $vsp_on = $vsp_t['id'] === $vsp_filter; ?>
			<a href="<?php echo esc_url( 'all' === $vsp_t['id'] ? remove_query_arg( 'category' ) . '#gallery' : add_query_arg( 'category', $vsp_t['id'] ) . '#gallery' ); ?>" role="button" data-tab="<?php echo esc_attr( $vsp_t['id'] ); ?>" aria-pressed="<?php echo $vsp_on ? 'true' : 'false'; ?>" class="g-tab relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300">
				<span class="relative"><?php echo esc_html( $vsp_t['label'] ); ?> <span class="g-count ml-1 text-xs"><?php echo (int) $vsp_t['count']; ?></span></span>
			</a>
		<?php endforeach; ?>
	</div>

	<ul class="g-list columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3" aria-label="<?php esc_attr_e( 'Photographs', 'vsp' ); ?>">
		<?php
		$vsp_n = 0;
		foreach ( $vsp_photos as $vsp_p ) :
			$vsp_match = 'all' === $vsp_filter || $vsp_p['category'] === $vsp_filter;
			$vsp_off   = ! $vsp_match || $vsp_n >= $vsp_page;
			if ( $vsp_match ) {
				$vsp_n++;
			}
			$vsp_cat = isset( $vsp_cats[ $vsp_p['category'] ] ) ? $vsp_cats[ $vsp_p['category'] ] : array( 'short' => '', 'label' => '' );
			?>
			<li class="g-item mb-4 break-inside-avoid md:mb-6<?php echo $vsp_off ? ' is-off' : ''; ?>" data-cat="<?php echo esc_attr( $vsp_p['category'] ); ?>">
				<div data-tilt class="[perspective:1100px]">
					<div class="tilt-inner group/tilt relative [transform-style:preserve-3d]">
						<a href="<?php echo esc_url( $vsp_p['full'] ); ?>" data-cursor="view" data-full="<?php echo esc_url( $vsp_p['full'] ); ?>" data-label="<?php echo esc_attr( $vsp_cat['label'] ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Open %s', 'vsp' ), $vsp_p['alt'] ) ); ?>" class="g-open group relative block w-full overflow-hidden bg-ink-3">
							<img src="<?php echo esc_url( $vsp_p['src'] ); ?>" alt="<?php echo esc_attr( $vsp_p['alt'] ); ?>" width="<?php echo (int) $vsp_p['width']; ?>" height="<?php echo (int) $vsp_p['height']; ?>" loading="lazy" decoding="async" class="h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]">
							<span aria-hidden="true" class="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-10 text-xs uppercase tracking-[0.2em] text-bone transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0">
								<?php echo esc_html( $vsp_cat['short'] ); ?>
								<span class="g-num tabular-nums text-bone/70"></span>
							</span>
						</a>
						<span aria-hidden="true" class="tilt-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"></span>
					</div>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>

	<div class="g-more-wrap mt-14 hidden justify-center">
		<button type="button" class="g-more rounded-full border border-bone/25 px-8 py-4 text-sm tracking-wide transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink">
			<?php esc_html_e( 'Load more', 'vsp' ); ?> <span class="text-stone">(<span class="g-remaining">0</span> <?php esc_html_e( 'remaining', 'vsp' ); ?>)</span>
		</button>
	</div>
</section>

<?php
get_template_part( 'template-parts/cta', null, array( 'title' => __( 'Have a product, a place or a plate to shoot?', 'vsp' ) ) );
get_footer();
