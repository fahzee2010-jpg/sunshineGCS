import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { contactHero } from "@/content/contact";

export function ContactHero() {
  return (
    <Section size="large" tone="cream" aria-labelledby="contact-hero-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {contactHero.eyebrow}
            </p>
            <Heading
              id="contact-hero-heading"
              level="h1"
              className="mb-5 max-w-xl"
            >
              {contactHero.headline}
            </Heading>
            <p className="text-body-lg max-w-xl text-ink-muted">
              {contactHero.support}
            </p>
          </div>

          <MediaPlaceholder
            size="hero"
            title="Future photography"
            label="Authentic community and organizational imagery will appear here — never a fabricated office photograph or invented contact details."
          />
        </div>
      </Container>
    </Section>
  );
}
