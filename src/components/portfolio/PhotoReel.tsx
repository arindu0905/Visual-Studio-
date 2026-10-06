"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { photos, photoCategories } from "@/data/photography";
import { asset } from "@/lib/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Curated frames from the photography archive (all from the current portfolio). */
const picks = [
  "D85_3829-HDR.webp",
  "KeelesFoodPhotography0403.webp",
  "7.webp",
  "Palliyaguruge-Jewellers2.webp",
  "DJI_0078-HDR.webp",
  "CurryLeaf.webp",
  "DSC_1657-2.webp",
  "Tiesh-7077-1.webp",
  "D85_2304.webp",
];

const frames = picks
  .map((file) => photos.find((p) => p.src === asset(file)))
  .filter((p): p is (typeof photos)[number] => Boolean(p));

const labelFor = (id: string) => photoCategories.find((c) => c.id === id)?.short ?? "";

/**
 * GSAP is used here for one job it does best: pinning the section and scrubbing
 * a horizontal track with the vertical scroll. On touch screens and with reduced
 * motion it falls back to a native, swipeable horizontal scroller.
 */
export function PhotoReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      ctx = mm;
      // Images have explicit aspect ratios, but fonts can shift the intro panel slightly.
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="photo-reel-title" className="relative overflow-hidden bg-ink-2">
      <div
        ref={trackRef}
        className="flex h-auto snap-x snap-mandatory items-center gap-4 overflow-x-auto px-5 py-24 [scrollbar-width:none] md:h-[100svh] md:snap-none md:gap-8 md:overflow-visible md:px-[4vw] md:py-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-[78vw] shrink-0 snap-start pr-6 md:w-[38vw] md:pr-[4vw]">
          <SectionLabel index="04">Our photography</SectionLabel>
          <h2 id="photo-reel-title" className="display-lg mt-8">
            Port<span className="serif-accent text-bronze">folio</span>
          </h2>
          <p className="mt-8 max-w-sm text-bone/65">
            Food, product, fashion, jewellery, hospitality, interiors and architecture — photographed for brands across Sri Lanka.
          </p>
          <Link href="/photography" className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone">
            <span className="link-underline">Explore the archive</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {frames.map((p, i) => (
          <figure
            key={p.src}
            className="group relative h-[min(52svh,420px)] shrink-0 snap-center md:h-[min(64svh,640px)]"
            style={{ aspectRatio: `${p.width} / ${p.height}` }}
          >
            <Link href={`/photography?category=${p.category}`} data-cursor="view" className="absolute inset-0 overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={`(min-width: 768px) ${Math.round((64 * p.width) / p.height)}vh, 80vw`}
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105"
              />
            </Link>
            <figcaption className="absolute -bottom-9 left-0 flex w-full justify-between text-xs uppercase tracking-[0.2em] text-bone/55">
              <span>{labelFor(p.category)}</span>
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}

        <div className="flex w-[60vw] shrink-0 snap-end items-center justify-center md:w-[30vw]">
          <Link href="/photography" data-cursor="view" className="group flex flex-col items-center gap-5 text-center">
            <span className="grid size-28 place-items-center rounded-full border border-bone/25 transition-all duration-700 group-hover:scale-110 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink md:size-40">
              <ArrowRight aria-hidden className="size-6" />
            </span>
            <span className="text-sm uppercase tracking-[0.2em] text-bone/70">Full portfolio</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
