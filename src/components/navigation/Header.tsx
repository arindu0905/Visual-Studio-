"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/data/navigation";
import { site, socials, telHref } from "@/data/site";
import { cn, EASE, EASE_IN_OUT, pad } from "@/lib/utils";
import { Logo } from "./Logo";
import { Magnetic } from "@/components/ui/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  // Close the overlay whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll, close on Escape and keep focus inside the overlay while open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = focusables.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        } else if (!e.shiftKey && i === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !open ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className={cn("container-x flex items-center justify-between transition-[height] duration-500", scrolled ? "h-16" : "h-20 md:h-24")}>
          <Logo priority className="relative z-10 h-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:h-10" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.slice(0, -1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "group relative text-[0.82rem] tracking-wide transition-colors duration-300",
                      isActive(item.href) ? "text-bone" : "text-bone/65 hover:text-bone",
                    )}
                  >
                    <span className="relative inline-block overflow-hidden align-top">
                      <span className="inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{item.label}</span>
                      <span aria-hidden className="absolute left-0 top-full inline-block text-bronze transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                    </span>
                    {isActive(item.href) && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bronze" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden lg:inline-block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-[0.8rem] tracking-wide transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink"
              >
                <span className="size-1.5 rounded-full bg-bronze transition-colors group-hover:bg-ink" aria-hidden />
                Start a project
              </Link>
            </Magnetic>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 items-center gap-3 rounded-full pl-3 pr-1 lg:hidden"
            >
              <span className="relative block h-4 w-[3.4rem] overflow-hidden text-right text-[0.72rem] uppercase tracking-[0.2em]">
                <motion.span className="block" animate={{ y: open ? "-100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }}>
                  Menu
                </motion.span>
                <motion.span className="absolute right-0 top-full block" animate={{ y: open ? "-100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }}>
                  Close
                </motion.span>
              </span>
              <span className="relative grid size-9 place-items-center rounded-full bg-bone">
                <motion.span className="absolute h-px w-4 bg-ink" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }} transition={{ duration: 0.5, ease: EASE }} />
                <motion.span className="absolute h-px w-4 bg-ink" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }} transition={{ duration: 0.5, ease: EASE }} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.4, ease: EASE_IN_OUT } }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-1 font-[family-name:var(--font-display)] text-[clamp(2.6rem,11vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                      >
                        <span className="w-8 text-xs font-normal tracking-normal text-bronze">{pad(i + 1)}</span>
                        <span className={cn("transition-colors", pathname === item.href ? "text-bronze" : "text-bone group-active:text-bronze")}>{item.label}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="container-x grid grid-cols-[1.4fr_1fr] gap-6 border-t border-line py-8 text-sm text-bone/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="space-y-1">
                <p className="eyebrow mb-2">Say hello</p>
                <a href={`mailto:${site.contact.email}`} className="block break-all text-[0.8rem] sm:text-sm">
                  {site.contact.email}
                </a>
                <a href={telHref(site.contact.phones[0])} className="block">
                  {site.contact.phones[0]}
                </a>
              </div>
              <div className="space-y-1">
                <p className="eyebrow mb-2">Follow</p>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
