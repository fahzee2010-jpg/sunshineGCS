import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATION_INQUIRY_ANCHOR,
  donateGoodsLogistics,
} from "@/content/donate-goods";

export function LogisticsNote() {
  return (
    <Section
      tone="cream"
      aria-labelledby="logistics-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading id="logistics-heading" level="h2" className="mb-4">
            {donateGoodsLogistics.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {donateGoodsLogistics.body}
          </p>
          <Button href={`#${DONATION_INQUIRY_ANCHOR}`} variant="primary">
            Start a Donation Inquiry
          </Button>
        </div>
      </Container>
    </Section>
  );
}
