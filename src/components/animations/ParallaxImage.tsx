"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn, EASE } from "@/lib/utils";
import { HoverDistort } from "@/components/effects/HoverDistort";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Vertical parallax travel as a % of the frame height. */
  strength?: number;
  priority?: boolean;
  /** Curtain-style clip reveal when first scrolled into view. */
  reveal?: boolean;
  /** WebGL liquid hover effect (needs an ancestor with `data-distort-root`). */
  distort?: boolean;
};

/**
 * Image in a fixed-ratio frame (set the ratio via className, e.g. "aspect-[4/5]")
 * that drifts on scroll and unveils itself with a clip-path wipe.
 */
export function ParallaxImage({ src, alt, sizes, className, imgClassName, strength = 12, priority, reveal = true, distort }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden bg-ink-3", className)}
      initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
    >
      <motion.div className="absolute inset-x-0" style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
        {distort && <HoverDistort />}
      </motion.div>
    </motion.div>
  );
}
