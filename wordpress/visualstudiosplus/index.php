<?php
/**
 * Blog posts, archives and search (the original site had none, but WordPress
 * needs a fallback for every request).
 *
 * @package VisualStudiosPlus
 */

get_header();

if ( is_singular() ) :
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class(); ?>>
			<header class="pb-12 pt-36 md:pb-16 md:pt-52">
				<div class="container-x">
					<p class="eyebrow flex items-center gap-3"><span class="size-1.5 rounded-full bg-bronze" aria-hidden="true"></span><?php echo esc_html( get_the_date() ); ?></p>
					<?php echo vsp_split( get_the_title(), array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.1, 'class' => 'display-lg mt-8 max-w-[18ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</div>
			</header>
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="container-x"><?php the_post_thumbnail( 'full', array( 'class' => 'w-full h-auto' ) ); ?></div>
			<?php endif; ?>
			<div class="container-x py-16 md:py-24">
				<div class="entry-content mx-auto max-w-3xl">
					<?php the_content(); ?>
					<?php wp_link_pages(); ?>
				</div>
				<?php if ( comments_open() || get_comments_number() ) : ?>
					<div class="entry-content mx-auto mt-16 max-w-3xl border-t border-line pt-12"><?php comments_template(); ?></div>
				<?php endif; ?>
			</div>
		</article>
		<?php
	endwhile;
else :
	if ( is_search() ) {
		/* translators: %s: search query */
		$vsp_title = sprintf( __( 'Results for “%s”', 'vsp' ), get_search_query() );
	} elseif ( is_archive() ) {
		$vsp_title = wp_strip_all_tags( get_the_archive_title() );
	} else {
		$vsp_title = __( 'Journal', 'vsp' );
	}
	?>
	<section class="pb-12 pt-36 md:pb-20 md:pt-52">
		<div class="container-x">
			<?php echo vsp_split( $vsp_title, array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.1, 'class' => 'display-lg max-w-[16ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</div>
	</section>
	<section class="container-x pb-28 md:pb-40">
		<?php if ( have_posts() ) : ?>
			<ul class="border-b border-line">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<li class="border-t border-line">
						<a href="<?php the_permalink(); ?>" class="group grid gap-2 py-8 md:grid-cols-[10rem_1fr] md:gap-8 md:py-10">
							<span class="text-sm text-stone"><?php echo esc_html( get_the_date() ); ?></span>
							<span>
								<span class="block font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-bronze md:text-4xl"><?php the_title(); ?></span>
								<span class="mt-3 block max-w-2xl text-bone/60"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 30 ) ); ?></span>
							</span>
						</a>
					</li>
				<?php endwhile; ?>
			</ul>
			<div class="entry-content mt-12"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="text-lg text-bone/70"><?php esc_html_e( 'Nothing here yet.', 'vsp' ); ?></p>
		<?php endif; ?>
	</section>
	<?php
endif;

get_footer();
