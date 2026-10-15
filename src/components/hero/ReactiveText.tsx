"use client";

import { Fragment, useEffect, useRef } from "react";

const RADIUS = 190; // px of influence around the pointer

/**
 * Letters lift and swell gently as the pointer passes near them. Words stay
 * unbreakable so wrapping is unchanged. Mouse/trackpad only; static otherwise.
 * The parent should be aria-hidden with the full text provided for screen readers.
 */
export function ReactiveText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest("section");
    if (!root || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-l]"));
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const update = () => {
      raf = 0;
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
        const f = Math.max(0, 1 - d / RADIUS);
        const e = f * f * (3 - 2 * f); // smoothstep
        l.style.transform = e > 0.001 ? `translate3d(0, ${(-0.07 * e).toFixed(3)}em, 0) scale(${(1 + 0.09 * e).toFixed(3)})` : "";
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const leave = () => {
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(update);
    };

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(w).map((ch, ci) => (
              <span
                key={ci}
                data-l
                className="inline-block origin-bottom transition-transform duration-500 ease-[var(--ease-expo)] will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
