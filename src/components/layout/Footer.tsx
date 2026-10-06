import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { services } from "@/data/services";
import { site, socials, telHref } from "@/data/site";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-24 md:pt-32">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Visual Studios Plus</p>
            <p className="max-w-sm font-[family-name:var(--font-display)] text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-4xl">
              Content meant to be <span className="serif-accent text-bronze">experienced.</span> Not simply consumed.
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline mt-8 inline-flex items-center gap-2 text-lg text-bone/85 hover:text-bone"
            >
              {site.contact.email}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-bone/70 transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5">Services</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="link-underline text-bone/70 transition-colors hover:text-bone">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5">Studio</p>
            <address className="space-y-2.5 text-[0.95rem] not-italic text-bone/70">
              <p>
                {site.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {site.contact.phones.map((p) => (
                <a key={p} href={telHref(p)} className="link-underline block w-fit hover:text-bone">
                  {p}
                </a>
              ))}
            </address>
            <p className="eyebrow mb-4 mt-8">Follow</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-bone/70 hover:text-bone">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="container-x mt-24 select-none md:mt-32">
        <p className="whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[19.5vw] font-semibold leading-[0.75] tracking-[-0.06em] text-bone/[0.06] md:text-[18vw]">
          Visual<span className="text-bronze/30">+</span>
        </p>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-line py-7 text-xs text-stone sm:flex-row sm:items-center">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Colombo, Sri Lanka</p>
        <BackToTop />
      </div>
    </footer>
  );
}
