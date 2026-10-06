"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_IN_OUT } from "@/lib/utils";

// Set after the first client render, so the curtain only plays on in-app navigations
// (the first load is handled by the preloader) and server/client markup always match.
let hasNavigated = false;

/** Re-mounts on every navigation: a two-tone curtain lifts off the incoming page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [curtain] = useState(() => typeof window !== "undefined" && hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {curtain && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
          <motion.div
            className="absolute inset-0 origin-top bg-bronze"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: EASE_IN_OUT, delay: 0.12 }}
          />
          <motion.div
            className="absolute inset-0 origin-top bg-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: EASE_IN_OUT }}
          />
        </div>
      )}
      {children}
    </>
  );
}
