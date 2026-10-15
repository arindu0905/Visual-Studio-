import { asset, youtubeThumb } from "@/lib/assets";

export type Service = {
  slug: string;
  title: string;
  /** Short line used in lists. */
  summary: string;
  /** What falls under the service. */
  scope: string[];
  image: string;
  imageAlt: string;
  href?: string;
};

/** The studio disciplines as listed on the demo site's Services page. */
export const services: Service[] = [
  {
    slug: "strategy",
    title: "Strategy",
    summary: "Consumer insights, competitive differentiation, and growth funnels.",
    scope: ["Audience Persona Mapping", "Platform Cadence Strategy", "Brand Positioning Architecture"],
    image: asset("7.webp"),
    imageAlt: "Fashion editorial photograph of three models on a white terrace",
  },
  {
    slug: "social-media",
    title: "Social Media",
    summary: "End-to-end management, daily momentum, and community nurturing.",
    scope: ["Weekly Editorial Calendars", "Community Growth & Engagement", "Social Listening & Trend Hacking"],
    image: asset("Tiesh-7077-1.webp"),
    imageAlt: "Fashion portrait photographed by Visual Studios Plus",
  },
  {
    slug: "digital-campaigns",
    title: "Digital Campaigns",
    summary: "360° viral launches built for record-breaking market recall.",
    scope: ["Launch Teaser-to-Convert Funnels", "Influencer Intercept Strategy", "Multi-Platform Ad Variations"],
    image: youtubeThumb("Nv1hYJFlshM"),
    imageAlt: "Still from the Exclusive Lines product launch campaign film",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    summary: "Fast-turnaround studio assets that turn scrollers into buyers.",
    scope: ["Sensory Macro Filmmaking", "Real-Time Event Drops", "Product Still Life Styling"],
    image: asset("KeelesFoodPhotography0403.webp"),
    imageAlt: "Food photography by Visual Studios Plus",
  },
  {
    slug: "photography",
    title: "Photography",
    summary: "Tactile luxury across Gastronomy, Architecture, and High Fashion.",
    scope: ["Culinary Food & Beverage Styling", "Luxury Hospitality & Interiors", "High Jewellery & Diamond Lighting"],
    image: asset("KeelesFoodPhotography0314.webp"),
    imageAlt: "Overhead food photography of a Sri Lankan crab curry spread",
    href: "/photography",
  },
  {
    slug: "videography",
    title: "Videography",
    summary: "Cinema cameras, director direction, and broadcast post-production.",
    scope: ["4K/6K Cinema Master Delivery", "DaVinci Resolve Color Grading", "Original Sound Scoring & SFX"],
    image: youtubeThumb("d-_dQ9-LmxE"),
    imageAlt: "Chef on set during the ITC Rathnadeepa Peter Kuruvita trailer shoot",
    href: "/work",
  },
  {
    slug: "branding",
    title: "Branding",
    summary: "Packaging, label architecture, and comprehensive brand guidelines.",
    scope: ["Logotype & Monogram Systems", "FMCG Can & Bottle Dielines", "Visual Identity Architecture"],
    image: asset("DSC_1657-2.webp"),
    imageAlt: "Jewellery campaign portrait of a model wearing a ruby ring",
  },
  {
    slug: "tvc-commercials",
    title: "TVC / Commercials",
    summary: "National broadcast commercials and digital high-speed spots.",
    scope: ["Scriptwriting & Storyboarding", "Full Studio & Location Filming", "Online/Offline Media Resizes"],
    image: youtubeThumb("rg63iEBbCVU"),
    imageAlt: "Close-up portrait from the Regal Reseau Hotel film",
    href: "/work",
  },
  {
    slug: "cgi-ai-creative",
    title: "CGI / AI Creative",
    summary: "Photorealistic 3D simulations and custom generative visual worlds.",
    scope: ["Liquid Dynamic Simulation", "8K Architectural CGI Renders", "Custom-Trained Generative Concepts"],
    image: asset("Palliyaguruge-Jewellers2.webp"),
    imageAlt: "Jewellery photography by Visual Studios Plus",
  },
];
