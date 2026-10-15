"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Lens } from "@/components/layout/Lens";
import { EASE_IN_OUT } from "@/lib/utils";

// Set after the first client render, so the transition only plays on in-app navigations
// (the first load is handled by the preloader) and server/client markup always match.
let hasNavigated = false;

/**
 * Re-mounts on every navigation: the incoming page starts behind the lens
 * (name rolling, iris breathing), then the screen opens like an aperture onto it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(() => typeof window !== "undefined" && hasNavigated && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [opening, setOpening] = useState(false);
  const radius = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${radius}vmax, #000 calc(${radius}vmax + 1px))`;

  useEffect(() => {
    hasNavigated = true;
    if (!show) return;
    let controls: ReturnType<typeof animate> | undefined;
    const t = window.setTimeout(() => {
      setOpening(true);
      controls = animate(radius, 150, { duration: 0.75, ease: EASE_IN_OUT, onComplete: () => setShow(false) });
    }, 380);
    return () => {
      window.clearTimeout(t);
      controls?.stop();
    };
  }, [show, radius]);

  return (
    <>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
          style={{ WebkitMaskImage: mask, maskImage: mask, pointerEvents: opening ? "none" : "auto" }}
        >
          <motion.div
            className="w-[min(46vw,240px)]"
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={opening ? { scale: 2.2, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: opening ? 0.75 : 0.35, ease: EASE_IN_OUT }}
          >
            <Lens iris="idle" />
          </motion.div>
        </motion.div>
      )}
      {children}
    </>
  );
}
