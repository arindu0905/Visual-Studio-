import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { VideoEmbed } from "@/components/portfolio/VideoEmbed";
import { CTA } from "@/components/sections/CTA";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "video.other",
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: project.cover, width: 1280, height: 720, alt: project.coverAlt }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const index = projects.findIndex((p) => p.slug === slug);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Discipline", value: project.discipline },
    { label: "Format", value: project.category },
  ];

  return (
    <>
      <article>
        <header className="pb-14 pt-32 md:pb-20 md:pt-44">
          <div className="container-x">
            <Reveal y={10}>
              <Link href="/work" className="group eyebrow inline-flex items-center gap-2 text-bone/70 hover:text-bone">
                <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" />
                All work
              </Link>
            </Reveal>
            <p className="eyebrow mt-10 text-bronze">
              Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <SplitText as="h1" trigger="mount" delay={0.1} text={project.title} className="display-lg mt-6 max-w-[16ch]" />

            <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
              {meta.map((m, i) => (
                <Reveal key={m.label} delay={0.3 + i * 0.06}>
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-2 text-bone/85">{m.value}</dd>
                </Reveal>
              ))}
              <Reveal delay={0.5}>
                <dt className="eyebrow">Watch</dt>
                <dd className="mt-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-bone/85 hover:text-bone"
                  >
                    YouTube <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </dd>
              </Reveal>
            </dl>
          </div>
        </header>

        <Reveal y={60} className="container-x">
          <VideoEmbed id={project.youtubeId} title={`${project.title} — ${site.name}`} poster={project.cover} letterboxed={project.letterboxed} />
        </Reveal>

        <section className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <p className="eyebrow md:col-span-3">The project</p>
          <SplitText
            as="p"
            text={project.summary}
            className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] md:col-span-9"
            stagger={0.025}
          />
        </section>
      </article>

      {/* Next project */}
      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} data-cursor="view" className="group relative block overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={next.cover}
              alt=""
              fill
              sizes="100vw"
              className={cn(
                "object-cover opacity-30 grayscale transition-all duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0",
                next.letterboxed && "scale-[1.32] group-hover:scale-[1.38]",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
          </div>
          <div className="container-x relative py-28 md:py-44">
            <p className="eyebrow">Next project</p>
            <p className="display-lg mt-6 max-w-[16ch] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4">{next.title}</p>
            <p className="mt-4 text-bone/60">{next.category}</p>
          </div>
        </Link>
      </nav>

      <CTA />
    </>
  );
}
