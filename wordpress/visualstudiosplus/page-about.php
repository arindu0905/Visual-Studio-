<?php
/**
 * Template Name: About
 *
 * @package VisualStudiosPlus
 */

$vsp_site = vsp_site();
$vsp_disc = 'transition-transform duration-[1400ms] group-hover:scale-105';
$vsp_caps = array( 'Videography & TVC', 'Commercial Photo', 'Digital Retainers', 'CGI & Generative AI', 'Brand Packaging', 'Paid Performance' );

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow' => __( 'Studio profile & core manifesto', 'vsp' ),
		'title'   => __( 'About Visual Studios Plus.', 'vsp' ),
		'intro'   => esc_html__( 'Engineered in Colombo, built for global attention. Discover our founding story, studio culture, in-house capabilities, and trusted client partnerships.', 'vsp' ),
	)
);

echo vsp_parallax_image( vsp_asset( 'DJI_0078-HDR.webp' ), __( 'Aerial photograph of a hillside resort among tea country greenery', 'vsp' ), array( 'strength' => 10, 'priority' => true, 'class' => 'aspect-[4/5] w-full sm:aspect-[21/9]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
?>

<section aria-labelledby="profile-title" class="py-28 md:py-44">
	<div class="container-x grid gap-16 md:grid-cols-12">
		<div class="md:col-span-5">
			<?php echo vsp_section_label( '01', __( 'Agency profile & heritage', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<p class="eyebrow mt-6 text-bronze"><?php esc_html_e( 'Colombo 04, Sri Lanka', 'vsp' ); ?></p>
			<?php echo vsp_split( $vsp_site['about']['statement'], array( 'tag' => 'h2', 'id' => 'profile-title', 'class' => 'display-md mt-8 max-w-[16ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</div>
		<div class="space-y-6 text-lg leading-relaxed text-bone/70 md:col-span-6 md:col-start-7">
			<p<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php echo esc_html( $vsp_site['about']['body'] ); ?></p>
			<p<?php echo vsp_reveal( 0.05 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php esc_html_e( 'We stepped into the digital agency ecosystem to replace slow, outdated advertising models with real-time digital strategy, fast-turnaround production war rooms, and cinema-grade storytelling.', 'vsp' ); ?></p>
			<p<?php echo vsp_reveal( 0.1 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php esc_html_e( 'Today, we partner with Sri Lanka’s favorite household brands and multinational conglomerates to engineer social campaigns that stop the feed and drive verified commercial recall.', 'vsp' ); ?></p>
			<ul class="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-8 text-sm text-bone/80"<?php echo vsp_reveal( 0.15 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<?php foreach ( $vsp_caps as $vsp_cap ) : ?>
					<li><span class="text-bronze">//</span> <?php echo esc_html( $vsp_cap ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</section>

<section aria-labelledby="mission-title" class="border-t border-line bg-ink-2 py-28 md:py-40">
	<div class="container-x">
		<?php echo vsp_section_label( '02', __( 'Our core mission', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php echo vsp_split( __( 'To help brands smash commercial targets and bring their visions to life using savvy digital solutions.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'mission-title', 'class' => 'display-md mt-8 max-w-[22ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<div class="mt-12 grid gap-10 md:grid-cols-12">
			<div class="md:col-span-6"<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="text-lg leading-relaxed text-bone/70"><?php esc_html_e( 'We believe content shouldn’t simply sit in feeds. It needs to ignite emotion, elevate sensory appeal, and make brands unforgettable in the new digital and retail landscape.', 'vsp' ); ?></p>
			</div>
			<div class="space-y-6 text-sm md:col-span-5 md:col-start-8"<?php echo vsp_reveal( 0.1 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<div>
					<p class="eyebrow mb-2"><?php esc_html_e( 'Headquarters', 'vsp' ); ?></p>
					<p class="text-bone/80"><?php echo esc_html( implode( ', ', array_slice( $vsp_site['contact']['address'], 0, 2 ) ) ); ?></p>
				</div>
				<div>
					<p class="eyebrow mb-2"><?php esc_html_e( '// Studio standards', 'vsp' ); ?></p>
					<p class="leading-relaxed text-bone/80"><?php esc_html_e( '4K Cinema Cameras (Sony FX & RED), DaVinci Resolve color suites, professional food styling kitchens, and live event on-ground edit war rooms.', 'vsp' ); ?></p>
				</div>
			</div>
		</div>

		<div class="mt-20 grid grid-cols-2 border-t border-line md:mt-28 md:grid-cols-4">
			<?php foreach ( vsp_default_stats() as $vsp_i => $vsp_stat ) : ?>
				<div class="border-b border-line py-8 pr-6 md:border-b-0 md:py-12"<?php echo vsp_reveal( $vsp_i * 0.06 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<p class="font-[family-name:var(--font-display)] text-5xl font-black tracking-[-0.04em] text-bronze md:text-7xl"><?php echo esc_html( $vsp_stat[0] ); ?></p>
					<p class="mt-3 text-sm text-bone/60"><?php echo esc_html( $vsp_stat[1] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section aria-labelledby="disciplines-title" class="py-28 md:py-40">
	<div class="container-x">
		<div class="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
			<div>
				<?php echo vsp_section_label( '03', __( 'In-house capabilities', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo vsp_split( __( 'One full-service studio. Zero creative fragmentation.', 'vsp' ), array( 'tag' => 'h2', 'id' => 'disciplines-title', 'class' => 'display-lg mt-8 max-w-[16ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
			<div<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<a href="<?php echo esc_url( vsp_page_url( 'services' ) ); ?>" class="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
					<span class="link-underline"><?php esc_html_e( 'Capabilities & Services', 'vsp' ); ?></span>
					<?php echo vsp_icon( 'arrow-up-right', 'size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>
			</div>
		</div>

		<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			<div<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<a href="<?php echo esc_url( vsp_page_url( 'work' ) ); ?>" data-cursor="view" data-distort-root class="group block">
					<?php echo vsp_parallax_image( vsp_youtube_thumb( 'd-_dQ9-LmxE' ), __( 'Chef Peter Kuruvita on set for ITC Rathnadeepa', 'vsp' ), array( 'strength' => 6, 'distort' => true, 'class' => 'aspect-[3/2] w-full', 'img_class' => $vsp_disc ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<p class="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]"><?php esc_html_e( 'Videography & TVC', 'vsp' ); ?></p>
					<p class="mt-1 text-sm text-bone/55"><?php esc_html_e( '100% In-House Production', 'vsp' ); ?></p>
				</a>
			</div>
			<?php foreach ( vsp_photo_disciplines() as $vsp_i => $vsp_d ) : ?>
				<div<?php echo vsp_reveal( ( ( $vsp_i + 1 ) % 3 ) * 0.08 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<a href="<?php echo esc_url( vsp_page_url( 'photography' ) ); ?>" data-cursor="view" data-distort-root class="group block">
						<?php echo vsp_parallax_image( vsp_asset( $vsp_d[1] ), $vsp_d[2], array( 'strength' => 6, 'distort' => true, 'class' => 'aspect-[3/2] w-full', 'img_class' => $vsp_disc ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<p class="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]"><?php echo esc_html( $vsp_d[0] ); ?></p>
						<p class="mt-1 text-sm text-bone/55"><?php esc_html_e( 'Commercial Photo', 'vsp' ); ?></p>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
get_template_part(
	'template-parts/clients',
	null,
	array(
		'title' => __( 'Brands that trust our lens and strategy.', 'vsp' ),
	)
);
get_template_part(
	'template-parts/cta',
	null,
	array(
		'eyebrow' => __( 'Inquire project', 'vsp' ),
		'title'   => __( 'Want to partner with Visual Studios Plus?', 'vsp' ),
		'text'    => __( 'Commission a dedicated production or discuss a multi-channel retainer.', 'vsp' ),
		'button'  => __( 'Inquire project', 'vsp' ),
	)
);
get_footer();
