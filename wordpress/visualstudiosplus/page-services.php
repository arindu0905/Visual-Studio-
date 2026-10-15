<?php
/**
 * Template Name: Services
 *
 * @package VisualStudiosPlus
 */

$vsp_services = vsp_services();
$vsp_total    = count( $vsp_services );

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow' => __( 'End-to-end capabilities & production disciplines', 'vsp' ),
		'title'   => __( 'Studio services.', 'vsp' ),
		'intro'   => esc_html__( '6 core studio disciplines engineered under one roof in Colombo 04. Fast turnarounds, broadcast color grading, and organic social dominance.', 'vsp' ),
	)
);
?>
<nav aria-label="<?php esc_attr_e( 'Services', 'vsp' ); ?>" class="container-x pb-10">
	<ul class="flex flex-wrap gap-2">
		<?php foreach ( $vsp_services as $vsp_i => $vsp_s ) : ?>
			<li>
				<a href="#<?php echo esc_attr( $vsp_s['slug'] ); ?>" class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-bone/75 transition-colors hover:border-bronze hover:text-bone">
					<span class="text-xs text-bronze"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></span>
					<?php echo esc_html( $vsp_s['title'] ); ?>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>

<div class="border-t border-line">
	<?php foreach ( $vsp_services as $vsp_i => $vsp_s ) : $vsp_odd = 1 === $vsp_i % 2; ?>
		<section id="<?php echo esc_attr( $vsp_s['slug'] ); ?>" aria-labelledby="<?php echo esc_attr( $vsp_s['slug'] ); ?>-title" class="scroll-mt-24 border-b border-line py-20 md:py-32">
			<div class="container-x grid gap-10 md:grid-cols-12 md:gap-8">
				<div class="md:col-span-5 <?php echo $vsp_odd ? 'md:order-2 md:col-start-8' : ''; ?>">
					<div class="md:sticky md:top-32">
						<p class="text-sm tabular-nums text-bronze"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) . ' / ' . vsp_pad( $vsp_total ) ); ?></p>
						<h2 id="<?php echo esc_attr( $vsp_s['slug'] ); ?>-title" class="display-md mt-6"><?php echo esc_html( $vsp_s['title'] ); ?></h2>
						<div<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
							<p class="mt-8 max-w-md text-lg leading-relaxed text-bone/70"><?php echo esc_html( $vsp_s['summary'] ); ?></p>
						</div>
						<?php if ( $vsp_s['scope'] ) : ?>
							<div<?php echo vsp_reveal( 0.1 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
								<ul class="mt-10 border-t border-line">
									<?php foreach ( $vsp_s['scope'] as $vsp_item ) : ?>
										<li class="flex items-center justify-between border-b border-line py-4 text-bone/85">
											<?php echo esc_html( $vsp_item ); ?>
											<span aria-hidden="true" class="size-1.5 rounded-full bg-bronze/70"></span>
										</li>
									<?php endforeach; ?>
								</ul>
							</div>
						<?php endif; ?>
						<?php if ( $vsp_s['link'] ) : ?>
							<div class="mt-10"<?php echo vsp_reveal( 0.15 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
								<?php echo vsp_button( $vsp_s['link'], __( 'See the work', 'vsp' ), array( 'variant' => 'outline' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
				<div class="md:col-span-6 <?php echo $vsp_odd ? 'md:order-1 md:col-start-1' : 'md:col-start-7'; ?>">
					<?php if ( $vsp_s['image'] ) { echo vsp_parallax_image( $vsp_s['image'], $vsp_s['image_alt'], array( 'class' => 'aspect-[4/5] w-full' ) ); } // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</div>
			</div>
		</section>
	<?php endforeach; ?>
</div>

<?php
get_template_part(
	'template-parts/cta',
	null,
	array(
		'title'  => __( 'Capabilities built for end-to-end commercial momentum.', 'vsp' ),
		'text'   => __( 'Need a custom agency retainer or dedicated production team? We work on project-by-project commissions and full-year creative retainers.', 'vsp' ),
		'button' => __( 'Inquire capabilities', 'vsp' ),
	)
);
get_footer();
