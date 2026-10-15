<?php
/**
 * Homepage: self-playing photography reel. Glides on its own, eases to a stop
 * while hovered, and can be dragged in either direction.
 *
 * @package VisualStudiosPlus
 */

$vsp_picks  = array( 'D85_3829-HDR.webp', 'KeelesFoodPhotography0403.webp', '7.webp', 'Palliyaguruge-Jewellers2.webp', 'DJI_0078-HDR.webp', 'CurryLeaf.webp', 'DSC_1657-2.webp', 'Tiesh-7077-1.webp', 'D85_2304.webp' );
$vsp_frames = array_values( array_filter( array_map( 'vsp_photo_by_file', $vsp_picks ) ) );
if ( ! $vsp_frames ) {
	$vsp_frames = array_slice( vsp_photos(), 0, 9 );
}
$vsp_cats      = vsp_photo_categories();
$vsp_photo_url = vsp_page_url( 'photography' );
?>
<section aria-labelledby="photo-reel-title" class="relative overflow-hidden bg-ink-2 py-24 md:py-36">
	<div class="container-x mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
		<div>
			<?php echo vsp_section_label( '04', __( 'Our photography', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<h2 id="photo-reel-title" class="display-lg mt-8">Port<span class="serif-accent text-bronze">folio</span></h2>
		</div>
		<div class="max-w-sm">
			<p class="text-bone/65"><?php esc_html_e( 'Tactile luxury across Gastronomy, Architecture, and High Fashion.', 'vsp' ); ?></p>
			<a href="<?php echo esc_url( $vsp_photo_url ); ?>" class="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone">
				<span class="link-underline"><?php esc_html_e( 'Explore the archive', 'vsp' ); ?></span>
				<?php echo vsp_icon( 'arrow-right', 'size-4 transition-transform duration-500 group-hover:translate-x-1.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</a>
		</div>
	</div>

	<div data-reel class="relative cursor-grab touch-pan-y select-none active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]" role="region" aria-label="<?php esc_attr_e( 'Photography reel — moves automatically; hover or touch to pause, drag to browse', 'vsp' ); ?>">
		<div class="reel-track flex w-max gap-4 pb-12 will-change-transform md:gap-8">
			<?php for ( $vsp_copy = 0; $vsp_copy < 2; $vsp_copy++ ) : ?>
				<?php foreach ( $vsp_frames as $vsp_i => $vsp_p ) : ?>
					<figure <?php echo $vsp_copy ? 'aria-hidden="true"' : ''; ?> class="group relative h-[min(48svh,380px)] shrink-0 md:h-[min(62svh,600px)]" style="aspect-ratio:<?php echo (int) $vsp_p['width']; ?> / <?php echo (int) $vsp_p['height']; ?>">
						<a href="<?php echo esc_url( add_query_arg( 'category', $vsp_p['category'], $vsp_photo_url ) . '#gallery' ); ?>" <?php echo $vsp_copy ? 'tabindex="-1"' : ''; ?> data-cursor="view" data-distort-root draggable="false" class="absolute inset-0 overflow-hidden">
							<img src="<?php echo esc_url( $vsp_p['src'] ); ?>" alt="<?php echo $vsp_copy ? '' : esc_attr( $vsp_p['alt'] ); ?>" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105">
							<canvas data-distort aria-hidden="true" class="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-300"></canvas>
						</a>
						<figcaption class="absolute -bottom-9 left-0 flex w-full justify-between text-xs uppercase tracking-[0.2em] text-bone/55">
							<span><?php echo esc_html( isset( $vsp_cats[ $vsp_p['category'] ] ) ? $vsp_cats[ $vsp_p['category'] ]['short'] : '' ); ?></span>
							<span class="tabular-nums"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></span>
						</figcaption>
					</figure>
				<?php endforeach; ?>
			<?php endfor; ?>
		</div>
	</div>
</section>
