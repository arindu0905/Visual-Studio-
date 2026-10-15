<?php
/**
 * Work (/work/): all films plus the photography categories.
 *
 * @package VisualStudiosPlus
 */

$vsp_projects = vsp_projects();
$vsp_cats     = array_values( vsp_photo_categories() );
$vsp_total    = vsp_photo_count();
$vsp_photo_url = vsp_page_url( 'photography' );
$vsp_youtube  = wp_list_filter( vsp_socials(), array( 'label' => 'YouTube' ) );
$vsp_youtube  = $vsp_youtube ? reset( $vsp_youtube )['href'] : '';
$vsp_layout   = array(
	array( 'md:col-span-12', 'aspect-[4/5] sm:aspect-[21/9]' ),
	array( 'md:col-span-5', 'aspect-[4/5]' ),
	array( 'md:col-span-6 md:col-start-7 md:mt-[14vw]', 'aspect-[16/11]' ),
	array( 'md:col-span-8 md:col-start-3', 'aspect-[16/9]' ),
);

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		/* translators: 1: number of films, 2: number of photographs */
		'eyebrow' => __( 'Commercial work & campaign archive', 'vsp' ),
		'title'   => __( 'Our work & projects.', 'vsp' ),
		'intro'   => esc_html__( 'High-impact commercial films, viral social campaigns, FMCG storytelling, and brand imagery created by Visual Studios Plus for market-leading brands.', 'vsp' ),
	)
);
?>

<section aria-labelledby="films-title" class="pb-28 md:pb-40">
	<div class="container-x">
		<div class="mb-14 flex items-end justify-between border-b border-line pb-6">
			<h2 id="films-title" class="eyebrow"><span class="text-bronze">(A)</span> <?php esc_html_e( 'TVC & Films', 'vsp' ); ?></h2>
			<?php if ( $vsp_youtube ) : ?>
				<a href="<?php echo esc_url( $vsp_youtube ); ?>" target="_blank" rel="noopener noreferrer" class="eyebrow link-underline text-bone/70 hover:text-bone"><?php esc_html_e( 'YouTube channel ↗', 'vsp' ); ?></a>
			<?php endif; ?>
		</div>
		<div class="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
			<?php
			foreach ( $vsp_projects as $vsp_i => $vsp_p ) {
				$vsp_l = $vsp_layout[ $vsp_i % count( $vsp_layout ) ];
				get_template_part( 'template-parts/project-card', null, array( 'project' => $vsp_p, 'index' => $vsp_i, 'class' => $vsp_l[0], 'aspect' => $vsp_l[1] ) );
			}
			?>
		</div>
	</div>
</section>

<section aria-labelledby="cases-title" class="pb-28 md:pb-40">
	<div class="container-x">
		<div class="mb-16 grid gap-8 md:mb-20 md:grid-cols-12">
			<div class="md:col-span-7">
				<?php echo vsp_section_label( 'B', __( 'Flagship portfolio', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo vsp_split( __( 'Projects engineered for verifiable business impact.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'cases-title', 'class' => 'display-lg mt-8' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
			<div class="self-end md:col-span-4 md:col-start-9"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="text-lg text-bone/70"><?php esc_html_e( 'Every client brief is treated as a growth partnership. We blend high-fashion visual standards with aggressive social media reach, high-velocity turnaround, and conversion-driven storytelling.', 'vsp' ); ?></p>
			</div>
		</div>
		<?php get_template_part( 'template-parts/case-list', null, array( 'cases' => vsp_cases() ) ); ?>
	</div>
</section>

<section aria-labelledby="photo-title" class="bg-ink-2 py-28 md:py-40">
	<div class="container-x">
		<div class="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
			<div class="md:col-span-7">
				<?php echo vsp_section_label( 'C', __( 'Commercial photography', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo vsp_split( __( 'The photography archive.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'photo-title', 'class' => 'display-lg mt-8' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
			<div class="self-end md:col-span-4 md:col-start-9"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="text-lg text-bone/70"><?php esc_html_e( 'Browse by discipline, or open the full archive.', 'vsp' ); ?></p>
				<a href="<?php echo esc_url( $vsp_photo_url ); ?>" class="eyebrow link-underline mt-6 inline-block text-bone">
					<?php /* translators: %d: number of photographs */ echo esc_html( sprintf( __( 'View all %d photographs →', 'vsp' ), $vsp_total ) ); ?>
				</a>
			</div>
		</div>

		<div class="grid gap-x-8 gap-y-16 md:grid-cols-12">
			<?php foreach ( $vsp_cats as $vsp_i => $vsp_c ) : $vsp_even = 0 === $vsp_i % 2; ?>
				<article class="group <?php echo $vsp_even ? 'md:col-span-7' : 'md:col-span-5 md:mt-[10vw]'; ?>">
					<a href="<?php echo esc_url( add_query_arg( 'category', $vsp_c['id'], $vsp_photo_url ) . '#gallery' ); ?>" data-cursor="view" data-distort-root class="block">
						<?php echo vsp_parallax_image( $vsp_c['cover'], $vsp_c['cover_alt'], array( 'distort' => true, 'class' => $vsp_even ? 'aspect-[16/11] w-full' : 'aspect-[4/5] w-full', 'img_class' => 'transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<div class="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
							<div>
								<h3 class="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] transition-colors duration-500 group-hover:text-bronze md:text-3xl"><?php echo esc_html( $vsp_c['label'] ); ?></h3>
								<p class="mt-1.5 text-sm text-bone/55"><?php /* translators: %d: number of photographs */ echo esc_html( sprintf( __( '%d photographs', 'vsp' ), vsp_photo_count( $vsp_c['id'] ) ) ); ?></p>
							</div>
							<span class="pt-2 text-xs tabular-nums text-stone"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></span>
						</div>
					</a>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
get_template_part(
	'template-parts/cta',
	null,
	array(
		'text'   => __( 'Looking for custom creative direction, an integrated campaign, or an ongoing social retainer?', 'vsp' ),
		'button' => __( 'Start a Project with Visual Studios+', 'vsp' ),
	)
);
get_footer();
