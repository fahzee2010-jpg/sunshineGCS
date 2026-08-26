import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DonateGoodsInquiryForm } from "@/components/donate-goods/DonateGoodsInquiryForm";
import { Heading } from "@/components/ui/Heading";
import { DONATION_INQUIRY_ANCHOR } from "@/content/donate-goods";

export function DonationInquirySection() {
  return (
    <Section
      id={DONATION_INQUIRY_ANCHOR}
      tone="cream"
      aria-labelledby="donation-inquiry-heading"
      className="scroll-mt-24 border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="donation-inquiry-heading" level="h2" className="mb-3">
            Start a donation inquiry
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            Tell us about your surplus. This form is an inquiry only —
            submitting it does not mean Sunshine has accepted the donation.
          </p>
          <div className="rounded-lg border border-border bg-surface p-5 sm:p-8">
            <DonateGoodsInquiryForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
