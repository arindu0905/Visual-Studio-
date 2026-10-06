import type { Metadata } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn, pad } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Videography, photography, social media strategy, paid media strategy and branding strategy from Visual Studios Plus, Colombo.",
  alternates: { canonical: "/services" },
  openGraph: { title: `Services — ${site.name}`, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Made to be experienced."
        intro="Partnering with ambitious startups and established brands, we use visual content to create a positive brand presence — and the strategy to put it to work."
      />

      {/* Index */}
      <nav aria-label="Services" className="container-x pb-10">
        <ul className="flex flex-wrap gap-2">
          {services.map((s, i) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-bone/75 transition-colors hover:border-bronze hover:text-bone"
              >
                <span className="text-xs text-bronze">{pad(i + 1)}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-24 border-b border-line py-20 md:py-32">
            <div className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
              <div className={cn("md:col-span-5", i % 2 === 1 && "md:order-2 md:col-start-8")}>
                <div className="md:sticky md:top-32">
                  <p className="text-sm tabular-nums text-bronze">{pad(i + 1)} / {pad(services.length)}</p>
                  <h2 id={`${s.slug}-title`} className="display-md mt-6">
                    {s.title}
                  </h2>
                  <Reveal>
                    <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/70">{s.summary}</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <ul className="mt-10 border-t border-line">
                      {s.scope.map((item) => (
                        <li key={item} className="flex items-center justify-between border-b border-line py-4 text-bone/85">
                          {item}
                          <span aria-hidden className="size-1.5 rounded-full bg-bronze/70" />
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  {s.href && (
                    <Reveal delay={0.15} className="mt-10">
                      <ButtonLink href={s.href} variant="outline">
                        See the work
                      </ButtonLink>
                    </Reveal>
                  )}
                </div>
              </div>
              <div className={cn("md:col-span-6", i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7")}>
                <ParallaxImage src={s.image} alt={s.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] w-full" />
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTA />
    </>
  );
}
