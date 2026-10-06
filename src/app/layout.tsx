import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/data/site";
import { asset } from "@/lib/assets";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--font-instrument-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — The Digital Creative Marketing Agency`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Visual Studios Plus",
    "creative agency Colombo",
    "digital marketing agency Sri Lanka",
    "photography Colombo",
    "videography Sri Lanka",
    "food photography",
    "hospitality photography",
    "content creation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — The Digital Creative Marketing Agency`,
    description: site.tagline,
    images: [{ url: asset("D85_3829-HDR.webp"), width: 2400, height: 1599, alt: "Visual Studios Plus — hospitality photography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: [asset("D85_3829-HDR.webp")],
  },
  icons: {
    icon: [
      { url: asset("cropped-VSP-Square-logo-11-32x32.jpg"), sizes: "32x32" },
      { url: asset("cropped-VSP-Square-logo-11-192x192.jpg"), sizes: "192x192" },
    ],
    apple: asset("cropped-VSP-Square-logo-11-180x180.jpg"),
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-ink text-bone">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
