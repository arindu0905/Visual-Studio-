import { services } from "@/data/services";
import { ServiceList } from "@/components/services/ServiceList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

export function ServicesSection() {
  return (
    <section data-clip="Services" aria-labelledby="services-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="03">Capabilities overview</SectionLabel>
            <SplitText as="h2" id="services-title" text="One full-service studio. Zero creative fragmentation." className="display-lg mt-8" />
          </div>
          <Reveal className="self-end md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-bone/70">
              Need a custom agency retainer or dedicated production team? We work on project-by-project commissions and full-year creative retainers.
            </p>
          </Reveal>
        </div>
        <ServiceList services={services} />
      </div>
    </section>
  );
}
