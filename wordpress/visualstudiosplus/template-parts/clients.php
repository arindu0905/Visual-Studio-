<?php
/**
 * Client logos in two opposing marquees. Args: title, text (optional).
 *
 * @package VisualStudiosPlus
 */

$vsp_clients = vsp_clients();
$vsp_half    = (int) ceil( count( $vsp_clients ) / 2 );
$vsp_rows    = array( array_slice( $vsp_clients, 0, $vsp_half ), array_slice( $vsp_clients, $vsp_half ) );
?>
<section aria-labelledby="clients-title" class="relative border-y border-line bg-ink-2 py-24 md:py-32">
	<div class="container-x mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
		<div>
			<?php echo vsp_section_label( '06', __( 'Commercial client roster', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<h2 id="clients-title" class="display-md mt-6 max-w-[18ch]">
				<?php if ( ! empty( $args['title'] ) ) : ?>
					<?php echo esc_html( $args['title'] ); ?>
				<?php else : ?>
					<?php esc_html_e( 'Trusted by market leaders', 'vsp' ); ?> <span class="serif-accent text-bronze">&amp;</span> <?php esc_html_e( 'global brands', 'vsp' ); ?>
				<?php endif; ?>
			</h2>
		</div>
		<p class="max-w-xs text-sm text-bone/60"><?php echo esc_html( ! empty( $args['text'] ) ? $args['text'] : __( 'From global FMCG giants to boutique luxury houses across Sri Lanka & international markets.', 'vsp' ) ); ?></p>
	</div>
	<div class="space-y-2">
		<?php foreach ( $vsp_rows as $vsp_r => $vsp_items ) : ?>
			<?php if ( ! $vsp_items ) { continue; } ?>
			<div class="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
				<ul class="flex shrink-0 animate-marquee items-center group-hover/row:[animation-play-state:paused] <?php echo $vsp_r ? '[animation-direction:reverse]' : ''; ?>" style="--marquee-duration:48s">
					<?php foreach ( array_merge( $vsp_items, $vsp_items ) as $vsp_i => $vsp_c ) : $vsp_dupe = $vsp_i >= count( $vsp_items ); ?>
						<li <?php echo $vsp_dupe ? 'aria-hidden="true"' : ''; ?> class="group/logo flex h-28 w-44 shrink-0 flex-col items-center justify-center px-5 md:h-40 md:w-72 md:px-8">
							<div class="relative h-full w-full">
								<img src="<?php echo esc_url( $vsp_c['logo'] ); ?>" alt="<?php echo $vsp_dupe ? '' : esc_attr( $vsp_c['name'] ); ?>" loading="lazy" decoding="async" class="absolute inset-0 size-full object-contain py-3 <?php echo empty( $vsp_c['color'] ) ? 'brightness-0 invert' : 'grayscale group-hover/logo:grayscale-0'; ?> opacity-70 transition-all duration-500 group-hover/logo:opacity-100 md:py-4">
							</div>
							<?php if ( ! empty( $vsp_c['category'] ) ) : ?>
								<span class="text-[0.65rem] uppercase tracking-[0.18em] text-stone transition-colors duration-500 group-hover/logo:text-bronze"><?php echo esc_html( $vsp_c['category'] ); ?></span>
							<?php endif; ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endforeach; ?>
	</div>
</section>
