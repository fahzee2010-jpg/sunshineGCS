import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATION_INQUIRY_ANCHOR,
  donateGoodsFinalCta,
} from "@/content/donate-goods";

export function DonateGoodsFinalCta() {
  return (
    <Section
      size="large"
      className="bg-evergreen text-white"
      aria-labelledby="donate-goods-final-cta"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="donate-goods-final-cta"
            level="h2"
            className="mb-4 text-white"
          >
            {donateGoodsFinalCta.heading}
          </Heading>
          <p className="mb-8 text-lg text-white/85">
            {donateGoodsFinalCta.support}
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Button
                href={`#${DONATION_INQUIRY_ANCHOR}`}
                variant="primary"
                className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
              >
                Start a Donation Inquiry
              </Button>
            </li>
            <li>
              <Button
                href="/corporate-partners"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Become a Corporate Partner
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
