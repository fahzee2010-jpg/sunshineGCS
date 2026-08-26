import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceRequestPlaceholder } from "@/content/get-assistance";

/**
 * Placeholder only — no form fields, no PII collection, no submission UI.
 */
export function AssistanceRequestPlaceholder() {
  return (
    <Section
      id="assistance-request"
      tone="cream"
      aria-labelledby="assistance-request-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="assistance-request-heading" level="h2">
              {getAssistanceRequestPlaceholder.heading}
            </Heading>
            <Badge tone="muted">{getAssistanceRequestPlaceholder.status}</Badge>
          </div>
          <p className="text-body-lg mb-4 text-ink-muted">
            {getAssistanceRequestPlaceholder.body}
          </p>
          <p className="text-body-sm mb-8 text-ink-muted">
            {getAssistanceRequestPlaceholder.support}
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
