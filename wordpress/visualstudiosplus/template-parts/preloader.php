<?php
/**
 * Branded intro shown once per browser session: the VS+ mark unmasks while a
 * counter runs to 100, then a two-layer curtain lifts to reveal the page.
 * Skipped for repeat visits and reduced motion (see the inline head script).
 *
 * @package VisualStudiosPlus
 */

?>
<div aria-hidden="true" class="preloader fixed inset-0 z-[150]">
	<div class="pl-bronze absolute inset-0 bg-bronze"></div>
	<div class="pl-ink absolute inset-0 flex flex-col bg-ink">
		<div class="flex flex-1 items-center justify-center">
			<div class="pl-logo relative h-14 overflow-hidden md:h-20">
				<img src="<?php echo esc_url( vsp_site()['media']['logo'] ); ?>" alt="" width="696" height="240" class="h-full w-auto">
			</div>
		</div>
		<div class="container-x flex items-end justify-between pb-8 md:pb-10">
			<p class="eyebrow text-bone/50"><?php echo esc_html( vsp_site()['name'] ); ?> — Colombo</p>
			<p class="pl-count font-[family-name:var(--font-display)] text-5xl font-semibold tabular-nums tracking-[-0.04em] text-bone md:text-7xl">000</p>
		</div>
		<div class="pl-bar absolute bottom-0 left-0 h-px w-0 bg-bronze"></div>
	</div>
</div>
