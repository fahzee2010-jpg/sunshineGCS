import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  contactBusiness,
} from "@/content/contact";

export function BusinessInquiries() {
  return (
    <Section aria-labelledby="business-inquiries-heading">
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <Heading id="business-inquiries-heading" level="h2" className="mb-4">
            {contactBusiness.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {contactBusiness.intro}
          </p>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Button href={DONATE_GOODS_INQUIRY_HREF} variant="primary">
                {contactBusiness.donateLabel}
              </Button>
            </li>
            <li>
              <Button href="/corporate-partners" variant="secondary">
                {contactBusiness.partnersLabel}
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
