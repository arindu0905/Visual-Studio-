"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight YouTube embed: shows the poster frame and only loads the
 * (privacy-enhanced) player once the visitor presses play.
 */
export function VideoEmbed({ id, title, poster, letterboxed }: { id: string; title: string; poster: string; letterboxed?: boolean }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} data-cursor="play" aria-label={`Play film: ${title}`} className="group absolute inset-0">
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn("object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]", letterboxed && "scale-[1.32] group-hover:scale-[1.36]")}
          />
          <span aria-hidden className="absolute inset-0 bg-ink/25 transition-colors duration-700 group-hover:bg-ink/10" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-bone text-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110 md:size-28">
              <Play aria-hidden className="size-6 translate-x-0.5 fill-current md:size-8" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
