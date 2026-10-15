import Image from "next/image";
import type { ReactNode } from "react";
import { clients, type Client } from "@/data/clients";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

function Row({ items, reverse }: { items: Client[]; reverse?: boolean }) {
  // The list is rendered twice so the -50% keyframe loops seamlessly.
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className={cn("flex shrink-0 animate-marquee items-center group-hover/row:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}
        style={{ "--marquee-duration": "48s" } as React.CSSProperties}
      >
        {[...items, ...items].map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= items.length}
            className="group/logo flex h-28 w-44 shrink-0 flex-col items-center justify-center px-5 md:h-40 md:w-72 md:px-8"
          >
            <div className="relative h-full w-full">
              <Image
                src={c.logo}
                alt={i < items.length ? c.name : ""}
                fill
                sizes="(min-width: 768px) 160px, 112px"
                className={cn(
                  "object-contain py-3 opacity-70 transition-all duration-500 group-hover/logo:opacity-100 md:py-4",
                  // White silhouettes on the dark band; solid-shape logos keep their colours.
                  c.color ? "grayscale group-hover/logo:grayscale-0" : "brightness-0 invert",
                )}
              />
            </div>
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-stone transition-colors duration-500 group-hover/logo:text-bronze">
              {c.sector}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Clients({
  title,
  text = "From global FMCG giants to boutique luxury houses across Sri Lanka & international markets.",
}: {
  title?: ReactNode;
  text?: string;
}) {
  const half = Math.ceil(clients.length / 2);
  return (
    <section data-clip="Clients" aria-labelledby="clients-title" className="relative border-y border-line bg-ink-2 py-24 md:py-32">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <SectionLabel index="09">Commercial client roster</SectionLabel>
          <h2 id="clients-title" className="display-md mt-6 max-w-[18ch]">
            {title ?? (
              <>
                Trusted by market leaders <span className="serif-accent text-bronze">&amp;</span> global brands
              </>
            )}
          </h2>
        </div>
        <p className="max-w-xs text-sm text-bone/60">{text}</p>
      </div>
      <div className="space-y-2">
        <Row items={clients.slice(0, half)} />
        <Row items={clients.slice(half)} reverse />
      </div>
    </section>
  );
}
