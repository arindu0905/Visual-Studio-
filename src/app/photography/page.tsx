import type { Metadata } from "next";
import { photoCategories, photos, type PhotoCategoryId } from "@/data/photography";
import { site } from "@/data/site";
import { PhotoWall } from "@/components/portfolio/PhotoWall";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowDown } from "lucide-react";
import { PhotoGallery } from "@/components/portfolio/PhotoGallery";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Photography Portfolio",
  description:
    "The Visual Studios Plus photography portfolio — food, fashion, jewellery and hospitality, interior & architecture photography from Colombo, Sri Lanka.",
  alternates: { canonical: "/photography" },
  openGraph: { title: `Photography Portfolio — ${site.name}`, url: "/photography", images: [{ url: photos[0].src, alt: photos[0].alt }] },
};

const isCategory = (v: unknown): v is PhotoCategoryId => photoCategories.some((c) => c.id === v);

export default async function PhotographyPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const { category } = await searchParams;
  const initial = isCategory(category) ? category : "all";

  return (
    <>
      <PhotoWall>
        <div className="container-x pb-16 md:pb-24">
          <Reveal y={12}>
            <p className="eyebrow flex items-center gap-3 text-bone/80">
              <span className="size-1.5 rounded-full bg-bronze" aria-hidden />
              Photography — {photos.length} images
            </p>
          </Reveal>
          <SplitText as="h1" trigger="mount" delay={0.1} text="Photography portfolio." className="display-xl mt-8 max-w-[12ch]" />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.4}>
              <p className="max-w-md text-lg leading-relaxed text-bone/80 md:text-xl">
                Food, fashion, jewellery, hospitality, interiors and architecture. Select a frame to view it full screen.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <a href="#gallery" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone">
                <span className="grid size-12 place-items-center rounded-full border border-bone/30 transition-colors duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
                  <ArrowDown aria-hidden className="size-4" />
                </span>
                Browse the archive
              </a>
            </Reveal>
          </div>
        </div>
      </PhotoWall>
      <section id="gallery" aria-label="Photography gallery" className="container-x scroll-mt-4 pb-28 pt-16 md:pb-40 md:pt-24">
        <PhotoGallery initial={initial} />
      </section>
      <CTA title="Have a product, a place or a plate to shoot?" />
    </>
  );
}
