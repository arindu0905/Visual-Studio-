<?php
/**
 * Homepage hero: looping showreel segment behind a masked headline.
 *
 * @package VisualStudiosPlus
 */

$vsp_site  = vsp_site();
$vsp_h     = $vsp_site['headline'];
$vsp_words = $vsp_h['rotating'] ? $vsp_h['rotating'] : array( '' );
$vsp_long  = array_reduce( $vsp_words, fn( $a, $b ) => mb_strlen( $a ) >= mb_strlen( $b ) ? $a : $b, '' );
$vsp_rotating = '<span class="rotating-word serif-accent relative inline-grid overflow-hidden pr-[0.08em] align-bottom" data-rotate>'
	. '<span aria-hidden="true" class="invisible col-start-1 row-start-1">' . esc_html( $vsp_long ) . '</span>';
foreach ( $vsp_words as $vsp_i => $vsp_w ) {
	$vsp_rotating .= '<span aria-hidden="true" class="rw-word col-start-1 row-start-1' . ( 0 === $vsp_i ? ' is-active' : '' ) . '">' . esc_html( $vsp_w ) . '</span>';
}
$vsp_rotating .= '</span>';
$vsp_lines = array( esc_html( $vsp_h['lead'] ), $vsp_rotating, esc_html( $vsp_h['tail'] ) );
?>
<section aria-labelledby="hero-title" class="hero relative flex min-h-[100svh] flex-col overflow-hidden" data-hero>
	<div class="hero-bg absolute inset-0">
		<div class="hero-scale absolute inset-0">
			<img src="<?php echo esc_url( $vsp_site['media']['poster'] ); ?>" alt="" class="absolute inset-0 size-full object-cover opacity-60" fetchpriority="high" decoding="async">
			<video class="hero-video absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700" muted playsinline preload="none" aria-hidden="true" data-src="<?php echo esc_url( $vsp_site['media']['showreel'] ); ?>"></video>
		</div>
		<div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink"></div>
		<div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(12,14,12,0.75),transparent_60%)]"></div>
	</div>
	<div aria-hidden="true" class="grain pointer-events-none absolute inset-0 overflow-hidden"></div>

	<div class="hero-content container-x relative z-10 flex flex-1 flex-col justify-end pb-24 pt-32 md:pb-24 md:pt-36">
		<p class="intro-fade eyebrow mb-6 flex items-center gap-3 text-bone/70 md:mb-10" style="--d:0.05s">
			<span class="size-1.5 rounded-full bg-bronze" aria-hidden="true"></span>
			<?php echo esc_html( $vsp_site['eyebrow'] ); ?>
		</p>

		<h1 id="hero-title" class="display-xl text-[clamp(2.9rem,min(9.6vw,14svh),11.5rem)]">
			<span class="sr-only"><?php echo esc_html( trim( $vsp_h['lead'] . ' ' . implode( ' ', $vsp_h['rotating'] ) . ' ' . $vsp_h['tail'] ) ); ?></span>
			<span aria-hidden="true" class="block">
				<?php foreach ( $vsp_lines as $vsp_i => $vsp_line ) : ?>
					<span class="block overflow-hidden pb-[0.06em]"><span class="intro-line block" style="--d:<?php echo esc_attr( 0.1 + $vsp_i * 0.1 ); ?>s"><?php echo $vsp_line; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></span></span>
				<?php endforeach; ?>
			</span>
		</h1>

		<div class="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
			<p class="intro-fade max-w-xl text-lg leading-relaxed text-bone/80 md:text-xl" style="--d:0.25s"><?php echo esc_html( $vsp_site['intro'] ); ?></p>
			<div class="intro-fade flex flex-wrap items-center gap-3" style="--d:0.35s">
				<?php echo vsp_button( vsp_page_url( 'work' ), __( 'Explore projects', 'vsp' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<button type="button" data-showreel data-cursor="play" class="group inline-flex items-center gap-3 rounded-full py-4 text-sm tracking-wide text-bone sm:px-4">
					<span class="grid size-11 place-items-center rounded-full border border-bone/30 transition-all duration-500 group-hover:scale-110 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
						<?php echo vsp_icon( 'play', 'size-4 translate-x-px fill-current' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</span>
					<?php esc_html_e( 'Play showreel', 'vsp' ); ?>
				</button>
			</div>
		</div>
	</div>

	<div aria-hidden="true" class="hero-scroll absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
		<span class="eyebrow text-[0.62rem] text-bone/60"><?php esc_html_e( 'Scroll', 'vsp' ); ?></span>
		<span class="relative block h-12 w-px overflow-hidden bg-bone/15">
			<span class="scroll-tick absolute inset-x-0 top-0 block h-1/2 bg-bone"></span>
		</span>
	</div>
</section>
