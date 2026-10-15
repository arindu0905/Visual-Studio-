<?php
/**
 * Template Name: Contact
 *
 * @package VisualStudiosPlus
 */

$vsp_site  = vsp_site();
$vsp_maps  = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode( $vsp_site['name'] . ', ' . implode( ', ', $vsp_site['contact']['address'] ) );
$vsp_state = isset( $_GET['enquiry'] ) ? sanitize_key( wp_unslash( $_GET['enquiry'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
$vsp_field = 'peer w-full border-0 border-b border-line bg-transparent pb-3 pt-7 text-lg text-bone outline-none transition-colors placeholder:text-transparent focus:border-bronze';
$vsp_label = 'pointer-events-none absolute left-0 top-7 origin-left text-lg text-bone/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-bronze peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]';

get_header();
?>
<section class="relative overflow-hidden pb-28 pt-36 md:pb-40 md:pt-52">
	<div aria-hidden="true" class="pointer-events-none absolute -right-[20vw] -top-[10vw] size-[60vw] rounded-full bg-bronze/[0.06] blur-[120px]"></div>
	<div class="container-x relative">
		<div<?php echo vsp_reveal( 0, 12 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<p class="eyebrow flex items-center gap-3">
				<span class="size-1.5 animate-pulse rounded-full bg-bronze" aria-hidden="true"></span>
				<?php esc_html_e( 'Direct studio inquiry & commissioning', 'vsp' ); ?>
			</p>
		</div>
		<?php echo vsp_split( __( 'Contact our team.', 'vsp' ), array( 'tag' => 'h1', 'trigger' => 'mount', 'delay' => 0.15, 'class' => 'display-xl mt-8 max-w-[12ch]' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>

		<div class="mt-20 grid gap-20 md:mt-28 lg:grid-cols-12 lg:gap-10">
			<div class="lg:col-span-5">
				<div<?php echo vsp_reveal( 0.3 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<p class="max-w-md text-lg leading-relaxed text-bone/70 md:text-xl"><?php esc_html_e( 'Commission your next commercial film, request a channel retainer deck, or schedule a coffee at our Colombo 04 studio floor.', 'vsp' ); ?></p>
				</div>

				<dl class="mt-14 space-y-10">
					<div<?php echo vsp_reveal( 0.35 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow mb-3"><?php esc_html_e( '// Direct email', 'vsp' ); ?></dt>
						<dd>
							<a href="mailto:<?php echo esc_attr( $vsp_site['contact']['email'] ); ?>" class="group inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] md:text-3xl">
								<span class="link-underline break-all"><?php echo esc_html( $vsp_site['contact']['email'] ); ?></span>
								<?php echo vsp_icon( 'arrow-up-right', 'size-5 shrink-0 text-bronze transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							</a>
							<p class="mt-2 text-sm text-bone/55"><?php esc_html_e( 'Typical reply within 4 business hours', 'vsp' ); ?></p>
						</dd>
					</div>
					<div<?php echo vsp_reveal( 0.4 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow mb-3"><?php esc_html_e( '// Studio hotline', 'vsp' ); ?></dt>
						<dd class="space-y-1">
							<?php foreach ( $vsp_site['contact']['phones'] as $vsp_p ) : ?>
								<a href="<?php echo esc_attr( vsp_tel( $vsp_p ) ); ?>" class="link-underline block w-fit text-xl text-bone/85 hover:text-bone"><?php echo esc_html( $vsp_p ); ?></a>
							<?php endforeach; ?>
						</dd>
					</div>
					<div<?php echo vsp_reveal( 0.45 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow mb-3"><?php esc_html_e( '// Studio headquarters', 'vsp' ); ?></dt>
						<dd>
							<address class="text-xl not-italic text-bone/85">
								<?php foreach ( $vsp_site['contact']['address'] as $vsp_l ) : ?>
									<span class="block"><?php echo esc_html( $vsp_l ); ?></span>
								<?php endforeach; ?>
							</address>
							<a href="<?php echo esc_url( $vsp_maps ); ?>" target="_blank" rel="noopener noreferrer" class="eyebrow link-underline mt-4 inline-block text-bone/70 hover:text-bone"><?php esc_html_e( 'Open in Google Maps ↗', 'vsp' ); ?></a>
						</dd>
					</div>
					<div<?php echo vsp_reveal( 0.5 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<dt class="eyebrow mb-3"><?php esc_html_e( 'Follow & connect on direct channels', 'vsp' ); ?></dt>
						<dd class="flex flex-wrap gap-x-6 gap-y-2">
							<?php foreach ( vsp_socials() as $vsp_s ) : ?>
								<a href="<?php echo esc_url( $vsp_s['href'] ); ?>" target="_blank" rel="noopener noreferrer" class="link-underline text-lg text-bone/85 hover:text-bone"><?php echo esc_html( $vsp_s['label'] ); ?></a>
							<?php endforeach; ?>
						</dd>
					</div>
				</dl>
			</div>

			<div id="enquiry" class="scroll-mt-28 lg:col-span-6 lg:col-start-7"<?php echo vsp_reveal( 0.3 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
				<p class="eyebrow mb-4 text-bronze"><?php esc_html_e( 'Start your business transformation', 'vsp' ); ?></p>
				<h2 class="display-md"><?php esc_html_e( 'Let’s make something', 'vsp' ); ?> <span class="serif-accent text-bronze"><?php esc_html_e( 'matter.', 'vsp' ); ?></span></h2>
				<p class="mb-12 mt-6 max-w-lg text-bone/65"><?php esc_html_e( 'Tell us about your brand, your campaign or your digital vision. We take projects for ambitious businesses and deliver measurable results from our studio in Colombo 04.', 'vsp' ); ?></p>

				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" class="space-y-10" data-contact-form>
					<input type="hidden" name="action" value="vsp_contact">
					<?php wp_nonce_field( 'vsp_contact', 'vsp_contact_nonce' ); ?>
					<div class="absolute -left-[9999px]" aria-hidden="true">
						<label for="vsp-website">Website</label>
						<input id="vsp-website" name="website" tabindex="-1" autocomplete="off">
					</div>

					<fieldset>
						<legend class="eyebrow mb-5"><?php esc_html_e( 'I’m interested in', 'vsp' ); ?></legend>
						<div class="flex flex-wrap gap-2">
							<?php foreach ( vsp_services() as $vsp_s ) : ?>
								<label class="cursor-pointer">
									<input type="checkbox" name="interests[]" value="<?php echo esc_attr( $vsp_s['title'] ); ?>" class="peer sr-only">
									<span class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-bone/75 transition-all duration-300 hover:border-bone/50 hover:text-bone peer-checked:border-bronze peer-checked:bg-bronze peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-bronze [&>svg]:hidden peer-checked:[&>svg]:block">
										<?php echo vsp_icon( 'check', 'size-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
										<?php echo esc_html( $vsp_s['title'] ); ?>
									</span>
								</label>
							<?php endforeach; ?>
						</div>
					</fieldset>

					<div class="grid gap-10 md:grid-cols-2">
						<div class="relative">
							<input id="vsp-name" name="name" required autocomplete="name" placeholder="<?php esc_attr_e( 'Your name', 'vsp' ); ?>" class="<?php echo esc_attr( $vsp_field ); ?>">
							<label for="vsp-name" class="<?php echo esc_attr( $vsp_label ); ?>"><?php esc_html_e( 'Your name *', 'vsp' ); ?></label>
						</div>
						<div class="relative">
							<input id="vsp-email" name="email" type="email" required autocomplete="email" placeholder="<?php esc_attr_e( 'Email', 'vsp' ); ?>" class="<?php echo esc_attr( $vsp_field ); ?>">
							<label for="vsp-email" class="<?php echo esc_attr( $vsp_label ); ?>"><?php esc_html_e( 'Email *', 'vsp' ); ?></label>
						</div>
					</div>
					<div class="relative">
						<input id="vsp-company" name="company" autocomplete="organization" placeholder="<?php esc_attr_e( 'Company', 'vsp' ); ?>" class="<?php echo esc_attr( $vsp_field ); ?>">
						<label for="vsp-company" class="<?php echo esc_attr( $vsp_label ); ?>"><?php esc_html_e( 'Company / brand', 'vsp' ); ?></label>
					</div>
					<div class="relative">
						<textarea id="vsp-message" name="message" required rows="4" placeholder="<?php esc_attr_e( 'Tell us about the project', 'vsp' ); ?>" class="<?php echo esc_attr( $vsp_field ); ?> resize-none"></textarea>
						<label for="vsp-message" class="<?php echo esc_attr( $vsp_label ); ?>"><?php esc_html_e( 'Tell us about the project *', 'vsp' ); ?></label>
					</div>

					<div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
						<button type="submit" class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-9 py-5 text-base font-medium text-ink disabled:opacity-60">
							<span aria-hidden="true" class="absolute inset-0 translate-y-[101%] rounded-full bg-bronze transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0"></span>
							<span class="relative"><?php esc_html_e( 'Start project brief', 'vsp' ); ?></span>
							<?php echo vsp_icon( 'arrow-up-right', 'relative size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						</button>
						<p class="form-status max-w-xs text-sm text-bone/50" aria-live="polite">
							<?php
							if ( 'sent' === $vsp_state ) {
								esc_html_e( 'Thank you — your enquiry has been sent. We’ll be in touch shortly.', 'vsp' );
							} elseif ( 'error' === $vsp_state ) {
								/* translators: %s: studio email */
								echo esc_html( sprintf( __( 'Sorry, the message could not be sent. Please email us at %s.', 'vsp' ), $vsp_site['contact']['email'] ) );
							} else {
								esc_html_e( 'Typical reply within 4 business hours.', 'vsp' );
							}
							?>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
<?php
get_footer();
