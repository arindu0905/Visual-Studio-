"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function Row({
  items,
  baseVelocity,
  velocityFactor,
  skew,
  outline,
}: {
  items: string[];
  baseVelocity: number;
  velocityFactor: MotionValue<number>;
  skew: MotionValue<number>;
  outline?: boolean;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const vf = velocityFactor.get();
    // Scrolling up reverses the drift; scrolling fast speeds it up.
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(vf));
    baseX.set(baseX.get() + move);
  });

  const content = (copy: number) =>
    items.map((t, i) => (
      <span key={`${copy}-${t}`} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
        <span
          className={cn(
            "px-[0.35em]",
            outline ? "text-transparent [-webkit-text-stroke:1.5px_rgb(244_244_245/0.55)]" : i % 2 ? "text-bone/35" : "text-bone",
          )}
        >
          {t}
        </span>
        <span aria-hidden className="text-[0.45em] text-bronze">
          ✦
        </span>
      </span>
    ));

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex will-change-transform" style={{ x, skewX: reduce ? 0 : skew }}>
        {content(0)}
        {content(1)}
      </motion.div>
    </div>
  );
}

/**
 * Oversized, endlessly drifting band of the studio's disciplines. It speeds up,
 * reverses and leans with the visitor's scroll velocity. Static with reduced motion.
 */
export function KineticBand() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 0, 2500], [7, 0, -7]);

  const titles = services.map((s) => s.title);
  const half = Math.ceil(titles.length / 2);

  return (
    <section aria-label="Studio disciplines" className="relative overflow-hidden border-y border-line bg-ink py-10 md:py-14">
      <h2 className="sr-only">Our disciplines: {titles.join(", ")}</h2>
      <div className="space-y-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,8.5rem)] font-black uppercase leading-[1.05] tracking-[-0.04em] md:space-y-3">
        <Row items={titles.slice(0, half)} baseVelocity={-2.2} velocityFactor={velocityFactor} skew={skew} />
        <Row items={titles.slice(half)} baseVelocity={2.2} velocityFactor={velocityFactor} skew={skew} outline />
      </div>
    </section>
  );
}
