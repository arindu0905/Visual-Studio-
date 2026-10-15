"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { asset, youtubeThumb } from "@/lib/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

const frames = [
  { label: "Gastronomy", src: asset("KeelesFoodPhotography0314.webp"), alt: "Overhead food photography of a Sri Lankan crab curry spread" },
  { label: "Hospitality", src: asset("D85_3829-HDR.webp"), alt: "Hotel terrace overlooking misty mountains" },
  { label: "Film still", src: youtubeThumb("d-_dQ9-LmxE"), alt: "Chef Peter Kuruvita on set for ITC Rathnadeepa" },
];

/** Flat camera profile, simulated from the delivered frame. */
const LOG = "saturate(0.38) contrast(0.68) brightness(1.12)";

const grades = [
  { id: "studio", label: "Studio grade", filter: "none", overlay: "" },
  { id: "warm", label: "Warm", filter: "sepia(0.22) saturate(1.22) contrast(1.06) brightness(1.02)", overlay: "" },
  {
    id: "teal-orange",
    label: "Teal & Orange",
    filter: "saturate(1.12) contrast(1.08)",
    overlay: "linear-gradient(140deg, rgba(0,120,140,0.42), rgba(255,150,60,0.18))",
  },
  { id: "mono", label: "Mono", filter: "grayscale(1) contrast(1.25) brightness(1.02)", overlay: "" },
];

export function GradeCompare() {
  const [frame, setFrame] = useState(0);
  const [grade, setGrade] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(boxRef, { once: true, margin: "0px 0px -25% 0px" });
  const pos = useMotionValue(50); // % from the left where the split sits
  const clip = useTransform(pos, (p) => `inset(0% ${100 - p}% 0% 0%)`);
  const handleX = useTransform(pos, (p) => `${p}%`);
  const [value, setValue] = useState(50);

  useEffect(() => pos.on("change", (v) => setValue(Math.round(v))), [pos]);

  // A slow sweep the first time it comes into view hints that the split can be dragged.
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(pos, [50, 82, 18, 50], { duration: 2.6, ease: "easeInOut", delay: 0.3 });
    return () => c.stop();
  }, [inView, reduce, pos]);

  const setFromPointer = (clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    pos.stop();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const f = frames[frame];
  const g = grades[grade];

  return (
    <section aria-labelledby="grade-title" className="relative py-28 md:py-40" data-clip="Colour">
      <div className="container-x">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="06">Colour grading</SectionLabel>
            <SplitText as="h2" id="grade-title" text="From flat LOG to the finished frame." className="display-lg mt-8" />
          </div>
          <Reveal className="self-end md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-bone/70">
              Drag across the frame. Every shoot is colour graded in-house in DaVinci Resolve before it reaches your feed.
            </p>
          </Reveal>
        </div>

        <div
          ref={boxRef}
          className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden bg-ink-3 sm:aspect-[16/9]"
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            setFromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1 || e.pointerType === "mouse") setFromPointer(e.clientX);
          }}
          data-cursor="hidden"
        >
          {/* Graded (right) */}
          <div className="absolute inset-0">
            <Image src={f.src} alt={f.alt} fill sizes="100vw" className="object-cover" style={{ filter: g.filter }} />
            {g.overlay && <div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background: g.overlay }} />}
          </div>
          {/* LOG (left) */}
          <motion.div aria-hidden className="absolute inset-0" style={{ clipPath: clip }}>
            <Image src={f.src} alt="" fill sizes="100vw" className="object-cover" style={{ filter: LOG }} />
          </motion.div>

          {/* Corner labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.05em] text-bone/80 backdrop-blur md:left-6 md:top-6">
            LOG · Flat profile
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-bronze px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.05em] text-ink md:right-6 md:top-6">
            Graded · {g.label}
          </span>

          {/* Split handle */}
          <motion.div className="pointer-events-none absolute inset-y-0 w-px bg-bone" style={{ left: handleX }}>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare LOG and graded image"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={`${value}% LOG`}
              onKeyDown={(e) => {
                const step = e.shiftKey ? 10 : 2;
                if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - step));
                if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + step));
              }}
              className="pointer-events-auto absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-bone/60 bg-ink/60 text-xs font-bold text-bone backdrop-blur-md"
            >
              ◂ ▸
            </div>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Frame" className="flex flex-wrap gap-2">
            {frames.map((x, i) => (
              <button
                key={x.label}
                type="button"
                aria-pressed={frame === i}
                onClick={() => setFrame(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] transition-colors",
                  frame === i ? "border-bone bg-bone text-ink" : "border-line text-bone/70 hover:border-bone/50 hover:text-bone",
                )}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Grade" className="flex flex-wrap gap-2">
            {grades.map((x, i) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={grade === i}
                onClick={() => setGrade(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] transition-colors",
                  grade === i ? "border-bronze bg-bronze text-ink" : "border-line text-bone/70 hover:border-bronze/60 hover:text-bone",
                )}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-stone">The flat LOG view is simulated from the delivered frame to show the grading step.</p>
      </div>
    </section>
  );
}
