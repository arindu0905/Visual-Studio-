"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D perspective tilt that follows the pointer, with a soft moving glare.
 * Mouse/trackpad only — touch and reduced-motion users get a flat card.
 */
export function Tilt({ children, className, max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("[perspective:1100px]", className)} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="group/tilt relative [transform-style:preserve-3d]" style={reduce ? undefined : { rotateX, rotateY }}>
        {children}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  );
}
