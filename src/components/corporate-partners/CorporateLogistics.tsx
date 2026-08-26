import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { corporatePartnersLogistics } from "@/content/corporate-partners";

export function CorporateLogistics() {
  return (
    <Section aria-labelledby="corporate-logistics-heading">
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="corporate-logistics-heading"
            level="h2"
            className="mb-4"
          >
            {corporatePartnersLogistics.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {corporatePartnersLogistics.body}
          </p>
          <p className="text-body mb-4 font-medium text-charcoal">
            {corporatePartnersLogistics.factorsIntro}
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {corporatePartnersLogistics.factors.map((factor) => (
              <li key={factor} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-community-green"
                  aria-hidden="true"
                />
                <span className="text-body text-ink-muted">{factor}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">
            {corporatePartnersLogistics.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
