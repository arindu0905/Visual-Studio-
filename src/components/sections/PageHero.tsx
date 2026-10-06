import type { ReactNode } from "react";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Shared typographic header for inner pages. */
export function PageHero({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative pb-16 pt-36 md:pb-24 md:pt-52">
      <div className="container-x">
        <Reveal y={12}>
          <p className="eyebrow flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-bronze" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <SplitText as="h1" trigger="mount" delay={0.15} text={title} className="display-xl mt-8 max-w-[14ch]" />
        {(intro || children) && (
          <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
            {intro && (
              <Reveal delay={0.5} className="md:col-span-5 md:col-start-8">
                <div className="text-lg leading-relaxed text-bone/70 md:text-xl">{intro}</div>
              </Reveal>
            )}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
