import Link from "next/link";
import type { Project } from "@/data/projects";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { cn, pad } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
  aspect?: string;
  sizes: string;
  className?: string;
};

export function ProjectCard({ project, index, aspect = "aspect-[16/10]", sizes, className }: Props) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/work/${project.slug}`} data-cursor="view" data-distort-root className="block" aria-label={`${project.title} — ${project.category}`}>
        <div className="relative overflow-hidden">
          <ParallaxImage
            src={project.cover}
            alt={project.coverAlt}
            sizes={sizes}
            strength={8}
            distort
            className={cn(aspect, "w-full")}
            imgClassName={cn(
              "transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]",
              project.letterboxed && "scale-[1.32] group-hover:scale-[1.38]",
            )}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15" />
          <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bone backdrop-blur-md md:left-6 md:top-6">
            Film
          </span>
        </div>
        <Reveal y={20} className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover:text-bronze md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-bone/55">{project.category}</p>
          </div>
          <span className="pt-2 text-xs tabular-nums text-stone">{pad(index + 1)}</span>
        </Reveal>
      </Link>
    </article>
  );
}
