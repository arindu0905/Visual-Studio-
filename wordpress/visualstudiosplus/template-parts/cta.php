<?php
/**
 * Closing call to action. Args (all optional): eyebrow, title, text, button.
 *
 * @package VisualStudiosPlus
 */

$vsp_site  = vsp_site();
$vsp_a     = wp_parse_args(
	isset( $args ) && is_array( $args ) ? $args : array(),
	array(
		'eyebrow' => __( 'Accepting select commercial briefs for 2026', 'vsp' ),
		'title'   => __( 'Ready to turn audience attention into measurable commercial growth?', 'vsp' ),
		'text'    => __( 'From full-scale television commercials to viral social campaigns and retainer channel growth, let\'s engineer something iconic together.', 'vsp' ),
		'button'  => __( 'Start a project brief', 'vsp' ),
	)
);
?>
<section aria-labelledby="cta-title" class="relative overflow-hidden py-32 md:py-48">
	<div aria-hidden="true" class="pointer-events-none absolute left-1/2 top-1/2 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.07] blur-[120px]"></div>
	<div class="container-x relative">
		<p class="eyebrow mb-10 flex items-center gap-3">
			<span class="size-1.5 animate-pulse rounded-full bg-bronze" aria-hidden="true"></span>
			<?php echo esc_html( $vsp_a['eyebrow'] ); ?>
		</p>
		<?php echo vsp_split( $vsp_a['title'], array( 'tag' => 'h2', 'id' => 'cta-title', 'class' => 'display-lg max-w-[20ch]', 'stagger' => 0.05 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php if ( $vsp_a['text'] ) : ?>
			<div class="mt-10"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="max-w-xl text-lg leading-relaxed text-bone/70 md:text-xl"><?php echo esc_html( $vsp_a['text'] ); ?></p>
			</div>
		<?php endif; ?>

		<div class="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
			<div<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<a href="mailto:<?php echo esc_attr( $vsp_site['contact']['email'] ); ?>" class="group inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(1.4rem,3.4vw,3rem)] font-medium tracking-[-0.03em]">
					<span class="link-underline pb-1"><?php echo esc_html( $vsp_site['contact']['email'] ); ?></span>
					<?php echo vsp_icon( 'arrow-up-right', 'size-[0.9em] text-bronze transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>
				<p class="mt-4 text-bone/55"><?php echo esc_html( implode( '  ·  ', $vsp_site['contact']['phones'] ) ); ?></p>
			</div>
			<div<?php echo vsp_reveal( 0.1 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<?php echo vsp_button( vsp_page_url( 'contact' ), $vsp_a['button'], array( 'class' => 'px-9 py-5 text-base' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
		</div>
	</div>
</section>
