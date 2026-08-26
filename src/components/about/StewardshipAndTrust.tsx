import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { aboutStewardship } from "@/content/about";

export function StewardshipAndTrust() {
  return (
    <Section
      tone="cream"
      aria-labelledby="stewardship-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="stewardship-heading" level="h2" className="mb-4">
            {aboutStewardship.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {aboutStewardship.intro}
          </p>
          <ul className="space-y-3">
            {aboutStewardship.points.map((point) => (
              <li key={point} className="flex gap-3 text-body text-charcoal">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-community-green"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
