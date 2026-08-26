import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  corporatePartnersInquiryCta,
} from "@/content/corporate-partners";

export function PartnershipInquiryCta() {
  return (
    <Section
      tone="cream"
      aria-labelledby="partnership-inquiry-cta-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="partnership-inquiry-cta-heading"
            level="h2"
            className="mb-4"
          >
            {corporatePartnersInquiryCta.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {corporatePartnersInquiryCta.support}
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Button href={DONATE_GOODS_INQUIRY_HREF} variant="primary">
                Donate Goods
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
