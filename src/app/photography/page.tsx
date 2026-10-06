import type { Metadata } from "next";
import { photoCategories, photos, type PhotoCategoryId } from "@/data/photography";
import { site } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
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
      <PageHero
        eyebrow={`Photography — ${photos.length} images`}
        title="Photography portfolio."
        intro="Food, fashion, jewellery, hospitality, interiors and architecture. Select a frame to view it full screen."
      />
      <section aria-label="Photography gallery" className="container-x pb-28 md:pb-40">
        <PhotoGallery initial={initial} />
      </section>
      <CTA title="Have a product, a place or a plate to shoot?" />
    </>
  );
}
