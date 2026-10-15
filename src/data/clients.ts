import { asset } from "@/lib/assets";

/** `color`: keep the logo's own colours (for solid-shape logos that would turn into a white block). */
export type Client = { name: string; logo: string; sector: string; color?: boolean };

/** Commercial client roster, as listed on the demo site. */
export const clients: Client[] = [
  { name: "Unilever", logo: asset("Unilever-A.png"), sector: "FMCG Global" },
  { name: "American Express", logo: asset("American-Express-logo-a.png"), sector: "Finance & Luxury" },
  { name: "Omega", logo: asset("Omega_Logo-a.png"), sector: "Swiss Luxury" },
  { name: "CBL Munchee", logo: asset("Munchee-Logo-a.png"), sector: "FMCG Food" },
  { name: "Keells", logo: asset("keellslogo-a.png"), sector: "Supermarkets" },
  { name: "Hilton", logo: asset("hilton-a.png"), sector: "Luxury Hospitality" },
  { name: "UNDP", logo: asset("UNDP_logo-1.png"), sector: "Global Development" },
  { name: "Ahmad Tea London", logo: asset("AhmadTeaLogoTransparent-a.png"), sector: "Beverage" },
  { name: "Cinnamon Hotels", logo: asset("Cinnamon-Logo-a.png"), sector: "Resorts & Hotels" },
  { name: "Multilac", logo: asset("Multilac-Logo-a.png"), sector: "Paints & Finishes", color: true },
  { name: "Mövenpick Hotels", logo: asset("Movenpick_Hotels__Resorts_logo-a.png"), sector: "Hospitality" },
  { name: "Walker Tours", logo: asset("Walker-Tours-A.png"), sector: "Travel & Tourism" },
  { name: "Uber Eats", logo: asset("ubereats-a.png"), sector: "Technology & Food" },
  { name: "Shangri-La", logo: asset("Shangri-La-a.png"), sector: "Hospitality" },
  { name: "ITC Hotels", logo: asset("ITC-a.png"), sector: "Luxury Hospitality" },
  { name: "Il Gelato", logo: asset("Il-Gelato-a.png"), sector: "Artisanal Gelato" },
  { name: "Cosmopolitan", logo: asset("Cosmopoliton-a.png"), sector: "Media & Fashion" },
  { name: "The Face Shop", logo: asset("The-faceshop-logo-a.png"), sector: "Beauty Care" },
];
