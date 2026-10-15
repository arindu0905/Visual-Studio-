<?php
/**
 * Film page with a lazy (privacy-enhanced) YouTube player.
 *
 * @package VisualStudiosPlus
 */

$vsp_projects = vsp_projects();
$vsp_id       = get_queried_object_id();
$vsp_index    = array_search( $vsp_id, array_map( 'intval', wp_list_pluck( $vsp_projects, 'id' ) ), true );
if ( false === $vsp_index ) {
	// Draft preview, or not yet in the published list.
	array_unshift( $vsp_projects, vsp_project_from_post( get_queried_object() ) );
	$vsp_index = 0;
}
$vsp_project = $vsp_projects[ $vsp_index ];
$vsp_next    = $vsp_projects[ ( $vsp_index + 1 ) % count( $vsp_projects ) ];
$vsp_site    = vsp_site();
$vsp_meta    = array_filter(
	array(
		__( 'Client', 'vsp' )     => $vsp_project['client'],
		__( 'Discipline', 'vsp' ) => __( 'Videography', 'vsp' ),
		__( 'Format', 'vsp' )     => $vsp_project['category'],
	)
);

get_header();
?>
<article>
	<header class="pb-14 pt-32 md:pb-20 md:pt-44">
		<div class="container-x">
			<div<?php echo vsp_reveal( 0, 10 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<a href="<?php echo esc_url( vsp_page_url( 'work' ) ); ?>" class="group eyebrow inline-flex items-center gap-2 text-bone/70 hover:text-bone">
					<?php echo vsp_icon( 'arrow-left', 'size-3.5 transition-transform group-hover:-translate-x-1' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<?php esc_html_e( 'All work', 'vsp' ); ?>
				</a>
			</div>
			<p class="eyebrow mt-10 text-bronze"><?php echo esc_html( sprintf( __( 'Project %1$s / %2$s', 'vsp' ), vsp_pad( $vsp_index + 1 ), vsp_pad( count( $vsp_projects ) ) ) ); ?></p>
			<?php echo vsp_split( $vsp_project['title'], array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.1, 'class' => 'display-lg mt-6 max-w-[16ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>

			<dl class="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
				<?php $vsp_n = 0; foreach ( $vsp_meta as $vsp_label => $vsp_value ) : ?>
					<div<?php echo vsp_reveal( 0.3 + $vsp_n++ * 0.06 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow"><?php echo esc_html( $vsp_label ); ?></dt>
						<dd class="mt-2 text-bone/85"><?php echo esc_html( $vsp_value ); ?></dd>
					</div>
				<?php endforeach; ?>
				<?php if ( $vsp_project['youtube_id'] ) : ?>
					<div<?php echo vsp_reveal( 0.5 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow"><?php esc_html_e( 'Watch', 'vsp' ); ?></dt>
						<dd class="mt-2">
							<a href="<?php echo esc_url( 'https://www.youtube.com/watch?v=' . $vsp_project['youtube_id'] ); ?>" target="_blank" rel="noopener noreferrer" class="link-underline inline-flex items-center gap-1 text-bone/85 hover:text-bone">
								YouTube <?php echo vsp_icon( 'arrow-up-right', 'size-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							</a>
						</dd>
					</div>
				<?php endif; ?>
			</dl>
		</div>
	</header>

	<div class="container-x"<?php echo vsp_reveal( 0, 60 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
		<div class="relative aspect-video w-full overflow-hidden bg-black" data-video-embed="<?php echo esc_attr( $vsp_project['youtube_id'] ); ?>" data-title="<?php echo esc_attr( $vsp_project['title'] . ' — ' . $vsp_site['name'] ); ?>">
			<?php if ( $vsp_project['youtube_id'] ) : ?>
				<button type="button" data-cursor="play" aria-label="<?php echo esc_attr( sprintf( __( 'Play film: %s', 'vsp' ), $vsp_project['title'] ) ); ?>" class="group absolute inset-0">
					<img src="<?php echo esc_url( $vsp_project['cover'] ); ?>" alt="" fetchpriority="high" class="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] <?php echo $vsp_project['letterboxed'] ? 'scale-[1.32] group-hover:scale-[1.36]' : 'group-hover:scale-[1.04]'; ?>">
					<span aria-hidden="true" class="absolute inset-0 bg-ink/25 transition-colors duration-700 group-hover:bg-ink/10"></span>
					<span class="absolute inset-0 grid place-items-center">
						<span class="grid size-20 place-items-center rounded-full bg-bone text-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110 md:size-28">
							<?php echo vsp_icon( 'play', 'size-6 translate-x-0.5 fill-current md:size-8' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</span>
					</span>
				</button>
			<?php elseif ( $vsp_project['cover'] ) : ?>
				<img src="<?php echo esc_url( $vsp_project['cover'] ); ?>" alt="<?php echo esc_attr( $vsp_project['cover_alt'] ); ?>" class="absolute inset-0 size-full object-cover">
			<?php endif; ?>
		</div>
	</div>

	<?php if ( $vsp_project['summary'] ) : ?>
		<section class="container-x grid gap-10 py-24 md:grid-cols-12 md:py-36">
			<p class="eyebrow md:col-span-3"><?php esc_html_e( 'The project', 'vsp' ); ?></p>
			<?php echo vsp_split( $vsp_project['summary'], array( 'class' => 'font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] md:col-span-9', 'stagger' => 0.025 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</section>
	<?php else : ?>
		<div class="py-12 md:py-20"></div>
	<?php endif; ?>
</article>

<?php if ( count( $vsp_projects ) > 1 ) : ?>
	<nav aria-label="<?php esc_attr_e( 'Next project', 'vsp' ); ?>" class="border-t border-line">
		<a href="<?php echo esc_url( $vsp_next['url'] ); ?>" data-cursor="view" class="group relative block overflow-hidden">
			<div class="absolute inset-0">
				<img src="<?php echo esc_url( $vsp_next['cover'] ); ?>" alt="" loading="lazy" class="absolute inset-0 size-full object-cover opacity-30 grayscale transition-all duration-[1400ms] ease-[var(--ease-expo)] group-hover:opacity-50 group-hover:grayscale-0 <?php echo $vsp_next['letterboxed'] ? 'scale-[1.32] group-hover:scale-[1.38]' : 'group-hover:scale-105'; ?>">
				<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60"></div>
			</div>
			<div class="container-x relative py-28 md:py-44">
				<p class="eyebrow"><?php esc_html_e( 'Next project', 'vsp' ); ?></p>
				<p class="display-lg mt-6 max-w-[16ch] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4"><?php echo esc_html( $vsp_next['title'] ); ?></p>
				<p class="mt-4 text-bone/60"><?php echo esc_html( $vsp_next['category'] ); ?></p>
			</div>
		</a>
	</nav>
<?php endif; ?>

<?php
get_template_part( 'template-parts/cta' );
get_footer();
