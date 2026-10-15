"use client";

import { useEffect, useRef, useState } from "react";
import { ROLL, useContactSheet } from "./ContactSheet";
import { cn } from "@/lib/utils";

const STOPS = ["1.4", "2", "2.8", "4", "5.6", "8", "11", "16"];
const SHUTTERS = ["1/30", "1/60", "1/125", "1/250", "1/500", "1/1000", "1/2000"];
const ISOS = [100, 200, 400, 800, 1600];

/**
 * Over any photo marked `data-shot`, the cursor becomes a camera viewfinder:
 * focus brackets, a live exposure readout that changes as you move, and an
 * autofocus lock when you hold still. Press S (or the shutter button on the
 * photo) to shoot it onto your contact sheet. Mouse/trackpad only.
 */
export function Viewfinder() {
  const sheet = useContactSheet();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [locked, setLocked] = useState(false);
  const [exposure, setExposure] = useState({ f: "2.8", s: "1/250", iso: 200 });
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let lockTimer = 0;
    const cur = { x: -200, y: -200 };
    const tgt = { x: -200, y: -200 };

    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.3;
      cur.y += (tgt.y - cur.y) * 0.3;
      if (ref.current) ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-shot]") : null;
      if (el !== targetRef.current) {
        targetRef.current = el;
        setTarget(el);
        if (el) {
          cur.x = tgt.x = e.clientX;
          cur.y = tgt.y = e.clientY;
        }
      }
      if (!el) return;
      tgt.x = e.clientX;
      tgt.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);

      // Exposure follows where you point: brighter areas (top) get faster shutters.
      const r = el.getBoundingClientRect();
      const fx = Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width));
      const fy = Math.min(0.999, Math.max(0, (e.clientY - r.top) / r.height));
      setExposure({ f: STOPS[Math.floor(fx * STOPS.length)], s: SHUTTERS[SHUTTERS.length - 1 - Math.floor(fy * SHUTTERS.length)], iso: ISOS[Math.floor(((fx + fy) / 2) * ISOS.length)] });

      // Autofocus locks after holding still briefly.
      setLocked(false);
      window.clearTimeout(lockTimer);
      lockTimer = window.setTimeout(() => setLocked(true), 260);
    };

    const key = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (targetRef.current && sheet) {
        e.preventDefault();
        sheet.shoot(targetRef.current);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", key);
      cancelAnimationFrame(raf);
      window.clearTimeout(lockTimer);
    };
  }, [enabled, sheet]);

  if (!enabled) return null;
  const count = sheet?.frames.length ?? 0;
  const shot = !!target && !!sheet?.frames.some((f) => f.src === target.dataset.shot);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[101]">
      <div
        className={cn(
          "relative -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-300 ease-[var(--ease-expo)]",
          target ? "opacity-100" : "opacity-0",
          locked ? "h-[100px] w-[150px]" : "h-[118px] w-[176px]",
        )}
      >
        {/* Corner brackets */}
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
          <span key={c} className={cn("absolute size-5 transition-colors duration-300", c, locked ? "border-bronze" : "border-bone")} />
        ))}
        {/* Focus point */}
        <span className={cn("absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 border transition-colors", locked ? "border-bronze" : "border-bone/70")} />
        <span className={cn("absolute right-2 top-2 font-mono text-[0.55rem] font-bold", locked ? "text-bronze" : "text-bone/80")}>{locked ? "AF ●" : "AF"}</span>
        <span className="absolute left-2 top-2 font-mono text-[0.55rem] text-bone/80">
          {String(count).padStart(2, "0")}/{ROLL}
        </span>

        {/* Exposure readout */}
        <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 gap-3 whitespace-nowrap rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.6rem] text-bone backdrop-blur">
          <span>f/{exposure.f}</span>
          <span>{exposure.s}</span>
          <span>ISO {exposure.iso}</span>
          <span className="text-bronze">{shot ? "✓ ON SHEET" : "S · SHOOT"}</span>
        </div>
      </div>
    </div>
  );
}

/** Round shutter button placed on a photo; works with touch too. */
export function ShutterButton({ className, tabIndex }: { className?: string; tabIndex?: number }) {
  const sheet = useContactSheet();
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label="Add this photo to your contact sheet"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const el = (e.currentTarget.parentElement?.querySelector("[data-shot]") ?? e.currentTarget.closest("[data-shot]")) as HTMLElement | null;
        if (el && sheet) sheet.shoot(el);
      }}
      className={cn(
        "absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-bone/40 bg-ink/60 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-bronze",
        "opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
    >
      <span className="block size-5 rounded-full border-2 border-bone p-0.5">
        <span className="block size-full rounded-full bg-bronze" />
      </span>
    </button>
  );
}
