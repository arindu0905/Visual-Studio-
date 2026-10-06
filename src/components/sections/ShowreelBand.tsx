"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ShowreelModal } from "@/components/ui/ShowreelModal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

/** The showreel grows from an inset frame to full-bleed as it scrolls into view. */
export function ShowreelBand() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);

  // Autoplay (muted) only while visible, and never with reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section aria-labelledby="reel-title" className="relative py-28 md:py-40">
      <div className="container-x mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <SectionLabel index="05">Videography</SectionLabel>
          <h2 id="reel-title" className="display-md mt-8 max-w-[14ch]">
            Our videography <span className="serif-accent text-bronze">showreel</span>
          </h2>
        </div>
        <Reveal className="self-end md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed text-bone/70">{site.videography.statement}</p>
        </Reveal>
      </div>

      <div ref={ref} className="relative">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor="play"
          aria-label="Play the Visual Studios Plus showreel"
          style={{ clipPath: reduce ? undefined : clipPath }}
          className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink-3 sm:aspect-video"
        >
          <video
            ref={videoRef}
            src={`${site.media.showreel}#t=${site.media.showreelLoop[0]}`}
            poster={site.media.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-ink/30" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-24 place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110 md:hidden">
              <Play aria-hidden className="size-6 translate-x-0.5 fill-current" />
            </span>
          </span>
          <span className="container-x absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 pb-6 text-left md:pb-10">
            {site.videography.manifesto.map((m) => (
              <span key={m} className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.03em] text-bone md:text-4xl">
                {m}
              </span>
            ))}
          </span>
        </motion.button>
      </div>

      <ShowreelModal open={open} onClose={close} />
    </section>
  );
}
