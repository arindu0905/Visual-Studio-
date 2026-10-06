import Image from "next/image";
import type { ReactNode } from "react";
import { photos } from "@/data/photography";
import { cn } from "@/lib/utils";

/** Interleave photos into N columns so each column mixes categories. */
function columns(count: number, perCol: number) {
  const cols: (typeof photos)[] = Array.from({ length: count }, () => []);
  // Prefer portrait/square frames — they tile better in a vertical wall.
  const pool = photos.filter((p) => p.height >= p.width * 0.9);
  for (let i = 0; i < count * perCol; i++) cols[i % count].push(pool[(i * 7) % pool.length]);
  return cols;
}

const speeds = ["70s", "95s", "80s", "105s", "88s"];

/**
 * Full-screen, endlessly drifting wall of photography. Columns scroll in
 * alternating directions at different speeds (pure CSS — zero JS), paused for
 * reduced motion by the global media query.
 */
export function PhotoWall({ children }: { children: ReactNode }) {
  const cols = columns(5, 6);
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink">
      <div aria-hidden className="absolute inset-0 -top-[10%] flex gap-3 px-3 md:gap-5 md:px-5 [transform:rotate(-4deg)_scale(1.18)]">
        {cols.map((col, c) => (
          <div key={c} className={cn("relative flex-1 overflow-hidden", c === 3 && "hidden md:block", c === 4 && "hidden lg:block")}>
            <div
              className="flex animate-[wall_var(--d)_linear_infinite] flex-col gap-3 md:gap-5"
              style={{ "--d": speeds[c], animationDirection: c % 2 ? "reverse" : "normal" } as React.CSSProperties}
            >
              {[...col, ...col].map((p, i) => (
                <div key={`${p.src}-${i}`} className="relative w-full overflow-hidden bg-ink-3" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 34vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/55" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.2),rgba(10,10,10,0.9)_75%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end">{children}</div>
    </section>
  );
}
