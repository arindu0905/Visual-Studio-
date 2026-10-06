"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-bone"
    >
      Back to top
      <ArrowUp aria-hidden className="size-3.5 transition-transform duration-500 group-hover:-translate-y-1" />
    </button>
  );
}
