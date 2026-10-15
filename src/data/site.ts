import { asset } from "@/lib/assets";

export const site = {
  name: "Visual Studios Plus",
  shortName: "Visual Studios +",
  url: "https://visualstudiosplus.com",
  tagline: "We create content meant to be experienced. Not simply consumed.",
  eyebrow: "Visual Studios+ · Creative Agency",
  intro:
    "Colombo’s premier digital marketing, social media campaigns, and content creation agency. We partner with ambitious brands to command attention and deliver verified commercial growth.",
  headline: { lead: "We create content", rotating: ["that moves"], tail: "brands." },
  description:
    "Visual Studios Plus is a Colombo-based content creation and curation digital marketing agency — photography, videography, social, paid media, CGI and branding strategy.",
  about: {
    statement: "Premier content creation and curation agency based in Colombo.",
    body: "Visual Studios Plus has earned an industry-leading reputation for exceptional work in commercial videography, advertising photography, and social viral content creation, specializing in competitive consumer sectors such as FMCG, Food & Beverage, Fashion, and Luxury Hospitality.",
  },
  videography: {
    statement: "Cinema-grade visual storytelling engineered to stop the infinite scroll and command cultural attention.",
    manifesto: ["We create.", "We strategize.", "We execute.", "We amplify.", "We measure.", "We grow."],
  },
  contact: {
    email: "info@visualstudiosplus.com",
    phones: ["+94 74 043 6639", "+94 74 043 5332"],
    address: ["Level 1, 36 Haig Road", "Colombo 04", "Sri Lanka"],
  },
  media: {
    logo: asset("VSP-Square-logo.png"),
    showreel: asset("Sequence-01.mp4"),
    /** The original hero loops this segment of the showreel (seconds). */
    showreelLoop: [63, 80] as const,
    poster: asset("Cover.jpeg"),
  },
} as const;

export type Social = { label: string; href: string };

/** Social channels as linked from the demo site (plus the verified Facebook page). */
export const socials: Social[] = [
  { label: "YouTube", href: "https://www.youtube.com/@visualstudiosplus" },
  { label: "Instagram", href: "https://instagram.com/visualstudiosplus" },
  { label: "LinkedIn", href: "https://linkedin.com/company/visualstudiosplus" },
  { label: "Behance", href: "https://behance.net/visualstudiosplus" },
  { label: "Facebook", href: "https://www.facebook.com/visualstudiosplus/" },
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
