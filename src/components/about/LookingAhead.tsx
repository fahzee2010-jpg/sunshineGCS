import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { aboutFuture } from "@/content/about";

export function LookingAhead() {
  return (
    <Section tone="cream" aria-labelledby="looking-ahead-heading" size="compact">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="looking-ahead-heading" level="h2" className="mb-4">
            {aboutFuture.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{aboutFuture.body}</p>
        </div>
      </Container>
    </Section>
  );
}
