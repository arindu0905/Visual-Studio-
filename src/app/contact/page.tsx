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
    <section className="relative overflow-hidden pb-28 pt-36 md:pb-40 md:pt-52">
      <div aria-hidden className="pointer-events-none absolute -right-[20vw] -top-[10vw] size-[60vw] rounded-full bg-bronze/[0.06] blur-[120px]" />
      <div className="container-x relative">
        <Reveal y={12}>
          <p className="eyebrow flex items-center gap-3">
            <span className="size-1.5 animate-pulse rounded-full bg-bronze" aria-hidden />
            Contact us
          </p>
        </Reveal>
        <SplitText as="h1" trigger="mount" delay={0.15} text="Let’s talk." className="display-xl mt-8" />

        <div className="mt-20 grid gap-20 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <p className="max-w-md text-lg leading-relaxed text-bone/70 md:text-xl">
                Tell us about your brand, your product or your space — we’ll get back to you with how we can bring it to life.
              </p>
            </Reveal>

            <dl className="mt-14 space-y-10">
              <Reveal delay={0.35}>
                <dt className="eyebrow mb-3">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="group inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] md:text-3xl"
                  >
                    <span className="link-underline break-all">{site.contact.email}</span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-bronze transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </dd>
              </Reveal>
              <Reveal delay={0.4}>
                <dt className="eyebrow mb-3">Phone</dt>
                <dd className="space-y-1">
                  {site.contact.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="link-underline block w-fit text-xl text-bone/85 hover:text-bone">
                      {p}
                    </a>
                  ))}
                </dd>
              </Reveal>
              <Reveal delay={0.45}>
                <dt className="eyebrow mb-3">Studio</dt>
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
                <dt className="eyebrow mb-3">Follow</dt>
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

          <Reveal delay={0.3} className="lg:col-span-6 lg:col-start-7">
            <h2 className="display-md mb-12">
              Start a <span className="serif-accent text-bronze">project</span>
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
