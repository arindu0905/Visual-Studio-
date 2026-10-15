import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { stats } from "@/data/cases";
import { photoDisciplines } from "@/data/photography";
import { asset } from "@/lib/assets";
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

const capabilities = ["Videography & TVC", "Commercial Photo", "Digital Retainers", "CGI & Generative AI", "Brand Packaging", "Paid Performance"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio profile & core manifesto"
        title="About Visual Studios Plus."
        intro="Engineered in Colombo, built for global attention. Discover our founding story, studio culture, in-house capabilities, and trusted client partnerships."
      />

      <ParallaxImage
        src={asset("DJI_0078-HDR.webp")}
        alt="Aerial photograph of a hillside resort among tea country greenery"
        sizes="100vw"
        priority
        strength={10}
        className="aspect-[4/5] w-full sm:aspect-[21/9]"
      />

      {/* Agency profile */}
      <section data-clip="Profile" aria-labelledby="profile-title" className="py-28 md:py-44">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="01">Agency profile &amp; heritage</SectionLabel>
            <p className="eyebrow mt-6 text-bronze">Colombo 04, Sri Lanka</p>
            <SplitText as="h2" id="profile-title" text={site.about.statement} className="display-md mt-8 max-w-[16ch]" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-bone/70 md:col-span-6 md:col-start-7">
            <Reveal as="p">{site.about.body}</Reveal>
            <Reveal as="p" delay={0.05}>
              We stepped into the digital agency ecosystem to replace slow, outdated advertising models with real-time digital strategy, fast-turnaround
              production war rooms, and cinema-grade storytelling.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Today, we partner with Sri Lanka’s favorite household brands and multinational conglomerates to engineer social campaigns that stop the feed
              and drive verified commercial recall.
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-8 text-sm text-bone/80">
                {capabilities.map((c) => (
                  <li key={c}>
                    <span className="text-bronze">//</span> {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission + figures */}
      <section data-clip="Mission" aria-labelledby="mission-title" className="border-t border-line bg-ink-2 py-28 md:py-40">
        <div className="container-x">
          <SectionLabel index="02">Our core mission</SectionLabel>
          <SplitText
            as="h2"
            id="mission-title"
            text="To help brands smash commercial targets and bring their visions to life using savvy digital solutions."
            className="display-md mt-8 max-w-[22ch]"
          />
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="text-lg leading-relaxed text-bone/70">
                We believe content shouldn’t simply sit in feeds. It needs to ignite emotion, elevate sensory appeal, and make brands unforgettable in the new
                digital and retail landscape.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="space-y-6 text-sm md:col-span-5 md:col-start-8">
              <div>
                <p className="eyebrow mb-2">Headquarters</p>
                <p className="text-bone/80">{site.contact.address.slice(0, 2).join(", ")}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">// Studio standards</p>
                <p className="leading-relaxed text-bone/80">
                  4K Cinema Cameras (Sony FX &amp; RED), DaVinci Resolve color suites, professional food styling kitchens, and live event on-ground edit war
                  rooms.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-2 border-t border-line md:mt-28 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="border-b border-line py-8 pr-6 md:border-b-0 md:py-12">
                <p className="font-[family-name:var(--font-display)] text-5xl font-black tracking-[-0.04em] text-bronze md:text-7xl">{s.value}</p>
                <p className="mt-3 text-sm text-bone/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section data-clip="Capabilities" aria-labelledby="disciplines-title" className="py-28 md:py-40">
        <div className="container-x">
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div>
              <SectionLabel index="03">In-house capabilities</SectionLabel>
              <SplitText as="h2" id="disciplines-title" text="One full-service studio. Zero creative fragmentation." className="display-lg mt-8 max-w-[16ch]" />
            </div>
            <Reveal>
              <Link href="/services" className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
                <span className="link-underline">Capabilities &amp; Services</span>
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
                <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]">Videography &amp; TVC</p>
                <p className="mt-1 text-sm text-bone/55">100% In-House Production</p>
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
                  <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]">{d.label}</p>
                  <p className="mt-1 text-sm text-bone/55">Commercial Photo</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Clients title="Brands that trust our lens and strategy." />
      <CTA
        eyebrow="Inquire project"
        title="Want to partner with Visual Studios Plus?"
        text="Commission a dedicated production or discuss a multi-channel retainer."
        button="Inquire project"
      />
    </>
  );
}
