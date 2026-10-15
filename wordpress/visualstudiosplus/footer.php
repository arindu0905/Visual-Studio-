<?php
/**
 * Site footer, showreel modal and custom cursor.
 *
 * @package VisualStudiosPlus
 */

$vsp_site     = vsp_site();
$vsp_services = vsp_services();
$vsp_services_url = vsp_page_url( 'services' );
?>
</main>

<footer class="relative overflow-hidden border-t border-line bg-ink pt-24 md:pt-32">
	<div class="container-x">
		<div class="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-8">
			<div class="col-span-2 md:col-span-5">
				<p class="eyebrow mb-6"><?php echo esc_html( $vsp_site['name'] ); ?></p>
				<p class="max-w-sm font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.05] tracking-[-0.03em] md:text-4xl">
					<?php esc_html_e( 'We create content meant to be', 'vsp' ); ?> <span class="serif-accent text-bronze"><?php esc_html_e( 'experienced.', 'vsp' ); ?></span> <?php esc_html_e( 'Not simply consumed.', 'vsp' ); ?>
				</p>
				<p class="mt-6 max-w-sm text-bone/60"><?php esc_html_e( 'Colombo’s premier creative, cinematography, and digital agency.', 'vsp' ); ?></p>
				<a href="mailto:<?php echo esc_attr( $vsp_site['contact']['email'] ); ?>" class="link-underline mt-8 inline-flex items-center gap-2 text-lg text-bone/85 hover:text-bone">
					<?php echo esc_html( $vsp_site['contact']['email'] ); ?>
					<?php echo vsp_icon( 'arrow-up-right', 'size-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>
			</div>

			<nav aria-label="<?php esc_attr_e( 'Footer', 'vsp' ); ?>" class="md:col-span-2 md:col-start-7">
				<p class="eyebrow mb-5"><?php esc_html_e( 'Navigation', 'vsp' ); ?></p>
				<ul class="space-y-2.5 text-[0.95rem]">
					<?php foreach ( vsp_nav_items( 'footer' ) as $vsp_item ) : ?>
						<li><a href="<?php echo esc_url( $vsp_item['href'] ); ?>" class="link-underline text-bone/70 transition-colors hover:text-bone"><?php echo esc_html( $vsp_item['label'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</nav>

			<div class="md:col-span-2">
				<p class="eyebrow mb-5"><?php esc_html_e( 'Services', 'vsp' ); ?></p>
				<ul class="space-y-2.5 text-[0.95rem]">
					<?php foreach ( $vsp_services as $vsp_s ) : ?>
						<li><a href="<?php echo esc_url( $vsp_services_url . '#' . $vsp_s['slug'] ); ?>" class="link-underline text-bone/70 transition-colors hover:text-bone"><?php echo esc_html( $vsp_s['title'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="col-span-2 md:col-span-2">
				<p class="eyebrow mb-5"><?php esc_html_e( 'Visit Colombo studio', 'vsp' ); ?></p>
				<address class="space-y-2.5 text-[0.95rem] not-italic text-bone/70">
					<p>
						<?php foreach ( $vsp_site['contact']['address'] as $vsp_line ) : ?>
							<span class="block"><?php echo esc_html( $vsp_line ); ?></span>
						<?php endforeach; ?>
					</p>
					<?php foreach ( $vsp_site['contact']['phones'] as $vsp_p ) : ?>
						<a href="<?php echo esc_attr( vsp_tel( $vsp_p ) ); ?>" class="link-underline block w-fit hover:text-bone"><?php echo esc_html( $vsp_p ); ?></a>
					<?php endforeach; ?>
				</address>
				<p class="eyebrow mb-4 mt-8"><?php esc_html_e( 'Direct channels', 'vsp' ); ?></p>
				<ul class="space-y-2.5 text-[0.95rem]">
					<?php foreach ( vsp_socials() as $vsp_s ) : ?>
						<li><a href="<?php echo esc_url( $vsp_s['href'] ); ?>" target="_blank" rel="noopener noreferrer" class="link-underline text-bone/70 hover:text-bone"><?php echo esc_html( $vsp_s['label'] ); ?><span class="sr-only"> <?php esc_html_e( '(opens in a new tab)', 'vsp' ); ?></span></a></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	</div>

	<div aria-hidden="true" class="container-x mt-24 select-none md:mt-32">
		<p class="whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[19.5vw] font-black leading-[0.75] tracking-[-0.06em] text-bone/[0.06] md:text-[18vw]">Visual<span class="text-bronze/30">+</span></p>
	</div>

	<div class="container-x flex flex-col items-start justify-between gap-4 border-t border-line py-7 text-xs text-stone sm:flex-row sm:items-center">
		<p>© <?php echo esc_html( gmdate( 'Y' ) . ' ' . $vsp_site['name'] ); ?>. <?php esc_html_e( 'All rights reserved. Made in Colombo.', 'vsp' ); ?></p>
		<p><?php esc_html_e( 'Colombo, Sri Lanka', 'vsp' ); ?></p>
		<button type="button" data-back-to-top class="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-bone">
			<?php esc_html_e( 'Back to top', 'vsp' ); ?>
			<?php echo vsp_icon( 'arrow-up', 'size-3.5 transition-transform duration-500 group-hover:-translate-y-1' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</button>
	</div>
</footer>

<div id="showreel-modal" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( $vsp_site['name'] . ' showreel' ); ?>" class="reel-modal fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-12">
	<button type="button" data-reel-close class="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-bone/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink md:right-8 md:top-8">
		<?php esc_html_e( 'Close', 'vsp' ); ?> <?php echo vsp_icon( 'x', 'size-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</button>
	<video controls playsinline preload="none" poster="<?php echo esc_url( $vsp_site['media']['poster'] ); ?>" class="max-h-full w-full max-w-7xl bg-black"></video>
</div>

<div aria-hidden="true" class="vsp-cursor pointer-events-none fixed left-0 top-0 z-[100]">
	<div class="vsp-cursor-dot flex items-center justify-center rounded-full">
		<span class="vsp-cursor-label text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink"></span>
	</div>
</div>

<?php wp_footer(); ?>
</body>
</html>
