import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceEligibility } from "@/content/get-assistance";

export function EligibilityGuidance() {
  return (
    <Section
      tone="cream"
      aria-labelledby="eligibility-guidance-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading
            id="eligibility-guidance-heading"
            level="h2"
            className="mb-4"
          >
            {getAssistanceEligibility.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {getAssistanceEligibility.intro}
          </p>
          <p className="text-body mb-4 font-medium text-charcoal">
            {getAssistanceEligibility.factorsIntro}
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {getAssistanceEligibility.factors.map((factor) => (
              <li key={factor} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span className="text-body text-ink-muted">{factor}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">
            {getAssistanceEligibility.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
