import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { volunteerFinalCta } from "@/content/volunteer";

export function VolunteerFinalCta() {
  return (
    <Section
      size="large"
      className="bg-evergreen text-white"
      aria-labelledby="volunteer-final-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="volunteer-final-cta-heading"
            level="h2"
            className="mb-4 text-white"
          >
            {volunteerFinalCta.heading}
          </Heading>
          <p className="mb-8 text-lg text-white/85">
            {volunteerFinalCta.support}
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Button
                href="/programs"
                variant="primary"
                className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
              >
                Explore Programs
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
            <li>
              <Button
                href="/corporate-partners"
                variant="ghost"
                className="text-sunshine-gold hover:text-white"
              >
                Corporate Partners
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
