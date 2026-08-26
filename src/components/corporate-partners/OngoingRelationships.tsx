import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { corporatePartnersOngoing } from "@/content/corporate-partners";

export function OngoingRelationships() {
  return (
    <Section
      tone="cream"
      aria-labelledby="ongoing-relationships-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <Heading
            id="ongoing-relationships-heading"
            level="h2"
            className="mb-4"
          >
            {corporatePartnersOngoing.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {corporatePartnersOngoing.body}
          </p>
          <p className="text-body mb-4 font-medium text-charcoal">
            {corporatePartnersOngoing.discussionIntro}
          </p>
          <ul className="mb-6 space-y-3">
            {corporatePartnersOngoing.points.map((point) => (
              <li key={point} className="flex gap-3 text-body text-charcoal">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">
            {corporatePartnersOngoing.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
