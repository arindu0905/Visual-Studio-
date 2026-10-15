<?php
/**
 * Site header, preloader and mobile menu.
 *
 * @package VisualStudiosPlus
 */

$vsp_site = vsp_site();
$vsp_nav  = vsp_nav_items( 'primary' );
$vsp_contact_url = vsp_page_url( 'contact' );
// The last menu item (Contact) becomes the “Start a project” button on desktop.
$vsp_desktop_nav = count( $vsp_nav ) > 1 ? array_slice( $vsp_nav, 0, -1 ) : $vsp_nav;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink"><?php esc_html_e( 'Skip to content', 'vsp' ); ?></a>

<?php get_template_part( 'template-parts/preloader' ); ?>

<div aria-hidden="true" class="page-curtain pointer-events-none fixed inset-0 z-[120]">
	<div class="pc-bronze absolute inset-0 origin-top bg-bronze"></div>
	<div class="pc-ink absolute inset-0 origin-top bg-ink"></div>
</div>

<header class="site-header fixed inset-x-0 top-0 z-50 border-b border-transparent">
	<div class="hdr-row container-x flex items-center justify-between">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( $vsp_site['name'] . ' — home' ); ?>" class="relative z-10 block h-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:h-10">
			<img src="<?php echo esc_url( $vsp_site['media']['logo'] ); ?>" alt="<?php echo esc_attr( $vsp_site['short_name'] ); ?>" width="696" height="240" class="h-full w-auto" fetchpriority="high">
		</a>

		<nav aria-label="<?php esc_attr_e( 'Primary', 'vsp' ); ?>" class="hidden lg:block">
			<ul class="flex items-center gap-9">
				<?php foreach ( $vsp_desktop_nav as $vsp_item ) : $vsp_on = vsp_is_current( $vsp_item['href'] ); ?>
					<li>
						<a href="<?php echo esc_url( $vsp_item['href'] ); ?>" <?php echo $vsp_on ? 'aria-current="page"' : ''; ?> class="group relative text-xs font-semibold uppercase tracking-[0.05em] transition-colors duration-300 <?php echo $vsp_on ? 'text-bone' : 'text-bone/65 hover:text-bone'; ?>">
							<span class="relative inline-block overflow-hidden align-top">
								<span class="inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full"><?php echo esc_html( $vsp_item['label'] ); ?></span>
								<span aria-hidden="true" class="absolute left-0 top-full inline-block text-bronze transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full"><?php echo esc_html( $vsp_item['label'] ); ?></span>
							</span>
							<?php if ( $vsp_on ) : ?><span class="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bronze"></span><?php endif; ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div class="relative z-10 flex items-center gap-3">
			<span class="hidden lg:inline-block" data-magnetic>
				<a href="<?php echo esc_url( $vsp_contact_url ); ?>" class="group inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.05em] transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink">
					<span class="size-1.5 rounded-full bg-bronze transition-colors group-hover:bg-ink" aria-hidden="true"></span>
					<?php esc_html_e( 'Inquire project', 'vsp' ); ?>
				</a>
			</span>

			<button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="<?php esc_attr_e( 'Open menu', 'vsp' ); ?>" data-label-open="<?php esc_attr_e( 'Open menu', 'vsp' ); ?>" data-label-close="<?php esc_attr_e( 'Close menu', 'vsp' ); ?>" class="relative flex h-11 items-center gap-3 rounded-full pl-3 pr-1 lg:hidden">
				<span class="mt-label relative block h-4 w-[3.4rem] overflow-hidden text-right text-[0.72rem] uppercase tracking-[0.2em]">
					<span class="block"><?php esc_html_e( 'Menu', 'vsp' ); ?></span>
					<span class="absolute right-0 top-full block"><?php esc_html_e( 'Close', 'vsp' ); ?></span>
				</span>
				<span class="relative grid size-9 place-items-center rounded-full bg-bone">
					<span class="mt-l1 absolute h-px w-4 bg-ink"></span>
					<span class="mt-l2 absolute h-px w-4 bg-ink"></span>
				</span>
			</button>
		</div>
	</div>
</header>

<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Site menu', 'vsp' ); ?>" class="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden">
	<nav aria-label="<?php esc_attr_e( 'Mobile', 'vsp' ); ?>" class="container-x flex flex-1 flex-col justify-center pt-24">
		<ul class="space-y-1">
			<?php
			$vsp_mobile = array_merge( array( array( 'label' => __( 'Home', 'vsp' ), 'href' => home_url( '/' ) ) ), $vsp_nav );
			foreach ( $vsp_mobile as $vsp_i => $vsp_item ) :
				$vsp_on = vsp_is_current( $vsp_item['href'], true );
				?>
				<li class="overflow-hidden">
					<div class="mm-item" style="--i:<?php echo (int) $vsp_i; ?>">
						<a href="<?php echo esc_url( $vsp_item['href'] ); ?>" <?php echo $vsp_on ? 'aria-current="page"' : ''; ?> class="group flex items-baseline gap-4 py-1 font-[family-name:var(--font-display)] text-[clamp(2.6rem,11vw,5rem)] font-black leading-[1.02] tracking-[-0.04em]">
							<span class="w-8 text-xs font-normal tracking-normal text-bronze"><?php echo esc_html( vsp_pad( $vsp_i + 1 ) ); ?></span>
							<span class="transition-colors <?php echo $vsp_on ? 'text-bronze' : 'text-bone group-active:text-bronze'; ?>"><?php echo esc_html( $vsp_item['label'] ); ?></span>
						</a>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>
	</nav>

	<div class="mm-foot container-x grid grid-cols-[1.4fr_1fr] gap-6 border-t border-line py-8 text-sm text-bone/70">
		<div class="space-y-1">
			<p class="eyebrow mb-2"><?php esc_html_e( 'Say hello', 'vsp' ); ?></p>
			<a href="mailto:<?php echo esc_attr( $vsp_site['contact']['email'] ); ?>" class="block break-all text-[0.8rem] sm:text-sm"><?php echo esc_html( $vsp_site['contact']['email'] ); ?></a>
			<?php if ( ! empty( $vsp_site['contact']['phones'][0] ) ) : ?>
				<a href="<?php echo esc_attr( vsp_tel( $vsp_site['contact']['phones'][0] ) ); ?>" class="block"><?php echo esc_html( $vsp_site['contact']['phones'][0] ); ?></a>
			<?php endif; ?>
		</div>
		<div class="space-y-1">
			<p class="eyebrow mb-2"><?php esc_html_e( 'Follow', 'vsp' ); ?></p>
			<?php foreach ( vsp_socials() as $vsp_s ) : ?>
				<a href="<?php echo esc_url( $vsp_s['href'] ); ?>" target="_blank" rel="noopener noreferrer" class="block"><?php echo esc_html( $vsp_s['label'] ); ?></a>
			<?php endforeach; ?>
		</div>
	</div>
</div>

<main id="main">
