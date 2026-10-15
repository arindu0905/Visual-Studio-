"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { cn, EASE } from "@/lib/utils";

export type Frame = { src: string; alt: string };

type Ctx = {
  frames: Frame[];
  /** Shoot the photo inside `el` (an element with data-shot): flash, shutter sound, add to the sheet. */
  shoot: (el: HTMLElement) => void;
  remove: (src: string) => void;
  clear: () => void;
};

const ContactSheetContext = createContext<Ctx | null>(null);
export const useContactSheet = () => useContext(ContactSheetContext);

const KEY = "vsp-contact-sheet";
export const ROLL = 36;

/** A short mechanical shutter: two filtered noise clicks. */
let audio: AudioContext | null = null;
function shutterSound() {
  try {
    audio ??= new AudioContext();
    const ctx = audio;
    const click = (at: number, gain: number) => {
      const len = Math.floor(ctx.sampleRate * 0.035);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2400;
      const g = ctx.createGain();
      g.gain.value = gain;
      src.connect(filter).connect(g).connect(ctx.destination);
      src.start(ctx.currentTime + at);
    };
    click(0, 0.22);
    click(0.07, 0.14);
  } catch {
    /* audio is a nicety */
  }
}

function flash(rect: DOMRect) {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    background: "#fff",
    zIndex: "95",
    pointerEvents: "none",
    opacity: "0.85",
    transition: "opacity 380ms ease-out",
  });
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => (el.style.opacity = "0")));
  window.setTimeout(() => el.remove(), 450);
}

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState<{ frame: Frame; rect: DOMRect; key: number } | null>(null);
  const [pulse, setPulse] = useState(0);
  const trayRef = useRef<HTMLButtonElement>(null);
  // Saved frames are restored after hydration; only start saving once that has happened,
  // otherwise the initial empty list would overwrite them.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setFrames(saved.slice(0, ROLL));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(frames));
    } catch {}
  }, [frames, ready]);

  const shoot = useCallback((el: HTMLElement) => {
    const src = el.dataset.shot;
    if (!src) return;
    const frame = { src, alt: el.dataset.shotAlt ?? "" };
    const rect = el.getBoundingClientRect();
    flash(rect);
    shutterSound();
    setFrames((cur) => (cur.some((f) => f.src === src) || cur.length >= ROLL ? cur : [...cur, frame]));
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setFlight({ frame, rect, key: Date.now() });
    else setPulse((p) => p + 1);
  }, []);

  const remove = useCallback((src: string) => setFrames((cur) => cur.filter((f) => f.src !== src)), []);
  const clear = useCallback(() => setFrames([]), []);

  const target = trayRef.current?.getBoundingClientRect();

  return (
    <ContactSheetContext.Provider value={{ frames, shoot, remove, clear }}>
      {children}

      {/* The shot flies from the photo into the contact sheet */}
      <AnimatePresence>
        {flight && (
          <motion.img
            key={flight.key}
            src={flight.frame.src}
            alt=""
            aria-hidden
            className="pointer-events-none fixed z-[96] object-cover shadow-2xl"
            initial={{ left: flight.rect.left, top: flight.rect.top, width: flight.rect.width, height: flight.rect.height, opacity: 1, rotate: 0 }}
            animate={{
              left: target ? target.left + 8 : 24,
              top: target ? target.top - 70 : window.innerHeight - 120,
              width: 96,
              height: 64,
              opacity: [1, 1, 0],
              rotate: -6,
            }}
            transition={{ duration: 0.85, ease: EASE }}
            onAnimationComplete={() => {
              setFlight(null);
              setPulse((p) => p + 1);
            }}
          />
        )}
      </AnimatePresence>

      <Tray frames={frames} open={open} setOpen={setOpen} remove={remove} clear={clear} pulse={pulse} buttonRef={trayRef} />
    </ContactSheetContext.Provider>
  );
}

/** A row of film sprocket holes. */
function Sprockets() {
  return (
    <div
      aria-hidden
      className="h-3 w-full"
      style={{
        backgroundImage: "linear-gradient(90deg, #0b0b0a 0 55%, transparent 55%)",
        backgroundSize: "18px 6px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "4px center",
      }}
    />
  );
}

function Tray({
  frames,
  open,
  setOpen,
  remove,
  clear,
  pulse,
  buttonRef,
}: {
  frames: Frame[];
  open: boolean;
  setOpen: (v: boolean) => void;
  remove: (src: string) => void;
  clear: () => void;
  pulse: number;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const has = frames.length > 0;

  return (
    <div className={cn("fixed bottom-5 left-5 z-[60] transition-opacity duration-500", has ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!has}>
      <AnimatePresence>
        {open && has && (
          <motion.div
            id="contact-sheet"
            role="dialog"
            aria-label="Your contact sheet"
            className="absolute bottom-14 left-0 w-[min(92vw,40rem)] overflow-hidden rounded-2xl border border-line bg-[#0b0b0a] shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-4 pt-3.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-bone/60">
              <span>
                Contact sheet · <span className="text-bronze">{String(frames.length).padStart(2, "0")}</span> / {ROLL} exp
              </span>
              <button type="button" onClick={clear} className="hover:text-bone">
                Clear roll
              </button>
            </div>

            {/* Film strip with sprocket holes */}
            <div className="mt-3 overflow-x-auto bg-[#141412] [scrollbar-width:thin]">
              <Sprockets />
              <ul className="flex w-max gap-2 px-3 py-1">
                {frames.map((f, i) => (
                  <li key={f.src} className="group/frame relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src} alt={f.alt} className="h-20 w-28 object-cover" loading="lazy" />
                    <span className="absolute -bottom-0.5 left-1 font-mono text-[0.55rem] text-bronze/80">{i + 1}A ▸</span>
                    <button
                      type="button"
                      onClick={() => remove(f.src)}
                      aria-label={`Remove frame ${i + 1}`}
                      className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-ink/80 text-bone opacity-0 transition-opacity group-hover/frame:opacity-100 focus:opacity-100"
                    >
                      <X aria-hidden className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <Sprockets />
            </div>

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-bone/65">Frames you like become references for your brief.</p>
              <Link
                href="/contact#brief"
                onClick={() => setOpen(false)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-bronze px-5 py-2.5 text-xs font-bold uppercase tracking-[0.05em] text-ink"
              >
                Send to the studio →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="contact-sheet"
        tabIndex={has ? 0 : -1}
        key={pulse}
        initial={pulse ? { scale: 1.12 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center gap-3 rounded-full border border-line bg-ink/80 py-2 pl-2 pr-4 text-xs font-bold uppercase tracking-[0.05em] text-bone shadow-2xl backdrop-blur-xl"
      >
        <span className="flex -space-x-3">
          {frames.slice(-3).map((f) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f.src} src={f.src} alt="" className="size-8 rounded-full border-2 border-ink object-cover" />
          ))}
        </span>
        Contact sheet
        <span className="rounded-full bg-bronze px-2 py-0.5 font-mono text-ink">{frames.length}</span>
      </motion.button>
    </div>
  );
}
