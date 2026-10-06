"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

type LenisInstance = {
  raf: (t: number) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; force?: boolean }) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisInstance;
  }
}

/**
 * Inertial smooth scrolling (Lenis) for mouse/trackpad users. Touch devices keep
 * native scrolling, and it is disabled entirely for prefers-reduced-motion.
 * Any code that locks `body { overflow: hidden }` (menu, lightbox, showreel)
 * automatically pauses it.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let lenis: LenisInstance | undefined;
    let mo: MutationObserver | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } }) as unknown as LenisInstance;
      window.__lenis = lenis;
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      mo = new MutationObserver(() => (document.body.style.overflow === "hidden" ? lenis!.stop() : lenis!.start()));
      mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      mo?.disconnect();
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Next.js resets the native scroll position on navigation; keep Lenis in sync.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
