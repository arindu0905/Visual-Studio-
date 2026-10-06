import Image from "next/image";
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
          <li key={`${c.name}-${i}`} aria-hidden={i >= items.length} className="flex h-24 w-44 shrink-0 items-center justify-center px-5 md:h-36 md:w-72 md:px-8">
            <div className="relative h-full w-full">
              <Image
                src={c.logo}
                alt={i < items.length ? c.name : ""}
                fill
                sizes="(min-width: 768px) 160px, 112px"
                className="object-contain py-4 opacity-80 mix-blend-multiply grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:py-5"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Clients() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section aria-labelledby="clients-title" className="relative bg-bone py-24 text-ink md:py-32">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <SectionLabel index="06">Clients</SectionLabel>
          <h2 id="clients-title" className="display-md mt-6">
            Trusted clients <span className="serif-accent text-[#8a6a52]">&amp;</span> partners
          </h2>
        </div>
        <p className="max-w-xs text-sm text-ink/60">Hospitality, food, beauty and global brands that have trusted Visual Studios Plus.</p>
      </div>
      <div className="space-y-2">
        <Row items={clients.slice(0, half)} />
        <Row items={clients.slice(half)} reverse />
      </div>
    </section>
  );
}
