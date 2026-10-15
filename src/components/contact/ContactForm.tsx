"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useId, useState } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { useContactSheet } from "@/components/contact-sheet/ContactSheet";

/**
 * Frontend-only enquiry form. There is no backend yet, so submitting composes an
 * email to the studio in the visitor's mail app. Swap `onSubmit` for an API call later.
 */
export function ContactForm() {
  const uid = useId();
  const [interests, setInterests] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const sheet = useContactSheet();
  const frames = sheet?.frames ?? [];

  const toggle = (t: string) => setInterests((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const lines = [
      `Name: ${name}`,
      `Email: ${data.get("email")}`,
      data.get("company") ? `Company: ${data.get("company")}` : "",
      interests.length ? `Interested in: ${interests.join(", ")}` : "",
      frames.length ? `Reference frames:\n${frames.map((f) => new URL(f.src, window.location.origin).href).join("\n")}` : "",
      "",
      String(data.get("message") ?? ""),
    ].filter((l, i) => l !== "" || i === 5); // keep the blank line before the message
    const subject = `New project enquiry${name ? ` — ${name}` : ""}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const field =
    "peer w-full border-0 border-b border-line bg-transparent pb-3 pt-7 text-lg text-bone outline-none transition-colors placeholder:text-transparent focus:border-bronze";
  const label =
    "pointer-events-none absolute left-0 top-7 origin-left text-lg text-bone/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-bronze peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate={false}>
      <fieldset>
        <legend className="eyebrow mb-5">I’m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const on = interests.includes(s.title);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.title)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                  on ? "border-bronze bg-bronze text-ink" : "border-line text-bone/75 hover:border-bone/50 hover:text-bone",
                )}
              >
                {on && <Check aria-hidden className="size-3.5" />}
                {s.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      {frames.length > 0 && (
        <div>
          <p className="eyebrow mb-4">Reference frames from your contact sheet · {frames.length}</p>
          <ul className="flex flex-wrap gap-2">
            {frames.map((f) => (
              <li key={f.src} className="group/ref relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} className="h-16 w-24 object-cover" />
                <button
                  type="button"
                  onClick={() => sheet?.remove(f.src)}
                  aria-label="Remove reference frame"
                  className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-ink/80 text-[0.6rem] text-bone opacity-0 transition-opacity group-hover/ref:opacity-100 focus:opacity-100"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative">
          <input id={`${uid}-name`} name="name" required autoComplete="name" placeholder="Your name" className={field} />
          <label htmlFor={`${uid}-name`} className={label}>
            Your name *
          </label>
        </div>
        <div className="relative">
          <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
          <label htmlFor={`${uid}-email`} className={label}>
            Email *
          </label>
        </div>
      </div>
      <div className="relative">
        <input id={`${uid}-company`} name="company" autoComplete="organization" placeholder="Company" className={field} />
        <label htmlFor={`${uid}-company`} className={label}>
          Company / brand
        </label>
      </div>
      <div className="relative">
        <textarea id={`${uid}-message`} name="message" required rows={4} placeholder="Tell us about the project" className={cn(field, "resize-none")} />
        <label htmlFor={`${uid}-message`} className={label}>
          Tell us about the project *
        </label>
      </div>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-9 py-5 text-sm font-bold uppercase tracking-[0.05em] text-ink"
        >
          <span aria-hidden className="absolute inset-0 translate-y-[101%] rounded-full bg-bronze transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
          <span className="relative">Start project brief</span>
          <ArrowUpRight aria-hidden className="relative size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
        <p className="max-w-xs text-sm text-bone/50" aria-live="polite">
          {sent ? `Your email app should now be open. If not, write to ${site.contact.email}.` : "Typical reply within 4 business hours. Opens your email app with your message ready to send."}
        </p>
      </div>
    </form>
  );
}
