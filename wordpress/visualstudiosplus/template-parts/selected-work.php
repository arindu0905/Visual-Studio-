<?php
/**
 * Homepage: films in an asymmetric editorial layout.
 *
 * @package VisualStudiosPlus
 */

$vsp_layout = array(
	array( 'md:col-span-8', 'aspect-[16/10]' ),
	array( 'md:col-span-4 md:mt-[22vw]', 'aspect-[4/5]' ),
	array( 'md:col-span-5 md:col-start-2 md:-mt-[6vw]', 'aspect-[4/5]' ),
	array( 'md:col-span-6 md:col-start-7 md:mt-[12vw]', 'aspect-[16/11]' ),
);
?>
<section aria-labelledby="work-title" class="relative py-28 md:py-40">
	<div class="container-x">
		<div class="mb-16 flex flex-col gap-8 md:mb-28 md:flex-row md:items-end md:justify-between">
			<div>
				<?php echo vsp_section_label( '03', __( 'Selected works preview', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo vsp_split( __( 'Crafted for screen, built for cultural impact.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'work-title', 'class' => 'display-lg mt-8' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
			<div class="max-w-sm"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="text-bone/65"><?php esc_html_e( 'Every client brief is treated as a growth partnership. We blend high-fashion visual standards with aggressive social media reach, high-velocity turnaround, and conversion-driven storytelling.', 'vsp' ); ?></p>
			</div>
		</div>

		<div class="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-0">
			<?php
			foreach ( array_slice( vsp_projects(), 0, 4 ) as $vsp_i => $vsp_p ) {
				$vsp_l = $vsp_layout[ $vsp_i % count( $vsp_layout ) ];
				get_template_part( 'template-parts/project-card', null, array( 'project' => $vsp_p, 'index' => $vsp_i, 'class' => $vsp_l[0], 'aspect' => $vsp_l[1] ) );
			}
			?>
		</div>

		<?php get_template_part( 'template-parts/case-list', null, array( 'cases' => array_slice( vsp_cases(), 0, 3 ), 'summary' => true, 'class' => 'mt-28 md:mt-44' ) ); ?>

		<div class="mt-24 flex justify-center md:mt-36">
			<?php echo vsp_button( vsp_page_url( 'work' ), __( 'View all projects & campaigns', 'vsp' ), array( 'variant' => 'outline' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</div>
	</div>
</section>
