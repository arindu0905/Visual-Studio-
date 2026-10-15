"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Starts the darkroom "develop" animation on any [data-develop] element as it
 * enters the screen. One observer for the whole site; elements added
 * later (load more, route changes) are picked up via a MutationObserver.
 */
export function DevelopObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-developed");
            io.unobserve(e.target);
          }
        }
      },
      // Start developing as soon as the photo enters, so it is never seen sitting as a negative.
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = () => document.querySelectorAll("[data-develop]:not(.is-developed)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
