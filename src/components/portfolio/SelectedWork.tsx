import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/animations/Reveal";

/** Asymmetric editorial layout — sizes and offsets vary per slot. */
const layout = [
  { col: "md:col-span-8", aspect: "aspect-[16/10]", sizes: "(min-width: 768px) 64vw, 100vw" },
  { col: "md:col-span-4 md:mt-[22vw]", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 32vw, 100vw" },
  { col: "md:col-span-5 md:col-start-2 md:-mt-[6vw]", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { col: "md:col-span-6 md:col-start-7 md:mt-[12vw]", aspect: "aspect-[16/11]", sizes: "(min-width: 768px) 48vw, 100vw" },
];

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-8 md:mb-28 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="03">Selected work</SectionLabel>
            <SplitText as="h2" id="work-title" text="Latest projects" className="display-lg mt-8" />
          </div>
          <Reveal className="max-w-sm">
            <p className="text-bone/65">
              We’re passionate about video production — a full scale production team in house, from first frame to final cut.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-0">
          {projects.map((p, i) => {
            const l = layout[i % layout.length];
            return <ProjectCard key={p.slug} project={p} index={i} aspect={l.aspect} sizes={l.sizes} className={l.col} />;
          })}
        </div>

        <div className="mt-24 flex justify-center md:mt-36">
          <ButtonLink href="/work" variant="outline">
            View all work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
