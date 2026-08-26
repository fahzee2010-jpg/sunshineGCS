import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { TextLink } from "@/components/ui/TextLink";
import { homeHero } from "@/content/home";

export function HeroSection() {
  return (
    <Section size="large" tone="cream" aria-labelledby="home-hero-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {homeHero.eyebrow}
            </p>
            <Heading
              id="home-hero-heading"
              level="display"
              className="mb-5 max-w-xl"
            >
              {homeHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {homeHero.support}
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
            <p className="mt-5 text-sm text-ink-muted">
              Business partner?{" "}
              <TextLink href="/corporate-partners">
                Become a Corporate Partner
              </TextLink>
            </p>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Photography direction"
            label="Future imagery will highlight surplus recovery, warehouse logistics, volunteers, and community distribution — never exploitative portrayals of hardship."
            className="w-full"
          />
        </div>
      </Container>
    </Section>
  );
}
