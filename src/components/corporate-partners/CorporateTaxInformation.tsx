import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { corporatePartnersTax } from "@/content/corporate-partners";

export function CorporateTaxInformation() {
  return (
    <Section aria-labelledby="corporate-tax-heading" size="compact">
      <Container>
        <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
          <Heading id="corporate-tax-heading" level="h2" className="mb-3">
            {corporatePartnersTax.heading}
          </Heading>
          <p className="text-body mb-3 text-ink-muted">
            {corporatePartnersTax.body}
          </p>
          <p className="text-body-sm mb-4 text-ink-muted">
            {corporatePartnersTax.note}
          </p>
          <p className="text-body-sm">
            <TextLink href="/transparency">View Transparency</TextLink>
          </p>
        </div>
      </Container>
    </Section>
  );
}
