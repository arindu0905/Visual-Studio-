"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { phases } from "@/data/philosophy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn, EASE, pad } from "@/lib/utils";

const INTERVAL = 4.5; // seconds each phase stays on screen

/**
 * The six phases play like a slideshow: the active tab's bar fills over
 * INTERVAL seconds, then the next phase slides in. Pauses while the pointer is on
 * the tabs, while keyboard focus is inside, and while off-screen; any tab can be clicked. Reduced motion: no auto-advance.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the fill when a tab is clicked
  const playing = inView && !hovered && !reduce;

  const go = (i: number) => {
    setActive((i + phases.length) % phases.length);
    setCycle((c) => c + 1);
  };

  const p = phases[active];

  return (
    <section
      ref={ref}
      data-clip="Philosophy"
      aria-labelledby="philosophy-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden border-y border-line py-24 md:py-32"
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <h2 id="philosophy-title" className="sr-only">
        Our philosophy: {phases.map((x) => x.title).join(" ")}
      </h2>

      {/* Oversized phase number drifting in the background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-[4vw]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            className="font-[family-name:var(--font-display)] text-[42vw] font-black leading-none tracking-[-0.06em] text-bone/[0.035] md:text-[26vw]"
            initial={{ y: "30%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-30%", opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {pad(active + 1)}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="container-x relative">
        <div className="flex items-center justify-between">
          <SectionLabel index="02">Agency operating philosophy</SectionLabel>
          <p className="eyebrow tabular-nums text-bone/70" aria-hidden>
            <span className="text-bronze">{pad(active + 1)}</span> / {pad(phases.length)}
          </p>
        </div>

        {/* Fixed-height stage so the page never jumps between phases */}
        <div className="relative mt-10 min-h-[22rem] md:mt-14 md:min-h-[24rem]" aria-live={playing ? "off" : "polite"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial="hidden" animate="show" exit="exit">
              <motion.p
                className="eyebrow text-bronze"
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                Phase {pad(active + 1)} · {p.phase}
              </motion.p>
              <div className="overflow-hidden pb-[0.08em]">
                <motion.p
                  className="display-xl mt-5 uppercase"
                  variants={{ hidden: { y: "105%" }, show: { y: "0%" }, exit: { y: "-105%" } }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  {p.title}
                </motion.p>
              </div>
              <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
                <motion.p
                  className="max-w-xl text-lg leading-relaxed text-bone/75 md:text-xl"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                >
                  {p.text}
                </motion.p>
                <motion.p
                  className="inline-flex w-fit items-center gap-3 rounded-full border border-bronze/40 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.05em] text-bronze"
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.16 }}
                >
                  <span className="size-1.5 rounded-full bg-bronze" aria-hidden />
                  {p.proof}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase tabs: the active bar fills over time, then advances */}
        <div
          role="tablist"
          aria-label="Philosophy phases"
          className="mt-12 grid grid-cols-3 gap-x-2 gap-y-5 md:mt-16 md:grid-cols-6"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {phases.map((x, i) => (
            <button
              key={x.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => go(i)}
              className="group text-left"
            >
              <span className="block h-px w-full overflow-hidden bg-line">
                {i < active && <span className="block h-full w-full bg-bronze/60" />}
                {i === active && (
                  <span
                    key={`${active}-${cycle}`}
                    className={cn("block h-full bg-bronze", reduce ? "w-full" : "phase-fill")}
                    style={{ animationDuration: `${INTERVAL}s`, animationPlayState: playing ? "running" : "paused" }}
                    onAnimationEnd={() => !reduce && go(active + 1)}
                  />
                )}
              </span>
              <span
                className={cn(
                  "mt-3 block text-[0.65rem] font-bold uppercase tracking-[0.05em] transition-colors duration-500",
                  i === active ? "text-bone" : "text-stone/70 group-hover:text-bone",
                )}
              >
                {pad(i + 1)} · {x.phase}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
