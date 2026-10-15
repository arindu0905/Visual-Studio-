import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site, socials, telHref } from "@/data/site";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Visual Studios Plus — ${site.contact.email}, ${site.contact.phones.join(" / ")}. ${site.contact.address.join(", ")}.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact — ${site.name}`, url: "/contact" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Visual Studios Plus, ${site.contact.address.join(", ")}`)}`;

export default function ContactPage() {
  return (
    <section data-clip="Contact" className="relative overflow-hidden pb-28 pt-36 md:pb-40 md:pt-52">
      <div aria-hidden className="pointer-events-none absolute -right-[20vw] -top-[10vw] size-[60vw] rounded-full bg-bronze/[0.06] blur-[120px]" />
      <div className="container-x relative">
        <Reveal y={12}>
          <p className="eyebrow flex items-center gap-3">
            <span className="size-1.5 animate-pulse rounded-full bg-bronze" aria-hidden />
            Direct studio inquiry &amp; commissioning
          </p>
        </Reveal>
        <SplitText as="h1" trigger="mount" delay={0.15} text="Contact our team." className="display-xl mt-8 max-w-[12ch]" />

        <div className="mt-20 grid gap-20 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <p className="max-w-md text-lg leading-relaxed text-bone/70 md:text-xl">
                Commission your next commercial film, request a channel retainer deck, or schedule a coffee at our Colombo 04 studio floor.
              </p>
            </Reveal>

            <dl className="mt-14 space-y-10">
              <Reveal delay={0.35}>
                <dt className="eyebrow mb-3">// Direct email</dt>
                <dd>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="group inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] md:text-3xl"
                  >
                    <span className="link-underline break-all">{site.contact.email}</span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-bronze transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-2 text-sm text-bone/55">Typical reply within 4 business hours</p>
                </dd>
              </Reveal>
              <Reveal delay={0.4}>
                <dt className="eyebrow mb-3">// Studio hotline</dt>
                <dd className="space-y-1">
                  {site.contact.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="link-underline block w-fit text-xl text-bone/85 hover:text-bone">
                      {p}
                    </a>
                  ))}
                </dd>
              </Reveal>
              <Reveal delay={0.45}>
                <dt className="eyebrow mb-3">// Studio headquarters</dt>
                <dd>
                  <address className="text-xl not-italic text-bone/85">
                    {site.contact.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline mt-4 inline-block text-bone/70 hover:text-bone">
                    Open in Google Maps ↗
                  </a>
                </dd>
              </Reveal>
              <Reveal delay={0.5}>
                <dt className="eyebrow mb-3">Follow &amp; connect on direct channels</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-lg text-bone/85 hover:text-bone">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </Reveal>
            </dl>
          </div>

          <Reveal delay={0.3} className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <span id="brief" className="block -translate-y-28" aria-hidden />
            <p className="eyebrow mb-4 text-bronze">Start your business transformation</p>
            <h2 className="display-md">
              Let’s make something <span className="serif-accent text-bronze">matter.</span>
            </h2>
            <p className="mb-12 mt-6 max-w-lg text-bone/65">
              Tell us about your brand, your campaign or your digital vision. We take projects for ambitious businesses and deliver measurable results from our
              studio in Colombo 04.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
