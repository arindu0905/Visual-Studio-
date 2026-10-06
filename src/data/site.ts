import { asset } from "@/lib/assets";

export const site = {
  name: "Visual Studios Plus",
  shortName: "Visual Studios +",
  url: "https://visualstudiosplus.com",
  tagline: "We create content meant to be experienced. Not simply consumed.",
  headline: { lead: "The", rotating: ["Digital", "Creative", "Marketing"], tail: "Agency" },
  description:
    "Visual Studios Plus is a Colombo-based content creation and curation digital marketing agency — photography, videography, social, paid media and branding strategy.",
  about: {
    statement: "We are Colombo’s leading content creation and curation digital marketing agency.",
    body: "Partnering with ambitious startups and established brands, we utilise Visual Content to create a positive brand presence in the new retail landscape.",
  },
  videography: {
    statement:
      "We’re passionate about video production. We have a full scale production team in house to deliver an outstanding outcome consistently.",
    manifesto: ["We make it smart.", "We make it beautiful.", "We have fun."],
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

/**
 * Only links that could be verified are listed. The current site also shows
 * Instagram, Pinterest and X icons but without URLs — add them here when known.
 */
export const socials: Social[] = [
  { label: "Behance", href: "https://www.behance.net/visual-studios" },
  { label: "YouTube", href: "https://www.youtube.com/@visualstudiosplus" },
  { label: "Facebook", href: "https://www.facebook.com/visualstudiosplus/" },
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
