<?php
/**
 * The showreel grows from an inset frame to full-bleed as it scrolls into view.
 *
 * @package VisualStudiosPlus
 */

$vsp_site = vsp_site();
?>
<section aria-labelledby="reel-title" class="relative py-28 md:py-40">
	<div class="container-x mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
		<div class="md:col-span-6">
			<?php echo vsp_section_label( '05', __( 'Agency operating philosophy', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<h2 id="reel-title" class="display-md mt-8 max-w-[14ch]"><?php esc_html_e( 'Our videography', 'vsp' ); ?> <span class="serif-accent text-bronze"><?php esc_html_e( 'showreel', 'vsp' ); ?></span></h2>
		</div>
		<div class="self-end md:col-span-5 md:col-start-8"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<p class="text-lg leading-relaxed text-bone/70"><?php echo esc_html( $vsp_site['videography']['statement'] ); ?></p>
		</div>
	</div>

	<div class="relative" data-reel-band>
		<button type="button" data-showreel data-cursor="play" aria-label="<?php echo esc_attr( sprintf( __( 'Play the %s showreel', 'vsp' ), $vsp_site['name'] ) ); ?>" class="reel-band group relative block aspect-[4/5] w-full overflow-hidden bg-ink-3 sm:aspect-video">
			<video src="<?php echo esc_url( $vsp_site['media']['showreel'] . '#t=' . $vsp_site['media']['showreel_loop'][0] ); ?>" poster="<?php echo esc_url( $vsp_site['media']['poster'] ); ?>" muted loop playsinline preload="none" aria-hidden="true" class="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.03]"></video>
			<span aria-hidden="true" class="absolute inset-0 bg-ink/30"></span>
			<span class="absolute inset-0 grid place-items-center">
				<span class="grid size-24 place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110 md:hidden">
					<?php echo vsp_icon( 'play', 'size-6 translate-x-0.5 fill-current' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</span>
			</span>
			<span class="container-x absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 pb-6 text-left md:pb-10">
				<?php foreach ( $vsp_site['videography']['manifesto'] as $vsp_m ) : ?>
					<span class="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.03em] text-bone md:text-3xl"><?php echo esc_html( $vsp_m ); ?></span>
				<?php endforeach; ?>
			</span>
		</button>
	</div>
</section>
