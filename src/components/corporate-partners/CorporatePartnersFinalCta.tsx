import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  corporatePartnersFinalCta,
} from "@/content/corporate-partners";

export function CorporatePartnersFinalCta() {
  return (
    <Section
      size="large"
      className="bg-evergreen text-white"
      aria-labelledby="corporate-partners-final-cta"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="corporate-partners-final-cta"
            level="h2"
            className="mb-4 text-white"
          >
            {corporatePartnersFinalCta.heading}
          </Heading>
          <p className="mb-8 text-lg text-white/85">
            {corporatePartnersFinalCta.support}
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Button
                href={DONATE_GOODS_INQUIRY_HREF}
                variant="primary"
                className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
              >
                Donate Goods
              </Button>
            </li>
            <li>
              <Button
                href="/contact"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Sunshine
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
