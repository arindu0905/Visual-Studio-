"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { EASE } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShowreelModal } from "@/components/ui/ShowreelModal";
import { RotatingWord } from "./RotatingWord";
import { useIntroDone } from "@/components/layout/Providers";

const line = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.1 } }),
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: d } }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const play = introDone ? "show" : "hidden";
  const [reelOpen, setReelOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const closeReel = useCallback(() => setReelOpen(false), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Only stream the background reel when motion is welcome and the connection allows it.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || conn?.saveData) return;
    // Start streaming the reel only after the page has finished loading, so it never
    // competes with the headline, fonts and poster image for bandwidth.
    let id: number | undefined;
    const start = () => {
      id = window.setTimeout(() => setPlayVideo(true), 400);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (id) window.clearTimeout(id);
    };
  }, []);

  // Loop the same segment of the showreel the original hero used.
  const [start, end] = site.media.showreelLoop;
  const onLoaded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = start;
    v.play().catch(() => {});
  }, [start]);
  const onTime = useCallback(() => {
    const v = videoRef.current;
    if (v && v.currentTime >= end) v.currentTime = start;
  }, [start, end]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={{ scale: introDone ? 1 : 1.18 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image src={site.media.poster} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
          {playVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              src={site.media.showreel}
              muted
              playsInline
              autoPlay
              preload="metadata"
              aria-hidden
              onLoadedMetadata={onLoaded}
              onTimeUpdate={onTime}
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(10,10,10,0.75),transparent_60%)]" />
      </motion.div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0 overflow-hidden" />

      {/* Content */}
      <motion.div style={{ y: reduce ? 0 : contentY, opacity: fadeOut }} className="container-x relative z-10 flex flex-1 flex-col justify-end pb-24 pt-32 md:pb-24 md:pt-36">
        <motion.p initial="hidden" animate={play} custom={0.05} variants={fade} className="eyebrow mb-6 flex items-center gap-3 text-bone/70 md:mb-10">
          <span className="size-1.5 rounded-full bg-bronze" aria-hidden />
          Colombo, Sri Lanka — Photography · Videography · Strategy
        </motion.p>

        <h1 id="hero-title" className="display-xl text-[clamp(3.4rem,min(12.5vw,16svh),13.5rem)]">
          <span className="sr-only">
            {site.headline.lead} {site.headline.rotating.join(" ")} {site.headline.tail}
          </span>
          <span aria-hidden className="block">
            {[
              <span key="a">{site.headline.lead}</span>,
              <RotatingWord key="b" words={site.headline.rotating} className="serif-accent pr-[0.08em] text-bronze" />,
              <span key="c">{site.headline.tail}</span>,
            ].map((content, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial="hidden" animate={play} custom={i} variants={line}>
                  {content}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p initial="hidden" animate={play} custom={0.25} variants={fade} className="max-w-md text-lg leading-relaxed text-bone/80 md:text-xl">
            {site.tagline}
          </motion.p>
          <motion.div initial="hidden" animate={play} custom={0.35} variants={fade} className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/work">View our work</ButtonLink>
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              data-cursor="play"
              className="group inline-flex items-center gap-3 rounded-full py-4 text-sm tracking-wide text-bone sm:px-4"
            >
              <span className="grid size-11 place-items-center rounded-full border border-bone/30 transition-all duration-500 group-hover:scale-110 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
                <Play aria-hidden className="size-4 translate-x-px fill-current" />
              </span>
              Play showreel
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1, transition: { delay: 1.2 } } : { opacity: 0 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="eyebrow text-[0.62rem] text-bone/60">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-bone"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>

      <ShowreelModal open={reelOpen} onClose={closeReel} />
    </section>
  );
}
