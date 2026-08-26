import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsPartnership } from "@/content/donate-goods";

export function PartnershipCta() {
  return (
    <Section tone="cream" aria-labelledby="partnership-heading">
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <Heading id="partnership-heading" level="h2" className="mb-4">
            {donateGoodsPartnership.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {donateGoodsPartnership.body}
          </p>
          <Button href="/corporate-partners" variant="secondary">
            Become a Corporate Partner
          </Button>
        </div>
      </Container>
    </Section>
  );
}
