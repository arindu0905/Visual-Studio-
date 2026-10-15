<?php
/**
 * Homepage: services index.
 *
 * @package VisualStudiosPlus
 */

?>
<section aria-labelledby="services-title" class="relative py-28 md:py-40">
	<div class="container-x">
		<div class="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
			<div class="md:col-span-7">
				<?php echo vsp_section_label( '02', __( 'Capabilities overview', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo vsp_split( __( 'One full-service studio. Zero creative fragmentation.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'services-title', 'class' => 'display-lg mt-8' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
			<div class="self-end md:col-span-4 md:col-start-9"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="text-lg leading-relaxed text-bone/70"><?php esc_html_e( 'Need a custom agency retainer or dedicated production team? We work on project-by-project commissions and full-year creative retainers.', 'vsp' ); ?></p>
			</div>
		</div>
		<?php get_template_part( 'template-parts/service-list' ); ?>
	</div>
</section>
