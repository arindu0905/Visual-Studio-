<?php
/**
 * Text-only case study rows. Args: cases, summary (bool), class.
 *
 * @package VisualStudiosPlus
 */

$vsp_cases = isset( $args['cases'] ) ? $args['cases'] : vsp_cases();
if ( ! $vsp_cases ) {
	return;
}
?>
<ol class="border-b border-line <?php echo esc_attr( isset( $args['class'] ) ? $args['class'] : '' ); ?>">
	<?php foreach ( $vsp_cases as $vsp_i => $vsp_c ) : ?>
		<li class="group relative grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14"<?php echo vsp_reveal( 0, 20 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<span aria-hidden="true" class="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-bone/[0.03] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"></span>
			<div class="relative md:col-span-3">
				<p class="eyebrow"><?php echo esc_html( trim( $vsp_c['type'] . ( $vsp_c['year'] ? ' · ' . $vsp_c['year'] : '' ), ' ·' ) ); ?></p>
				<p class="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-bronze"><?php echo esc_html( $vsp_c['client'] ); ?></p>
			</div>
			<div class="relative md:col-span-6">
				<h3 class="font-[family-name:var(--font-display)] text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl"><?php echo esc_html( $vsp_c['title'] ); ?></h3>
				<?php if ( $vsp_c['tagline'] ) : ?>
					<p class="mt-2 text-bone/60"><?php echo esc_html( $vsp_c['tagline'] ); ?></p>
				<?php endif; ?>
				<?php if ( ! empty( $args['summary'] ) && $vsp_c['summary'] ) : ?>
					<p class="mt-5 max-w-2xl leading-relaxed text-bone/70"><?php echo esc_html( $vsp_c['summary'] ); ?></p>
				<?php endif; ?>
				<?php if ( $vsp_c['tags'] ) : ?>
					<ul class="mt-5 flex flex-wrap gap-2">
						<?php foreach ( $vsp_c['tags'] as $vsp_t ) : ?>
							<li class="rounded-full border border-line px-3 py-1 text-xs text-bone/70"><?php echo esc_html( $vsp_t ); ?></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>
			<div class="relative md:col-span-3 md:text-right">
				<?php if ( $vsp_c['metric'] ) : ?>
					<p class="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-bronze md:text-5xl"><?php echo esc_html( $vsp_c['metric'] ); ?></p>
					<p class="mt-2 text-sm text-bone/55"><?php echo esc_html( $vsp_c['metric_label'] ); ?></p>
				<?php else : ?>
					<p class="text-xs tabular-nums text-stone"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></p>
				<?php endif; ?>
			</div>
		</li>
	<?php endforeach; ?>
</ol>
