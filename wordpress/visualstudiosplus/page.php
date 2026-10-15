<?php
/**
 * Any other page: typographic header + editor content.
 *
 * @package VisualStudiosPlus
 */

get_header();
while ( have_posts() ) :
	the_post();
	?>
	<article <?php post_class(); ?>>
		<section class="relative pb-12 pt-36 md:pb-20 md:pt-52">
			<div class="container-x">
				<?php echo vsp_split( get_the_title(), array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.1, 'class' => 'display-lg max-w-[16ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</div>
		</section>
		<?php if ( has_post_thumbnail() ) : ?>
			<?php echo vsp_parallax_image( get_the_post_thumbnail_url( null, 'full' ), get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true ), array( 'strength' => 10, 'priority' => true, 'class' => 'aspect-[4/5] w-full sm:aspect-[21/9]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php endif; ?>
		<div class="container-x py-16 md:py-24">
			<div class="entry-content mx-auto max-w-3xl">
				<?php the_content(); ?>
				<?php wp_link_pages(); ?>
			</div>
		</div>
	</article>
	<?php
endwhile;
get_template_part( 'template-parts/cta' );
get_footer();
