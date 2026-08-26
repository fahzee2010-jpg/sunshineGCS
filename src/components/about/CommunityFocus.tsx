import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { aboutCommunity } from "@/content/about";

export function CommunityFocus() {
  return (
    <Section
      tone="cream"
      aria-labelledby="community-focus-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <Heading id="community-focus-heading" level="h2" className="mb-4">
            {aboutCommunity.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {aboutCommunity.body}
          </p>
          <p className="text-body-sm border-l-4 border-sunshine-gold pl-4 text-charcoal">
            {aboutCommunity.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
