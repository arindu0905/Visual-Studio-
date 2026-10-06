"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { photos, photoCategories } from "@/data/photography";
import { asset } from "@/lib/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverDistort } from "@/components/effects/HoverDistort";

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

const SPEED = 55; // px per second

/**
 * Self-playing photography reel. The strip glides on its own in an endless loop,
 * eases to a stop while hovered or touched, and can be dragged/swiped in either
 * direction. It only runs while on screen, and stays still for reduced motion.
 */
export function PhotoReel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let offset = 0;
    let speed = reduced ? 0 : SPEED;
    let targetSpeed = speed;
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let drag: { x: number; offset: number; moved: boolean } | null = null;

    // Exact loop length: distance from the first frame to its duplicate (includes the gap).
    const half = () => {
      const kids = track.children as HTMLCollectionOf<HTMLElement>;
      const n = kids.length / 2;
      return n ? kids[n].offsetLeft - kids[0].offsetLeft : 0;
    };
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      while (offset <= -h) offset += h;
      while (offset > 0) offset -= h;
    };
    const apply = () => {
      track.style.transform = `translate3d(${offset}px,0,0)`;
    };

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      speed += (targetSpeed - speed) * 0.06;
      if (!drag) offset -= speed * dt;
      wrap();
      apply();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(viewport);

    const pause = () => (targetSpeed = 0);
    const resume = () => (targetSpeed = reduced ? 0 : SPEED);

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, offset, moved: false };
      pause();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) drag.moved = true;
      offset = drag.offset + dx;
      wrap();
      apply();
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      if (e.pointerType !== "mouse") resume();
      // Swallow the click that follows a drag so it doesn't open a photo.
      if (moved) {
        const stop = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        viewport.addEventListener("click", stop, { capture: true, once: true });
        window.setTimeout(() => viewport.removeEventListener("click", stop, { capture: true }), 50);
      }
    };
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && pause();
    const leave = () => {
      drag = null;
      resume();
    };

    viewport.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    viewport.addEventListener("pointerenter", enter);
    viewport.addEventListener("pointerleave", leave);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", resume);
    const onResize = () => {
      wrap();
      apply();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      viewport.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      viewport.removeEventListener("pointerenter", enter);
      viewport.removeEventListener("pointerleave", leave);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", resume);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section aria-labelledby="photo-reel-title" className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
      <div className="container-x mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
        <div>
          <SectionLabel index="04">Our photography</SectionLabel>
          <h2 id="photo-reel-title" className="display-lg mt-8">
            Port<span className="serif-accent text-bronze">folio</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-bone/65">
            Food, product, fashion, jewellery, hospitality, interiors and architecture — photographed for brands across Sri Lanka.
          </p>
          <Link href="/photography" className="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-bone">
            <span className="link-underline">Explore the archive</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        role="region"
        aria-label="Photography reel — moves automatically; hover or touch to pause, drag to browse"
      >
        <div ref={trackRef} className="flex w-max gap-4 pb-12 will-change-transform md:gap-8">
          {[0, 1].map((copy) =>
            frames.map((p, i) => (
              <figure
                key={`${copy}-${p.src}`}
                aria-hidden={copy === 1}
                className="group relative h-[min(48svh,380px)] shrink-0 md:h-[min(62svh,600px)]"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Link
                  href={`/photography?category=${p.category}#gallery`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  data-cursor="view"
                  data-distort-root
                  draggable={false}
                  className="absolute inset-0 overflow-hidden"
                >
                  <Image
                    src={p.src}
                    alt={copy === 1 ? "" : p.alt}
                    fill
                    loading="eager"
                    draggable={false}
                    sizes={`(min-width: 768px) ${Math.round((62 * p.width) / p.height)}vh, ${Math.round((48 * p.width) / p.height)}vh`}
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105"
                  />
                  <HoverDistort />
                </Link>
                <figcaption className="absolute -bottom-9 left-0 flex w-full justify-between text-xs uppercase tracking-[0.2em] text-bone/55">
                  <span>{labelFor(p.category)}</span>
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
