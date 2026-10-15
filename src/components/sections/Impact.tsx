"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { impact } from "@/data/philosophy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

/** Splits "+142%" / "1.2M+" / "8K" into prefix, number, suffix. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  return m ? { prefix: m[1], num: parseFloat(m[2]), decimals: (m[2].split(".")[1] ?? "").length, suffix: m[3] } : null;
}

/** Counts up from zero the first time it scrolls into view. Renders the final value on the server. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const parts = parse(value);

  // Start from zero on the client so the count-up does not flash the final value first.
  useEffect(() => {
    if (ref.current && parts && !reduce) ref.current.textContent = parts.prefix + (0).toFixed(parts.decimals) + parts.suffix;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts || !inView || reduce) return;
    const controls = animate(0, parts.num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = parts.prefix + v.toFixed(parts.decimals) + parts.suffix;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function Impact() {
  return (
    <section data-clip="Impact" aria-labelledby="impact-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="08">Commercial attributions</SectionLabel>
            <SplitText as="h2" id="impact-title" text="Verified business impact." className="display-lg mt-8" />
          </div>
          <Reveal className="self-end md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-bone/70">
              Every reel, campaign asset, and ad spend is audited against real commercial benchmarks and engagement lifts.
            </p>
          </Reveal>
        </div>

        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((m, i) => (
            <Reveal
              as="li"
              key={m.label}
              delay={(i % 3) * 0.08}
              className="group relative border-b border-line py-10 pr-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:pl-8 lg:[&:nth-child(3n)]:!border-r-0 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <p className="font-[family-name:var(--font-display)] text-[clamp(3.2rem,7vw,6.5rem)] font-black leading-none tracking-[-0.05em] text-bronze">
                <CountUp value={m.value} />
              </p>
              <p className="mt-4 text-lg font-bold text-bone">{m.label}</p>
              <p className="eyebrow mt-2">{m.client}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
