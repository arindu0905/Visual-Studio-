"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/utils";
import { useIntroDone } from "@/components/layout/Providers";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type Props = {
  text: string;
  id?: string;
  as?: keyof typeof tags;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** "view" animates when scrolled into view; "mount" animates immediately. */
  trigger?: "view" | "mount";
};

const word: Variants = {
  hidden: { y: "110%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * Word-by-word masked text reveal. The full string stays in the DOM as normal
 * text, so it is read correctly by screen readers and search engines.
 */
export function SplitText({ text, id, as = "p", className, wordClassName, delay = 0, stagger = 0.045, trigger = "view" }: Props) {
  const Tag = tags[as] as typeof motion.div;
  const words = text.split(" ");
  const introDone = useIntroDone();

  const play =
    trigger === "view"
      ? { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -40px 0px" } }
      : { animate: introDone ? ("show" as const) : ("hidden" as const) };

  return (
    <Tag id={id} className={className} initial="hidden" {...play} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
            <motion.span variants={word} className={`inline-block origin-top-left will-change-transform ${wordClassName ?? ""}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
