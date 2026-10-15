import type { CaseStudy } from "@/data/cases";
import { Reveal } from "@/components/animations/Reveal";
import { cn, pad } from "@/lib/utils";

/** Text-only case study rows: client, title and tags, with the headline result on the right. */
export function CaseList({ items, summary, className }: { items: CaseStudy[]; summary?: boolean; className?: string }) {
  return (
    <ol className={cn("border-b border-line", className)}>
      {items.map((c, i) => (
        <Reveal as="li" key={c.title} y={20} className="group relative grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-bone/[0.03] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
          />
          <div className="relative md:col-span-3">
            <p className="eyebrow">{[c.type, c.year].filter(Boolean).join(" · ")}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.05em] text-bronze">{c.client}</p>
          </div>
          <div className="relative md:col-span-6">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-[-0.03em] md:text-3xl">{c.title}</h3>
            <p className="mt-2 text-bone/60">{c.tagline}</p>
            {summary && c.summary && <p className="mt-5 max-w-2xl leading-relaxed text-bone/70">{c.summary}</p>}
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-bone/70">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative md:col-span-3 md:text-right">
            {c.metric ? (
              <>
                <p className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em] text-bronze md:text-5xl">{c.metric}</p>
                <p className="mt-2 text-sm text-bone/55">{c.metricLabel}</p>
              </>
            ) : (
              <p className="text-xs tabular-nums text-stone">{pad(i + 1)}</p>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
