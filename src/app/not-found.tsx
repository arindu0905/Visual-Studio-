import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-xl mt-6">
        Out of <span className="serif-accent text-bronze">frame.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-bone/70">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <ButtonLink href="/">Back to home</ButtonLink>
        <Link href="/work" className="link-underline text-bone/75 hover:text-bone">
          See our work
        </Link>
      </div>
    </section>
  );
}
