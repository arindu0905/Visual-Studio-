<?php
/**
 * Homepage: about statement that lights up word by word, with layered images.
 *
 * @package VisualStudiosPlus
 */

$vsp_site   = vsp_site();
$vsp_accent = array( 'content', 'creation', 'curation' );
?>
<section aria-labelledby="about-title" class="relative py-28 md:py-44">
	<div class="container-x">
		<?php echo vsp_section_label( '01', __( 'Agency profile & heritage', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<h2 id="about-title" class="sr-only"><?php echo esc_html( sprintf( __( 'About %s', 'vsp' ), $vsp_site['name'] ) ); ?></h2>

		<p data-highlight class="mt-10 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6.4vw,7rem)] font-bold leading-[0.98] tracking-[-0.04em]">
			<?php
			$vsp_words = preg_split( '/\s+/u', trim( $vsp_site['about']['statement'] ) );
			foreach ( $vsp_words as $vsp_i => $vsp_w ) {
				$vsp_is_accent = in_array( strtolower( preg_replace( '/[.,’\']/u', '', $vsp_w ) ), $vsp_accent, true );
				printf( '<span%s><span class="relative inline-block"><span class="hl-w">%s</span></span></span>%s', $vsp_is_accent ? ' class="serif-accent text-bronze"' : '', esc_html( $vsp_w ), $vsp_i < count( $vsp_words ) - 1 ? ' ' : '' );
			}
			?>
		</p>

		<div class="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
			<div class="relative md:col-span-7">
				<?php echo vsp_parallax_image( vsp_asset( 'D85_2304.webp' ), __( 'Hotel suite interior photographed by Visual Studios Plus', 'vsp' ), array( 'class' => 'aspect-[4/3] w-full' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<div class="absolute -bottom-16 right-4 w-[42%] border-[6px] border-ink bg-ink md:-bottom-24 md:-right-16 md:w-[38%] md:border-[10px]">
					<?php echo vsp_parallax_image( vsp_asset( 'Tiesh-7077-1.webp' ), __( 'Fashion portrait photographed by Visual Studios Plus', 'vsp' ), array( 'class' => 'aspect-[3/4] w-full', 'strength' => 18 ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</div>
			</div>

			<div class="flex flex-col justify-end md:col-span-4 md:col-start-9">
				<div<?php echo vsp_reveal(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<p class="text-lg leading-relaxed text-bone/75 md:text-xl"><?php echo esc_html( $vsp_site['about']['body'] ); ?></p>
				</div>
				<div class="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm"<?php echo vsp_reveal( 0.1 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<div>
						<p class="eyebrow mb-2"><?php esc_html_e( 'Disciplines', 'vsp' ); ?></p>
						<p class="text-bone/80"><?php esc_html_e( 'Videography & TVC, Commercial Photo, Digital Retainers', 'vsp' ); ?></p>
					</div>
					<div>
						<p class="eyebrow mb-2"><?php esc_html_e( 'Based in', 'vsp' ); ?></p>
						<p class="text-bone/80"><?php esc_html_e( 'Colombo 04, Sri Lanka', 'vsp' ); ?></p>
					</div>
				</div>
				<div class="mt-10"<?php echo vsp_reveal( 0.2 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<?php echo vsp_button( vsp_page_url( 'about' ), __( 'About Studio', 'vsp' ), array( 'variant' => 'outline' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</div>
			</div>
		</div>
	</div>
</section>
