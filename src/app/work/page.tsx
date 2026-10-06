import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { photoCategories, photos } from "@/data/photography";
import { site } from "@/data/site";
import { cn, pad } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Films and photography by Visual Studios Plus — hospitality, food, product launch and corporate videography, plus food, fashion, jewellery and hospitality photography.",
  alternates: { canonical: "/work" },
  openGraph: { title: `Work — ${site.name}`, url: "/work" },
};

const filmLayout = [
  { col: "md:col-span-12", aspect: "aspect-[4/5] sm:aspect-[21/9]", sizes: "100vw" },
  { col: "md:col-span-5", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { col: "md:col-span-6 md:col-start-7 md:mt-[14vw]", aspect: "aspect-[16/11]", sizes: "(min-width: 768px) 50vw, 100vw" },
  { col: "md:col-span-8 md:col-start-3", aspect: "aspect-[16/9]", sizes: "(min-width: 768px) 66vw, 100vw" },
];

const countFor = (id: string) => photos.filter((p) => p.category === id).length;

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow={`Work — ${projects.length} films · ${photos.length} photographs`}
        title="Selected work."
        intro="Hospitality, food, product and corporate films produced by our in-house team — and an archive of photography across five disciplines."
      />

      <section aria-labelledby="films-title" className="pb-28 md:pb-40">
        <div className="container-x">
          <div className="mb-14 flex items-end justify-between border-b border-line pb-6">
            <h2 id="films-title" className="eyebrow">
              <span className="text-bronze">(A)</span> Films
            </h2>
            <a href="https://www.youtube.com/@visualstudiosplus" target="_blank" rel="noopener noreferrer" className="eyebrow link-underline text-bone/70 hover:text-bone">
              YouTube channel ↗
            </a>
          </div>
          <div className="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
            {projects.map((p, i) => {
              const l = filmLayout[i % filmLayout.length];
              return <ProjectCard key={p.slug} project={p} index={i} aspect={l.aspect} sizes={l.sizes} className={l.col} />;
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="photo-title" className="bg-ink-2 py-28 md:py-40">
        <div className="container-x">
          <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionLabel index="B">Photography</SectionLabel>
              <SplitText as="h2" id="photo-title" text="The photography archive." className="display-lg mt-8" />
            </div>
            <Reveal className="self-end md:col-span-4 md:col-start-9">
              <p className="text-lg text-bone/70">Browse by discipline, or open the full archive.</p>
              <Link href="/photography" className="eyebrow link-underline mt-6 inline-block text-bone">
                View all {photos.length} photographs →
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
            {photoCategories.map((c, i) => (
              <article key={c.id} className={cn("group", i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-[10vw]")}>
                <Link href={`/photography?category=${c.id}#gallery`} data-cursor="view" data-distort-root className="block">
                  <ParallaxImage
                    src={c.cover}
                    alt={c.coverAlt}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    distort
                    className={i % 2 === 0 ? "aspect-[16/11] w-full" : "aspect-[4/5] w-full"}
                    imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                  />
                  <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-bronze md:text-3xl">
                        {c.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-bone/55">{countFor(c.id)} photographs</p>
                    </div>
                    <span className="pt-2 text-xs tabular-nums text-stone">{pad(i + 1)}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
