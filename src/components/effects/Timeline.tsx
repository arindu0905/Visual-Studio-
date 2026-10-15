"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Clip = { label: string; start: number; end: number }; // fractions of the scrollable length

const FPS = 25;
const PX_PER_SECOND = 120; // scroll distance that equals one second of "runtime"

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
function timecode(seconds: number) {
  const s = Math.max(0, seconds);
  const frames = Math.floor((s % 1) * FPS);
  return `${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}:${pad(frames)}`;
}

/**
 * The page as an edit timeline: a live timecode and playhead follow the scroll,
 * and every section tagged `data-clip="Label"` becomes a clip you can click to
 * jump to. Desktop only; hidden while a modal or menu locks the page.
 */
export function Timeline() {
  const pathname = usePathname();
  const [clips, setClips] = useState<Clip[]>([]);
  const [progress, setProgress] = useState(0);
  const [runtime, setRuntime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const idle = useRef<number | undefined>(undefined);

  // Map sections to clips (re-measured on resize and when the page changes height).
  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const els = Array.from(document.querySelectorAll<HTMLElement>("main [data-clip]"));
      setClips(
        els.map((el) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          return {
            label: el.dataset.clip ?? "",
            start: Math.min(1, Math.max(0, (top - window.innerHeight * 0.3) / max)),
            end: Math.min(1, Math.max(0, (top + el.offsetHeight - window.innerHeight * 0.3) / max)),
          };
        }),
      );
      setRuntime(max / PX_PER_SECOND);
    };
    measure();
    const t = window.setTimeout(measure, 800); // after images and fonts settle
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      setPlaying(true);
      window.clearTimeout(idle.current);
      idle.current = window.setTimeout(() => setPlaying(false), 400);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    setPlaying(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const jump = (fraction: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.max(0, fraction * max);
    if (window.__lenis) window.__lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const active = clips.findIndex((c) => progress >= c.start && progress < c.end);
  const current = active >= 0 ? clips[active].label : clips[0]?.label;

  return (
    <div
      aria-label="Page timeline"
      role="navigation"
      className="group/tl pointer-events-auto fixed bottom-5 right-5 z-[60] hidden w-[13.5rem] rounded-2xl border border-line bg-ink/75 px-3.5 py-2.5 font-mono text-bone shadow-2xl backdrop-blur-xl transition-[width,padding] duration-500 ease-[var(--ease-expo)] focus-within:w-[19rem] focus-within:py-3.5 hover:w-[19rem] hover:py-3.5 lg:block"
    >
      <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.12em]">
        <span className="flex items-center gap-2 text-bone/70">
          <span className={cn("size-1.5 rounded-full", playing ? "animate-pulse bg-red-500" : "bg-bone/40")} aria-hidden />
          {playing ? "Play" : "Pause"} · V1 · {current ?? "—"}
        </span>
        <span className="hidden text-bone/50 group-hover/tl:inline">{FPS}fps</span>
      </div>
      <p className="mt-1 text-base font-bold tabular-nums tracking-tight text-bone transition-[font-size] duration-500 group-hover/tl:text-xl" aria-live="off">
        <span className="text-bronze">TC</span> {timecode(progress * runtime)}
      </p>

      {/* Clip track: revealed on hover/focus so the panel stays out of the way */}
      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] group-focus-within/tl:grid-rows-[1fr] group-focus-within/tl:opacity-100 group-hover/tl:grid-rows-[1fr] group-hover/tl:opacity-100">
      <div className="overflow-hidden">
      <div className="relative mt-3 h-8">
        <div className="absolute inset-0 overflow-hidden rounded-md bg-ink-3">
          {clips.map((c, i) => (
            <button
              key={`${c.label}-${i}`}
              type="button"
              onClick={() => jump(c.start + 0.0005)}
              title={c.label}
              aria-label={`Jump to ${c.label}`}
              className={cn(
                "group/clip absolute inset-y-0 min-w-[3px] overflow-hidden border-r border-ink text-left transition-colors",
                i === active ? "bg-bronze/25" : i % 2 ? "bg-bone/[0.07] hover:bg-bone/15" : "bg-bone/[0.12] hover:bg-bone/20",
              )}
              style={{ left: `${c.start * 100}%`, width: `${Math.max(0, (c.end - c.start) * 100)}%` }}
            >
              <span className={cn("absolute inset-x-1 top-1 truncate text-[0.55rem] uppercase tracking-[0.08em]", i === active ? "text-bronze" : "text-bone/50")}>
                {c.label}
              </span>
            </button>
          ))}
        </div>
        {/* Playhead */}
        <div className="pointer-events-none absolute -bottom-1 -top-1 w-0.5 bg-bronze shadow-[0_0_10px_rgba(223,255,36,0.7)]" style={{ left: `${progress * 100}%` }}>
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-bronze" />
        </div>
      </div>
      <div className="mt-1.5 flex justify-between text-[0.55rem] tabular-nums text-bone/40">
        <span>00:00:00:00</span>
        <span>{timecode(runtime)}</span>
      </div>
      </div>
      </div>
    </div>
  );
}
