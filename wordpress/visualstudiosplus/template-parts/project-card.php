<?php
/**
 * Film card. Args: project, index, aspect, class.
 *
 * @package VisualStudiosPlus
 */

$vsp_p     = $args['project'];
$vsp_index = (int) $args['index'];
$vsp_img   = 'transition-transform duration-[1400ms] ease-[var(--ease-expo)] ' . ( $vsp_p['letterboxed'] ? 'scale-[1.32] group-hover:scale-[1.38]' : 'group-hover:scale-[1.06]' );
?>
<article class="group <?php echo esc_attr( $args['class'] ); ?>">
	<a href="<?php echo esc_url( $vsp_p['url'] ); ?>" data-cursor="view" data-distort-root class="block" aria-label="<?php echo esc_attr( $vsp_p['title'] . ' — ' . $vsp_p['category'] ); ?>">
		<div class="relative overflow-hidden">
			<?php echo vsp_parallax_image( $vsp_p['cover'], $vsp_p['cover_alt'], array( 'strength' => 8, 'distort' => true, 'class' => $args['aspect'] . ' w-full', 'img_class' => $vsp_img ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15"></div>
			<span class="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bone backdrop-blur-md md:left-6 md:top-6"><?php esc_html_e( 'Film', 'vsp' ); ?></span>
		</div>
		<div class="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5"<?php echo vsp_reveal( 0, 20 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<div>
				<h3 class="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover:text-bronze md:text-3xl"><?php echo esc_html( $vsp_p['title'] ); ?></h3>
				<p class="mt-1.5 text-sm text-bone/55"><?php echo esc_html( $vsp_p['category'] ); ?></p>
			</div>
			<span class="pt-2 text-xs tabular-nums text-stone"><?php echo esc_html( vsp_pad( $vsp_index + 1 ) ); ?></span>
		</div>
	</a>
</article>
