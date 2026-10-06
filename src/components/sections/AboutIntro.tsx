import { site } from "@/data/site";
import { asset } from "@/lib/assets";
import { ScrollHighlight } from "@/components/animations/ScrollHighlight";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="relative py-28 md:py-44">
      <div className="container-x">
        <SectionLabel index="01">About us</SectionLabel>
        <h2 id="about-title" className="sr-only">
          About Visual Studios Plus
        </h2>

        <ScrollHighlight
          text={site.about.statement}
          accent={["content", "creation", "curation"]}
          className="mt-10 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6.4vw,7rem)] font-medium leading-[0.98] tracking-[-0.04em]"
        />

        <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-7">
            <ParallaxImage
              src={asset("D85_2304.webp")}
              alt="Hotel suite interior photographed by Visual Studios Plus"
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] w-full"
            />
            <div className="absolute -bottom-16 right-4 w-[42%] border-[6px] border-ink bg-ink md:-bottom-24 md:-right-16 md:w-[38%] md:border-[10px]">
              <ParallaxImage
                src={asset("Tiesh-7077-1.webp")}
                alt="Fashion portrait photographed by Visual Studios Plus"
                sizes="(min-width: 768px) 22vw, 45vw"
                strength={18}
                className="aspect-[3/4] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
            <Reveal>
              <p className="text-lg leading-relaxed text-bone/75 md:text-xl">{site.about.body}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
              <div>
                <p className="eyebrow mb-2">Disciplines</p>
                <p className="text-bone/80">Photography, Videography, Strategy</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Based in</p>
                <p className="text-bone/80">Colombo, Sri Lanka</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="/about" variant="outline">
                More about the studio
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
