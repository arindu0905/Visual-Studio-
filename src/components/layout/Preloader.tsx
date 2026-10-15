"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/utils";
import { Lens } from "./Lens";

const KEY = "vsp-intro";
const DURATION = 1200;

/**
 * Branded intro shown once per browser session: a camera lens rolls in with the
 * studio's name turning around it while a counter runs to 100 and the iris opens
 * onto the VS+ mark. Then the whole screen opens like an aperture onto the site.
 * Skipped for returning visits in the same session and for reduced motion
 * (an inline script in <head> adds `intro-seen` to <html> before first paint).
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [opening, setOpening] = useState(false);
  const radius = useMotionValue(0); // aperture radius in vmax
  const mask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${radius}vmax, #000 calc(${radius}vmax + 1px))`;

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("intro-seen")) {
      setVisible(false);
      onDone();
      return;
    }
    const lock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let raf = 0;
    let stop: (() => void) | undefined;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      // Open the aperture onto the page.
      setOpening(true);
      document.body.style.overflow = lock;
      window.setTimeout(onDone, 120);
      const controls = animate(radius, 150, { duration: 0.9, ease: EASE_IN_OUT, onComplete: () => setVisible(false) });
      stop = () => controls.stop();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      stop?.();
      document.body.style.overflow = lock;
    };
  }, [onDone, radius]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden
      className="preloader fixed inset-0 z-[150] flex flex-col bg-ink"
      style={{ WebkitMaskImage: mask, maskImage: mask, pointerEvents: opening ? "none" : "auto" }}
    >
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="w-[min(64vw,380px)]"
          initial={{ opacity: 0, scale: 0.82, rotate: -25 }}
          animate={opening ? { opacity: 0, scale: 1.9, rotate: 10 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: opening ? 0.9 : 0.8, ease: opening ? EASE_IN_OUT : EASE }}
        >
          <Lens irisDuration={DURATION / 1000} />
        </motion.div>
      </div>
      <div className="container-x flex items-end justify-between pb-8 md:pb-10">
        <p className="eyebrow text-bone/50">Visual Studios Plus — Colombo</p>
        <p className="font-[family-name:var(--font-display)] text-5xl font-black tabular-nums tracking-[-0.04em] text-bone md:text-7xl">
          {String(count).padStart(3, "0")}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-px bg-bronze" style={{ width: `${count}%` }} />
    </motion.div>
  );
}
