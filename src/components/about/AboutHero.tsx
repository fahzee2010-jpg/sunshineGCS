import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { aboutHero } from "@/content/about";

export function AboutHero() {
  return (
    <Section size="large" tone="cream" aria-labelledby="about-hero-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {aboutHero.eyebrow}
            </p>
            <Heading id="about-hero-heading" level="h1" className="mb-5 max-w-xl">
              {aboutHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {aboutHero.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href="/donate-goods" variant="primary">
                  Donate Goods
                </Button>
              </li>
              <li>
                <Button href="/get-assistance" variant="secondary">
                  Get Assistance
                </Button>
              </li>
            </ul>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Future photography"
            label="Authentic images of volunteers, surplus recovery, and community distribution will appear here — never exploitative portrayals of hardship."
          />
        </div>
      </Container>
    </Section>
  );
}
