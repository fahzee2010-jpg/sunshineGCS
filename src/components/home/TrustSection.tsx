import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { homeTrust } from "@/content/home";

export function TrustSection() {
  return (
    <Section aria-labelledby="home-trust-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading id="home-trust-heading" level="h2" className="mb-6">
            {homeTrust.heading}
          </Heading>
          <ul className="mb-8 space-y-3 text-left sm:mx-auto sm:max-w-lg">
            {homeTrust.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-body text-charcoal"
              >
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Button href="/transparency" variant="outline">
            View Transparency
          </Button>
        </div>
      </Container>
    </Section>
  );
}
