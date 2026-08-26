import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { getAssistanceHero } from "@/content/get-assistance";

export function GetAssistanceHero() {
  return (
    <Section
      size="large"
      tone="cream"
      aria-labelledby="get-assistance-hero-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {getAssistanceHero.eyebrow}
            </p>
            <Heading
              id="get-assistance-hero-heading"
              level="h1"
              className="mb-5 max-w-xl"
            >
              {getAssistanceHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {getAssistanceHero.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href="/programs" variant="primary">
                  Explore Programs
                </Button>
              </li>
              <li>
                <Button href="/contact" variant="outline">
                  Contact Sunshine
                </Button>
              </li>
            </ul>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Future photography"
            label="Warm, respectful imagery of community support and coordination will appear here — never fabricated photos of people receiving assistance."
          />
        </div>
      </Container>
    </Section>
  );
}
