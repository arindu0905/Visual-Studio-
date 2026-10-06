import { asset } from "@/lib/assets";

export type Service = {
  slug: string;
  title: string;
  /** Short line used in lists. Editable copy — the live site lists these services without descriptions. */
  summary: string;
  /** What falls under the service, taken from the work on the current site. */
  scope: string[];
  image: string;
  imageAlt: string;
  href?: string;
};

export const services: Service[] = [
  {
    slug: "videography",
    title: "Videography",
    summary:
      "A full scale production team in house — from concept and shoot to edit — for films that are smart, beautiful and made with care.",
    scope: ["Hospitality films", "Food films", "Product launch campaigns", "Corporate films"],
    image: "https://i.ytimg.com/vi/d-_dQ9-LmxE/maxresdefault.jpg",
    imageAlt: "Chef on set during the ITC Rathnadeepa Peter Kuruvita trailer shoot",
    href: "/work",
  },
  {
    slug: "photography",
    title: "Photography",
    summary: "Editorial and commercial photography crafted to make products, places and people feel worth experiencing.",
    scope: ["Food", "Product", "Fashion", "Jewellery", "Hospitality / Interior / Architecture"],
    image: asset("KeelesFoodPhotography0314.webp"),
    imageAlt: "Overhead food photography of a Sri Lankan crab curry spread",
    href: "/photography",
  },
  {
    slug: "social-media-strategy",
    title: "Social Media Strategy",
    summary: "Content created and curated for the platforms where your audience spends its time.",
    scope: ["Content creation", "Content curation", "Platform strategy"],
    image: asset("7.webp"),
    imageAlt: "Fashion editorial photograph of three models on a white terrace",
  },
  {
    slug: "paid-media-strategy",
    title: "Paid Media Strategy",
    summary: "Visual content built to perform when it is put behind media spend.",
    scope: ["Campaign creative", "Launch campaigns", "Platform-ready formats"],
    image: "https://i.ytimg.com/vi/Nv1hYJFlshM/maxresdefault.jpg",
    imageAlt: "Still from the Exclusive Lines product launch campaign film",
  },
  {
    slug: "branding-strategy",
    title: "Branding Strategy",
    summary: "Using visual content to create a positive brand presence in the new retail landscape.",
    scope: ["Brand presence", "Visual direction", "Brand storytelling"],
    image: asset("DSC_1657-2.webp"),
    imageAlt: "Jewellery campaign portrait of a model wearing a ruby ring",
  },
];
