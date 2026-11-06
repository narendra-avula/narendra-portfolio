import Link from "next/link";
import { Container, Eyebrow, buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold text-fg">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-lg text-muted">The link may be old, or the page may not be published yet.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("primary")}>
            Back to home
          </Link>
          <Link href="/projects" className={buttonClass("secondary")}>
            Browse projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
