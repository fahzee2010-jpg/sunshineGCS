import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";

type PlaceholderPageProps = {
  heading: string;
  note?: string;
};

export function PlaceholderPage({
  heading,
  note = "This page is under development. Content will be published once approved.",
}: PlaceholderPageProps) {
  return (
    <Section size="compact">
      <Container>
        <Badge tone="muted">Under development</Badge>
        <Heading level="h1" className="mt-4 mb-4">
          {heading}
        </Heading>
        <p className="text-body-lg mb-8 max-w-2xl text-ink-muted">{note}</p>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </Container>
    </Section>
  );
}
