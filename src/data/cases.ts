export type CaseStudy = {
  client: string;
  title: string;
  tagline: string;
  type: string;
  year: string;
  metric?: string;
  metricLabel?: string;
  tags: string[];
  /** Shown when featured on the homepage. */
  summary?: string;
};

/** Case studies as listed on the demo site's Work page. The first three are the flagship projects. */
export const cases: CaseStudy[] = [
  {
    client: "Nescafé (Nestlé) & CFW",
    title: "Nescafé × Colombo Fashion Week",
    tagline: "Where High Fashion Meets Caffeine Flavor in Real Time",
    type: "Digital Case Study",
    year: "2025",
    metric: "20K+",
    metricLabel: "Engagement Per Reel",
    tags: ["Real-Time Production", "Fashion Week", "Social Reels"],
    summary:
      "We spearheaded the entire social media campaign for Colombo Fashion Week and Nescafé collaboration, crafting a strategy that seamlessly blended runway fashion and flavor. Capturing Sri Lanka’s top designers, stylists, and industry figures in real-time, we delivered dynamic content that positioned Nescafé as a true trendsetter.",
  },
  {
    client: "Pond's Sri Lanka (Unilever)",
    title: "Pond's Super Light Gel Launch",
    tagline: "Dive into 200% Instant Hydration with Zero Heaviness",
    type: "Digital Case Study",
    year: "2024",
    metric: "+142%",
    metricLabel: "Social Engagement Lift",
    tags: ["Beauty & Skincare", "Product Photography", "Viral Reel Campaign"],
    summary:
      "For Pond's Sri Lanka, we conceptualized and executed a dynamic viral campaign for Pond's Super Light Gel, featuring captivating photography and engaging social media reels. Through teasers, launch posts, and post-launch engagement, the campaign went viral across social media platforms.",
  },
  {
    client: "United Nations Development Programme",
    title: "UNDP Sri Lanka — HackaDev Social Innovation",
    tagline: "Empowering Grassroots Innovators Across All 9 Provinces",
    type: "Digital Case Study",
    year: "2024",
    metric: "All 9",
    metricLabel: "Provinces Covered",
    tags: ["Social Impact", "Trilingual Campaign", "Island-wide Photography"],
    summary:
      "We partnered with UNDP to showcase their Hackathon project, promoting social innovation through a trilingual campaign. Our work included poster design, social media content, and island-wide authentic documentary photography.",
  },
  { client: "Dankotuwa Porcelain PLC", title: "Dankotuwa Porcelain CGI World", tagline: "Breathtaking 3D CGI Animation for World-Class Porcelain", type: "Digital Case Study", year: "2024", metric: "8K Render", metricLabel: "CGI Asset Fidelity", tags: ["CGI Animation", "Photorealistic 3D", "Luxury Tableware"] },
  { client: "Ministry of Crab (Asia’s 50 Best)", title: "Ministry of Crab Gastronomy", tagline: "Sensory Visuals for Asia’s Most Celebrated Seafood Institution", type: "Digital Case Study", year: "2024", metric: "Asia's 50 Best", metricLabel: "Restaurant Status", tags: ["Culinary Cinematography", "Gastronomy", "Luxury Dining"] },
  { client: "Nations Trust Bank / American Express", title: "American Express × Swim Week Colombo", tagline: "“Don’t Live Without It” — Title Partner Fashion Campaign", type: "Digital Case Study", year: "2024", metric: "Ultra-Premium", metricLabel: "Card Position", tags: ["Luxury Finance", "Fashion Runway", "High-Net-Worth Strategy"] },
  { client: "Knorr (Unilever Sri Lanka)", title: "Knorr Mother’s Day Campaign", tagline: "Celebrating the Women Who Bring Warmth, Care & Flavour Home", type: "Digital Case Study", year: "2024", metric: "1.8M", metricLabel: "Social Video Views", tags: ["Emotional Storytelling", "Mother’s Day", "Culinary TVC"] },
  { client: "Ceylon Biscuits Limited (CBL)", title: "Munchee CBL — Festive AI & Lego Campaign", tagline: "Blending the Magic of Legos with Sri Lanka’s Favorite Biscuits", type: "Digital Retainer", year: "2024", metric: "100% Bespoke", metricLabel: "AI Visual Generation", tags: ["AI Visual Generation", "Festive Campaign", "Lego Stop-Motion"] },
  { client: "Ahmad Tea London", title: "Ahmad Tea London — Digital Channel Retainer", tagline: "Captivating Content Celebrating British & Ceylon Tea Heritage", type: "Digital Retainer", year: "2024–2026", metric: "End-to-End", metricLabel: "Retainer Scope", tags: ["Social Retainer", "Tea Flatlays", "Sensory Video"] },
  { client: "Swisstek Aluminium PLC", title: "Swisstek Aluminium — Technical & Solar Strategy", tagline: "Results-Driven Social Media Strategy for Architectural Systems", type: "Digital Retainer", year: "2024", tags: ["B2B & B2C Social", "Solar Energy", "Industrial Storytelling"] },
  { client: "Swadeshi Industrial Works PLC", title: "Swadeshi Khomba — Natural Herbal Digital Presence", tagline: "Bringing the Essence of Nature and Neem Healing to Life", type: "Digital Retainer", year: "2024–2026", tags: ["Herbal Wellness", "Organic Social", "Skin Health"] },
  { client: "Imorich (Elephant House)", title: "Imorich Ice Cream — 5-Year Creative Partnership", tagline: "Elevating Premium Indulgence for Over 5 Consecutive Years", type: "Digital Retainer", year: "2020–2025", metric: "5+ Years", metricLabel: "Partnership Duration", tags: ["Long-Term Retainer", "Gourmet Gelato", "Event Activations"] },
  { client: "SOZO Beverages", title: "SOZO Sparkling Drinks — Identity & Can Design", tagline: "Clean, Refreshing and Full of Tropical Character", type: "Branding Project", year: "2024", tags: ["Packaging Design", "Identity System", "Beverage Can Labels"] },
  { client: "Too Good Chocolatier", title: "Too Good Dessert Chocolatier", tagline: "Premium, Distinctive and Irresistibly Crafted Visual Language", type: "Branding Project", year: "2024", tags: ["Luxury Chocolates", "Packaging Architecture", "Logo Design"] },
  { client: "Viva La Vida Skincare", title: "Viva La Vida Pharma Skincare", tagline: "Consistency and Quiet Luxury Across Every Skincare Touchpoint", type: "Branding Project", year: "2024", tags: ["Quiet Luxury", "Dermocosmetics", "Bottle Labels"] },
  { client: "Cairns Bicycle Works", title: "CBW (Cairns Bicycle Works) — Australia", tagline: "“The Journey of a Bicycle Never Ends”", type: "Branding Project", year: "2023", tags: ["Sporting Identity", "Minimalist Logomark", "Outdoor Brand"] },
  { client: "Te Dalu Boutique Hotel", title: "Te Dalu — Boutique Hotel Ella", tagline: "Capturing the Charm, Surroundings & Sense of Place in Ella", type: "Branding Project", year: "2023", tags: ["Hospitality Branding", "Boutique Hotel", "Amenity Packaging"] },
  { client: "Viva Sri Lanka", title: "Viva Malted Food Drink — Avurudu Series", tagline: "Making Avurudu Celebrations Even More Special and Memorable", type: "TVC Campaign", year: "2024", tags: ["TVC Video Series", "Avurudu Festive", "Sinhala Cultural"] },
  { client: "MintPay Sri Lanka", title: "MintPay — Digital Vouchers Commercial", tagline: "From Concept to Screen: Full-Scale Commercial Production", type: "TVC Campaign", year: "2024", tags: ["Commercial TVC", "FinTech Gifting", "Digital Production"] },
  { client: "Swadeshi Industrial Works", title: "Swadeshi Khomba — Women’s Day TVC", tagline: "Celebrating the Strength & Natural Beauty of Sri Lankan Women", type: "TVC Campaign", year: "2024", tags: ["Emotional TVC", "Women’s Day", "Cultural Authenticity"] },
  { client: "DSI Samson Group", title: "DSI Footwear — Everyday Journeys", tagline: "Celebrating the Strength and Everyday Strides of Sri Lankan Women", type: "TVC Campaign", year: "2024", tags: ["Footwear TVC", "Fast Turnaround", "Inspiring Women"] },
  { client: "Hilton Colombo / DoubleTree by Hilton", title: "Sapphire Dragon Chinese Restaurant", tagline: "Elevating Premium Hospitality & Fine Dining for Hilton Colombo", type: "Commercial Photography", year: "2024", tags: ["Gourmet Photography", "Luxury Hospitality", "Hilton Dining"] },
];

/** Studio figures shown on the About page. */
export const stats = [
  { value: "50+", label: "Premier Brands Partnered" },
  { value: "10M+", label: "Organic Digital Views" },
  { value: "5+ Yrs", label: "Average Client Retainer" },
  { value: "100%", label: "In-House Production Team" },
];
