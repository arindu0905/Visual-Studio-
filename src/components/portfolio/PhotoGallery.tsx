"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { photoCategories, photos, type PhotoCategoryId } from "@/data/photography";
import { cn, EASE } from "@/lib/utils";

type Filter = "all" | PhotoCategoryId;
const PAGE = 24;

export function PhotoGallery({ initial = "all" }: { initial?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const list = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.category === filter)), [filter]);
  const shown = list.slice(0, visible);

  const choose = (f: Filter) => {
    setFilter(f);
    setVisible(PAGE);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", f);
    window.history.replaceState(null, "", url);
  };

  const tabs: Array<{ id: Filter; label: string; count: number }> = [
    { id: "all", label: "All", count: photos.length },
    ...photoCategories.map((c) => ({ id: c.id, label: c.label, count: photos.filter((p) => p.category === c.id).length })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter photographs by category" className="sticky top-16 z-20 -mx-5 mb-10 flex gap-1 overflow-x-auto border-b border-line bg-ink/80 px-5 py-3 backdrop-blur-xl [scrollbar-width:none] md:mx-0 md:mb-14 md:px-0 [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={filter === t.id}
            onClick={() => choose(t.id)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300",
              filter === t.id ? "text-ink" : "text-bone/65 hover:text-bone",
            )}
          >
            {filter === t.id && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.5, ease: EASE }} />}
            <span className="relative">
              {t.label} <span className={cn("ml-1 text-xs", filter === t.id ? "text-ink/60" : "text-stone")}>{t.count}</span>
            </span>
          </button>
        ))}
      </div>

      <motion.ul key={filter} aria-label={`${tabs.find((t) => t.id === filter)?.label} photographs`} className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
        {shown.map((p, i) => (
          <motion.li
            key={p.src}
            className="mb-4 break-inside-avoid md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.06 }}
          >
            <button
              type="button"
              onClick={() => setLightbox(i)}
              data-cursor="view"
              aria-label={`Open ${p.alt}`}
              className="group relative block w-full overflow-hidden bg-ink-3"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-10 text-xs uppercase tracking-[0.2em] text-bone transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0">
                {photoCategories.find((c) => c.id === p.category)?.short}
                <span className="tabular-nums text-bone/70">{String(i + 1).padStart(3, "0")}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {visible < list.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-full border border-bone/25 px-8 py-4 text-sm tracking-wide transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink"
          >
            Load more <span className="text-stone">({list.length - visible} remaining)</span>
          </button>
        </div>
      )}

      <Lightbox items={list} index={lightbox} onChange={setLightbox} />
    </>
  );
}

function Lightbox({ items, index, onChange }: { items: typeof photos; index: number | null; onChange: (i: number | null) => void }) {
  const [mounted, setMounted] = useState(false);
  const [dir, setDir] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onChange]);

  if (!mounted) return null;
  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container-x flex h-20 shrink-0 items-center justify-between">
            <p className="eyebrow tabular-nums text-bone/70" aria-live="polite">
              {String(index + 1).padStart(3, "0")} / {String(items.length).padStart(3, "0")} —{" "}
              {photoCategories.find((c) => c.id === item.category)?.label}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-bone hover:text-ink"
            >
              Close <X aria-hidden className="size-4" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={() => onChange(null)}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.src}
                custom={dir}
                className="absolute inset-0 px-4 pb-6 md:px-24 md:pb-10"
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.6, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <div className="relative size-full" onClick={(e) => e.stopPropagation()}>
                  <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" draggable={false} />
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Previous photograph"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-bone/20 bg-ink/40 transition-colors hover:bg-bone hover:text-ink md:grid"
            >
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next photograph"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-bone/20 bg-ink/40 transition-colors hover:bg-bone hover:text-ink md:grid"
            >
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
