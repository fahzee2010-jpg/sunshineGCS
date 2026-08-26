import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { aboutFinalCta } from "@/content/about";

export function AboutFinalCta() {
  return (
    <Section
      size="large"
      className="bg-evergreen text-white"
      aria-labelledby="about-final-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="about-final-cta-heading"
            level="h2"
            className="mb-4 text-white"
          >
            {aboutFinalCta.heading}
          </Heading>
          <p className="mb-8 text-lg text-white/85">{aboutFinalCta.support}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Button
                href="/donate-goods"
                variant="primary"
                className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
              >
                Donate Goods
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
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Volunteer
              </Button>
            </li>
            <li>
              <Button
                href="/contact"
                variant="ghost"
                className="text-sunshine-gold hover:text-white"
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
