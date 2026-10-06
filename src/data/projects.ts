import { youtubeThumb } from "@/lib/assets";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  discipline: "Videography";
  /** Description as published on the current website. */
  summary: string;
  youtubeId: string;
  cover: string;
  coverAlt: string;
  /** Some uploads are letterboxed — scale the poster slightly to hide the bars. */
  letterboxed?: boolean;
};

export const projects: Project[] = [
  {
    slug: "regal-reseau-hotel",
    title: "Regal Reseau Hotel",
    client: "Regal Reseau",
    category: "Hospitality Film",
    discipline: "Videography",
    summary: "A visual journey of the unique experiences Regal Reseau has to offer for anyone staying on board.",
    youtubeId: "rg63iEBbCVU",
    cover: youtubeThumb("rg63iEBbCVU"),
    coverAlt: "Close-up portrait from the Regal Reseau Hotel film",
    letterboxed: true,
  },
  {
    slug: "itc-rathnadeepa-peter-kuruvita",
    title: "ITC Rathnadeepa × Peter Kuruvita",
    client: "ITC Ratnadipa",
    category: "Food Film · Trailer",
    discipline: "Videography",
    summary:
      "Using storytelling in our food videography to reflect on ITC’s brand focus on sustainability and responsible sourcing.",
    youtubeId: "d-_dQ9-LmxE",
    cover: youtubeThumb("d-_dQ9-LmxE"),
    coverAlt: "Chef Peter Kuruvita smiling in a restaurant kitchen",
  },
  {
    slug: "exclusive-lines-launch",
    title: "Exclusive Lines",
    client: "Exclusive Lines",
    category: "Product Launch Campaign",
    discipline: "Videography",
    summary: "A video campaign to highlight the launch of the new Exclusive Lines website.",
    youtubeId: "Nv1hYJFlshM",
    cover: youtubeThumb("Nv1hYJFlshM"),
    coverAlt: "Model applying fragrance in a bright kitchen, from the Exclusive Lines launch film",
  },
  {
    slug: "pussalawa-hotel",
    title: "Pussalawa Hotel",
    client: "Pussalawa",
    category: "Corporate Film",
    discipline: "Videography",
    summary: "Corporate videography showcasing the process of Pussalawa Farms in action.",
    youtubeId: "ZX7DkXlNgmk",
    cover: youtubeThumb("ZX7DkXlNgmk"),
    coverAlt: "Aerial view of the Pussalawa hotel surrounded by forest",
    letterboxed: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
