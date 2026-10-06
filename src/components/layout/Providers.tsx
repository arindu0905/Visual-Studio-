"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** `reducedMotion="user"` makes every Framer Motion transform respect prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
