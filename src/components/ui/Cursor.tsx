"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorState = "default" | "link" | "view" | "play" | "hidden";

const LABELS: Partial<Record<CursorState, string>> = { view: "View", play: "Play" };

/**
 * Desktop-only custom cursor. Elements opt into states with `data-cursor="view|play|hidden"`;
 * links and buttons get the "link" state automatically. Never renders on touch devices
 * or when the user prefers reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target instanceof Element ? e.target : null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setState((tagged.dataset.cursor as CursorState) ?? "default");
      } else if (el?.closest("a, button, [role='button'], input, textarea, select, label")) {
        setState("link");
      } else {
        setState("default");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state === "view" || state === "play" ? 96 : state === "link" ? 44 : 10;
  const label = LABELS[state];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          opacity: visible && state !== "hidden" ? 1 : 0,
          backgroundColor: label ? "rgba(188,153,126,1)" : state === "link" ? "rgba(237,234,228,0)" : "rgba(237,234,228,1)",
          borderColor: state === "link" ? "rgba(237,234,228,0.8)" : "rgba(237,234,228,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        style={{ borderWidth: 1, borderStyle: "solid", mixBlendMode: label ? "normal" : "difference" }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
