import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  contactGeneralPlaceholder,
} from "@/content/contact";

/**
 * Placeholder only — no form fields, no email/tel links, no PII collection.
 */
export function GeneralInquiriesPlaceholder() {
  return (
    <Section
      id="general-inquiries"
      aria-labelledby="general-inquiries-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="general-inquiries-heading" level="h2">
              {contactGeneralPlaceholder.heading}
            </Heading>
            <Badge tone="muted">{contactGeneralPlaceholder.status}</Badge>
          </div>
          <p className="text-body-lg mb-4 text-ink-muted">
            {contactGeneralPlaceholder.body}
          </p>
          <p className="text-body-sm mb-8 text-ink-muted">
            {contactGeneralPlaceholder.support}
          </p>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Button href="/about" variant="primary">
                About
              </Button>
            </li>
            <li>
              <Button href="/programs" variant="secondary">
                Programs
              </Button>
            </li>
            <li>
              <Button href={DONATE_GOODS_INQUIRY_HREF} variant="outline">
                Donate Goods
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
