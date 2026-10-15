<?php
/**
 * Typographic index of services. On fine pointers, hovering a row floats a
 * cursor-following image preview; the number slides and the title indents.
 *
 * @package VisualStudiosPlus
 */

$vsp_services = vsp_services();
$vsp_url      = vsp_page_url( 'services' );
?>
<div class="relative" data-service-list>
	<ul class="border-b border-line">
		<?php foreach ( $vsp_services as $vsp_i => $vsp_s ) : ?>
			<li class="border-t border-line">
				<a href="<?php echo esc_url( $vsp_url . '#' . $vsp_s['slug'] ); ?>" data-index="<?php echo (int) $vsp_i; ?>" class="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] md:gap-x-8 md:py-10">
					<span aria-hidden="true" class="absolute inset-0 origin-bottom scale-y-0 bg-bone/[0.035] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"></span>
					<span class="relative text-xs tabular-nums text-stone transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:text-bronze md:text-sm"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></span>
					<span class="relative">
						<span class="block font-[family-name:var(--font-display)] text-[clamp(1.9rem,5.2vw,5.2rem)] font-medium leading-none tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 md:group-hover:translate-x-8"><?php echo esc_html( $vsp_s['title'] ); ?></span>
						<span class="mt-3 block max-w-md text-sm leading-relaxed text-bone/55 md:hidden"><?php echo esc_html( $vsp_s['summary'] ); ?></span>
					</span>
					<span class="relative hidden text-sm leading-relaxed text-bone/55 transition-colors duration-500 group-hover:text-bone/85 md:block"><?php echo esc_html( implode( ' · ', $vsp_s['scope'] ) ); ?></span>
					<span class="relative grid size-10 place-items-center justify-self-end rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink md:size-12">
						<?php echo vsp_icon( 'arrow-up-right', 'size-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</span>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>

	<div aria-hidden="true" class="sl-preview pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
		<div class="sl-card relative -ml-40 -mt-28 h-56 w-80 overflow-hidden">
			<?php foreach ( $vsp_services as $vsp_i => $vsp_s ) : ?>
				<div class="sl-img absolute inset-0" data-index="<?php echo (int) $vsp_i; ?>">
					<img src="<?php echo esc_url( $vsp_s['image'] ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover">
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
