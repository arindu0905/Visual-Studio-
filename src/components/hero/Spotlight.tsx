"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer over the hero: the reel brightens under
 * the cursor while the rest of the frame dims slightly. Mouse/trackpad only,
 * off for reduced motion. Position is written to CSS variables (no re-renders).
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let started = false;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;
      el.style.setProperty("--mx", `${cur.x}px`);
      el.style.setProperty("--my", `${cur.y}px`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = section.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!started) {
        cur.x = target.x;
        cur.y = target.y;
        started = true;
      }
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.13), transparent 62%), radial-gradient(900px circle at var(--mx, 50%) var(--my, 50%), transparent 30%, rgba(12,14,12,0.42) 100%)",
      }}
    />
  );
}
