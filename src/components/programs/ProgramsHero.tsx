import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import {
  DONATE_GOODS_INQUIRY_HREF,
  programsHero,
} from "@/content/programs";

export function ProgramsHero() {
  return (
    <Section size="large" tone="cream" aria-labelledby="programs-hero-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {programsHero.eyebrow}
            </p>
            <Heading
              id="programs-hero-heading"
              level="h1"
              className="mb-5 max-w-xl"
            >
              {programsHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {programsHero.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href="/get-assistance" variant="primary">
                  Get Assistance
                </Button>
              </li>
              <li>
                <Button href={DONATE_GOODS_INQUIRY_HREF} variant="outline">
                  Donate Goods
                </Button>
              </li>
            </ul>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Future photography"
            label="Authentic images of surplus recovery, coordination, and community program activity will appear here — never exploitative beneficiary imagery or invented program facilities."
          />
        </div>
      </Container>
    </Section>
  );
}
