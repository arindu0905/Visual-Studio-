import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { photoDisciplines } from "@/data/photography";
import { asset } from "@/lib/assets";
import { pad } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About",
  description: `${site.about.statement} ${site.about.body}`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About — ${site.name}`, description: site.about.statement, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Content meant to be experienced."
        intro={
          <>
            <p className="text-bone">{site.about.statement}</p>
            <p className="mt-5">{site.about.body}</p>
          </>
        }
      />

      <ParallaxImage
        src={asset("DJI_0078-HDR.webp")}
        alt="Aerial photograph of a hillside resort among tea country greenery"
        sizes="100vw"
        priority
        strength={10}
        className="aspect-[4/5] w-full sm:aspect-[21/9]"
      />

      {/* Manifesto */}
      <section aria-labelledby="manifesto-title" className="py-28 md:py-44">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel index="01">How we work</SectionLabel>
            <Reveal className="mt-8">
              <p className="max-w-sm text-lg leading-relaxed text-bone/70">{site.videography.statement}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <h2 id="manifesto-title" className="sr-only">
              Our manifesto
            </h2>
            <ol className="border-b border-line">
              {site.videography.manifesto.map((line, i) => (
                <li key={line} className="flex items-baseline gap-6 border-t border-line py-8 md:gap-10 md:py-12">
                  <span className="text-sm tabular-nums text-bronze">{pad(i + 1)}</span>
                  <SplitText as="span" text={line} className="display-md block" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section aria-labelledby="disciplines-title" className="bg-ink-2 py-28 md:py-40">
        <div className="container-x">
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div>
              <SectionLabel index="02">What we create</SectionLabel>
              <SplitText as="h2" id="disciplines-title" text="Stills and motion, under one roof." className="display-lg mt-8 max-w-[14ch]" />
            </div>
            <Reveal>
              <Link href="/services" className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                <span className="link-underline">All services</span>
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <Link href="/work" data-cursor="view" data-distort-root className="group block">
                <ParallaxImage
                  src="https://i.ytimg.com/vi/d-_dQ9-LmxE/maxresdefault.jpg"
                  alt="Chef Peter Kuruvita on set for ITC Rathnadeepa"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  strength={6}
                  distort
                  className="aspect-[3/2] w-full"
                  imgClassName="transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em]">Videography</p>
                <p className="mt-1 text-sm text-bone/55">Full scale in-house production team</p>
              </Link>
            </Reveal>
            {photoDisciplines.map((d, i) => (
              <Reveal key={d.label} delay={((i + 1) % 3) * 0.08}>
                <Link href="/photography" data-cursor="view" data-distort-root className="group block">
                  <ParallaxImage
                    src={d.image}
                    alt={d.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    strength={6}
                    distort
                    className="aspect-[3/2] w-full"
                    imgClassName="transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em]">{d.label}</p>
                  <p className="mt-1 text-sm text-bone/55">Photography</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Clients />
      <CTA />
    </>
  );
}
