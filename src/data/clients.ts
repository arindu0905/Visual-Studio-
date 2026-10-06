import { asset } from "@/lib/assets";

export type Client = { name: string; logo: string };

/** "Trusted Clients & Partners" as listed on the current website. */
export const clients: Client[] = [
  { name: "Shangri-La", logo: asset("Shangri-La-a.png") },
  { name: "Cinnamon Hotels & Resorts", logo: asset("Cinnamon-Logo-a.png") },
  { name: "Il Gelato", logo: asset("Il-Gelato-a.png") },
  { name: "Uber Eats", logo: asset("ubereats-a.png") },
  { name: "Ahmad Tea", logo: asset("AhmadTeaLogoTransparent-a.png") },
  { name: "American Express", logo: asset("American-Express-logo-a.png") },
  { name: "UNDP", logo: asset("UNDP_logo-1.png") },
  { name: "The Face Shop", logo: asset("The-faceshop-logo-a.png") },
  { name: "Cosmopolitan", logo: asset("Cosmopoliton-a.png") },
  { name: "ITC Ratnadipa", logo: asset("ITC-a.png") },
  { name: "Unilever", logo: asset("Unilever-A.png") },
  { name: "Walker Tours", logo: asset("Walker-Tours-A.png") },
  { name: "Hilton", logo: asset("hilton-a.png") },
  { name: "Omega", logo: asset("Omega_Logo-a.png") },
  { name: "Munchee", logo: asset("Munchee-Logo-a.png") },
  { name: "Multilac", logo: asset("Multilac-Logo-a.png") },
  { name: "Mövenpick Hotels & Resorts", logo: asset("Movenpick_Hotels__Resorts_logo-a.png") },
  { name: "Keells", logo: asset("keellslogo-a.png") },
];
