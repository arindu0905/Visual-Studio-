import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function CTA({ title = "Let’s create something worth experiencing." }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.07] blur-[120px]" />
      <div className="container-x relative">
        <p className="eyebrow mb-10 flex items-center gap-3">
          <span className="size-1.5 animate-pulse rounded-full bg-bronze" aria-hidden />
          Have a project in mind?
        </p>
        <SplitText as="h2" id="cta-title" text={title} className="display-xl max-w-[12ch]" stagger={0.08} />

        <div className="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <a
              href={`mailto:${site.contact.email}`}
              className="group inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(1.4rem,3.4vw,3rem)] font-medium tracking-[-0.03em]"
            >
              <span className="link-underline pb-1">{site.contact.email}</span>
              <ArrowUpRight aria-hidden className="size-[0.9em] text-bronze transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-bone/55">
              {site.contact.phones.join("  ·  ")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/contact" className="px-9 py-5 text-base">
              Start a project
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
