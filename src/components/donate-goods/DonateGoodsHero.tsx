import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import {
  DONATION_INQUIRY_ANCHOR,
  donateGoodsHero,
} from "@/content/donate-goods";

export function DonateGoodsHero() {
  return (
    <Section size="large" tone="cream" aria-labelledby="donate-goods-hero">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {donateGoodsHero.eyebrow}
            </p>
            <Heading id="donate-goods-hero" level="h1" className="mb-5 max-w-xl">
              {donateGoodsHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 max-w-xl text-ink-muted">
              {donateGoodsHero.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href={`#${DONATION_INQUIRY_ANCHOR}`} variant="primary">
                  Start a Donation Inquiry
                </Button>
              </li>
              <li>
                <Button href="/corporate-partners" variant="outline">
                  Become a Corporate Partner
                </Button>
              </li>
            </ul>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Future photography"
            label="Warehouse inventory, donation loading, sorting, and logistics imagery will appear here — never exploitative beneficiary imagery."
          />
        </div>
      </Container>
    </Section>
  );
}
