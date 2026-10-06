import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("relative block", className)}>
      <Image src={site.media.logo} alt={site.shortName} width={696} height={240} priority={priority} sizes="160px" className="h-full w-auto" />
    </Link>
  );
}
