<?php
/**
 * Not found.
 *
 * @package VisualStudiosPlus
 */

get_header();
?>
<section class="container-x flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
	<p class="eyebrow"><?php esc_html_e( 'Error 404', 'vsp' ); ?></p>
	<h1 class="display-xl mt-6"><?php esc_html_e( 'Out of', 'vsp' ); ?> <span class="serif-accent text-bronze"><?php esc_html_e( 'frame.', 'vsp' ); ?></span></h1>
	<p class="mt-8 max-w-md text-lg text-bone/70"><?php esc_html_e( 'The page you’re looking for doesn’t exist or has moved.', 'vsp' ); ?></p>
	<div class="mt-10 flex flex-wrap items-center gap-6">
		<?php echo vsp_button( home_url( '/' ), __( 'Back to home', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<a href="<?php echo esc_url( vsp_page_url( 'work' ) ); ?>" class="link-underline text-bone/75 hover:text-bone"><?php esc_html_e( 'See our work', 'vsp' ); ?></a>
	</div>
</section>
<?php
get_footer();
