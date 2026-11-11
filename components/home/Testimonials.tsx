import { LuQuote } from "react-icons/lu";
import { testimonials } from "@/content/extras";
import { Card, Section, SectionHeader } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

/** Renders nothing until real quotes are added to content/extras.ts */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <SectionHeader eyebrow="Recommendations" title="What colleagues say." />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <Card className="h-full p-6">
              <figure className="flex h-full flex-col">
                <LuQuote className="h-6 w-6 text-accent" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-7 text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="font-medium text-fg">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                  {t.relationship && <p className="mt-0.5 text-xs text-subtle">{t.relationship}</p>}
                </figcaption>
              </figure>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
