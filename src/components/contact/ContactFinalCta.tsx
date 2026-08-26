import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  contactFinalCta,
} from "@/content/contact";

export function ContactFinalCta() {
  return (
    <Section
      size="large"
      className="bg-evergreen text-white"
      aria-labelledby="contact-final-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="contact-final-cta-heading"
            level="h2"
            className="mb-4 text-white"
          >
            {contactFinalCta.heading}
          </Heading>
          <p className="mb-8 text-lg text-white/85">{contactFinalCta.support}</p>
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
                href="/corporate-partners"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Corporate Partners
              </Button>
            </li>
            <li>
              <Button
                href="/get-assistance"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Get Assistance
              </Button>
            </li>
            <li>
              <Button
                href="/volunteer"
                variant="ghost"
                className="text-sunshine-gold hover:text-white"
              >
                Volunteer
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
