import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import {
  DONATE_GOODS_INQUIRY_HREF,
  corporatePartnersHero,
} from "@/content/corporate-partners";

export function CorporatePartnersHero() {
  return (
    <Section
      size="large"
      tone="cream"
      aria-labelledby="corporate-partners-hero"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {corporatePartnersHero.eyebrow}
            </p>
            <Heading
              id="corporate-partners-hero"
              level="h1"
              className="mb-5 max-w-xl"
            >
              {corporatePartnersHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {corporatePartnersHero.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href={DONATE_GOODS_INQUIRY_HREF} variant="primary">
                  Donate Goods
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
            label="Business surplus review, warehouse coordination, and community distribution imagery will appear here — never invented partner logos or staged corporate testimonials."
          />
        </div>
      </Container>
    </Section>
  );
}
