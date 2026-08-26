import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  corporatePartnersPrepare,
} from "@/content/corporate-partners";

export function InfoToPrepare() {
  return (
    <Section
      tone="cream"
      aria-labelledby="info-to-prepare-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="info-to-prepare-heading" level="h2" className="mb-4">
            {corporatePartnersPrepare.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {corporatePartnersPrepare.intro}
          </p>
        </div>

        <ul className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {corporatePartnersPrepare.fields.map((field) => (
            <li
              key={field}
              className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3"
            >
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-sunshine-gold"
                aria-hidden="true"
              />
              <span className="text-body font-medium text-charcoal">{field}</span>
            </li>
          ))}
        </ul>

        <div className="max-w-3xl">
          <p className="text-body mb-6 text-ink-muted">
            {corporatePartnersPrepare.ctaNote}
          </p>
          <Button href={DONATE_GOODS_INQUIRY_HREF} variant="primary">
            {corporatePartnersPrepare.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
