import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsTax } from "@/content/donate-goods";

export function TaxInformation() {
  return (
    <Section aria-labelledby="tax-info-heading" size="compact">
      <Container>
        <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
          <Heading id="tax-info-heading" level="h2" className="mb-3">
            {donateGoodsTax.heading}
          </Heading>
          <p className="text-body text-ink-muted">{donateGoodsTax.body}</p>
        </div>
      </Container>
    </Section>
  );
}
