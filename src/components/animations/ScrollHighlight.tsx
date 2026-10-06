"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/** Words light up one by one as the paragraph travels through the viewport. */
export function ScrollHighlight({ text, className, accent = [] }: { text: string; className?: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const isAccent = accent.includes(w.replace(/[.,’']/g, ""));
        return (
          <span key={i} className={isAccent ? "serif-accent text-bronze" : undefined}>
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
              {w}
            </Word>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
}
