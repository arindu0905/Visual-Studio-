<?php
/**
 * Shared typographic header for inner pages. Args: eyebrow, title, intro (HTML).
 *
 * @package VisualStudiosPlus
 */

?>
<section class="relative pb-16 pt-36 md:pb-24 md:pt-52">
	<div class="container-x">
		<div<?php echo vsp_reveal( 0, 12 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<p class="eyebrow flex items-center gap-3">
				<span class="size-1.5 rounded-full bg-bronze" aria-hidden="true"></span>
				<?php echo esc_html( $args['eyebrow'] ); ?>
			</p>
		</div>
		<?php echo vsp_split( $args['title'], array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.15, 'class' => 'display-xl mt-8 max-w-[14ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php if ( ! empty( $args['intro'] ) ) : ?>
			<div class="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
				<div class="md:col-span-5 md:col-start-8"<?php echo vsp_reveal( 0.5 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<div class="text-lg leading-relaxed text-bone/70 md:text-xl"><?php echo wp_kses_post( $args['intro'] ); ?></div>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>
