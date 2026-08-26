import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { volunteerInterestPlaceholder } from "@/content/volunteer";

/**
 * Placeholder only — no form fields, no PII collection, no submission UI.
 */
export function VolunteerInterestPlaceholder() {
  return (
    <Section
      id="volunteer-interest"
      tone="cream"
      aria-labelledby="volunteer-interest-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="volunteer-interest-heading" level="h2">
              {volunteerInterestPlaceholder.heading}
            </Heading>
            <Badge tone="muted">{volunteerInterestPlaceholder.status}</Badge>
          </div>
          <p className="text-body-lg mb-4 text-ink-muted">
            {volunteerInterestPlaceholder.body}
          </p>
          <p className="text-body-sm mb-8 text-ink-muted">
            {volunteerInterestPlaceholder.support}
          </p>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Button href="/programs" variant="primary">
                Explore Programs
              </Button>
            </li>
            <li>
              <Button href="/contact" variant="secondary">
                Contact Sunshine
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
