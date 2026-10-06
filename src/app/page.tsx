import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { PhotoReel } from "@/components/portfolio/PhotoReel";
import { ShowreelBand } from "@/components/sections/ShowreelBand";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";
import { site, socials } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: site.media.logo,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address[0],
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  sameAs: socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <AboutIntro />
      <ServicesSection />
      <SelectedWork />
      <PhotoReel />
      <ShowreelBand />
      <Clients />
      <CTA />
    </>
  );
}
