import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  external?: boolean;
  magnetic?: boolean;
};

/**
 * Primary call-to-action. A fill sweeps up from below on hover and the arrow
 * swaps out diagonally. Pure CSS transitions — no JS unless `magnetic`.
 */
export function ButtonLink({ href, children, variant = "solid", className, external, magnetic = true }: Props) {
  const classes = cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-wide transition-colors duration-500",
    variant === "solid" ? "bg-bone text-ink" : "border border-bone/30 text-bone hover:border-bronze",
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
          variant === "solid" ? "bg-bronze" : "bg-bone",
        )}
      />
      <span className={cn("relative z-10 transition-colors duration-500", variant === "outline" && "group-hover:text-ink")}>{children}</span>
      <span className={cn("relative z-10 grid size-5 place-items-center overflow-hidden transition-colors duration-500", variant === "outline" && "group-hover:text-ink")}>
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-5 group-hover:translate-x-5" />
        <ArrowUpRight aria-hidden className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );

  const el = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
