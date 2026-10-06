export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Photography", href: "/photography" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [{ label: "Home", href: "/" }, ...mainNav];
