export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Signature easing used across the site — a long, soft "expo out". */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export const pad = (n: number) => String(n).padStart(2, "0");
