"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { EASE, EASE_IN_OUT } from "@/lib/utils";

const KEY = "vsp-intro";
const DURATION = 1500;

/**
 * Branded intro shown once per browser session: the VS+ mark unmasks while a
 * counter runs to 100, then a two-layer curtain lifts to reveal the hero.
 * Skipped for returning visits in the same session and for reduced motion
 * (an inline script in <head> adds `intro-seen` to <html> before first paint).
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

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
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setVisible(false);
        document.body.style.overflow = lock;
        window.setTimeout(onDone, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = lock;
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="preloader" aria-hidden className="preloader fixed inset-0 z-[150]" exit={{ pointerEvents: "none" }}>
          {/* bronze under-layer lifts a beat after the ink layer for a filmic double wipe */}
          <motion.div className="absolute inset-0 bg-bronze" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: 0.12 }} />
          <motion.div className="absolute inset-0 flex flex-col bg-ink" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: EASE_IN_OUT }}>
            <div className="flex flex-1 items-center justify-center">
              <motion.div
                className="relative h-14 overflow-hidden md:h-20"
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              >
                <Image src={site.media.logo} alt="" width={696} height={240} priority sizes="240px" className="h-full w-auto" />
              </motion.div>
            </div>
            <div className="container-x flex items-end justify-between pb-8 md:pb-10">
              <p className="eyebrow text-bone/50">Visual Studios Plus — Colombo</p>
              <p className="font-[family-name:var(--font-display)] text-5xl font-semibold tabular-nums tracking-[-0.04em] text-bone md:text-7xl">
                {String(count).padStart(3, "0")}
              </p>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-bronze"
              style={{ width: `${count}%` }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
