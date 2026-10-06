"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Service } from "@/data/services";
import { EASE, pad } from "@/lib/utils";

/**
 * Typographic index of services. On fine pointers, hovering a row floats a
 * cursor-following image preview; the number slides and the title indents.
 */
export function ServiceList({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ul className="border-b border-line">
        {services.map((s, i) => (
          <li key={s.slug} className="border-t border-line">
            <Link
              href={`/services#${s.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] md:gap-x-8 md:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-bone/[0.035] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
              />
              <span className="relative text-xs tabular-nums text-stone transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:text-bronze md:text-sm">
                {pad(i + 1)}
              </span>
              <span className="relative">
                <span className="block font-[family-name:var(--font-display)] text-[clamp(1.9rem,5.2vw,5.2rem)] font-medium leading-none tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 md:group-hover:translate-x-8">
                  {s.title}
                </span>
                <span className="mt-3 block max-w-md text-sm leading-relaxed text-bone/55 md:hidden">{s.summary}</span>
              </span>
              <span className="relative hidden text-sm leading-relaxed text-bone/55 transition-colors duration-500 group-hover:text-bone/85 md:block">
                {s.scope.join(" · ")}
              </span>
              <span className="relative grid size-10 place-items-center justify-self-end rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink md:size-12">
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview (desktop / mouse only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="relative -ml-40 -mt-28 h-56 w-80 overflow-hidden"
              initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", scale: active === i ? 1 : 1.2 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image src={s.image} alt="" fill sizes="320px" className="object-cover" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
