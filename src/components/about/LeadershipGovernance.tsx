import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { aboutLeadership } from "@/content/about";

export function LeadershipGovernance() {
  return (
    <Section aria-labelledby="leadership-governance-heading" size="compact">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="leadership-governance-heading" level="h2" className="mb-4">
            {aboutLeadership.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {aboutLeadership.body}
          </p>
          <Button href="/transparency" variant="outline">
            View Transparency
          </Button>
        </div>
      </Container>
    </Section>
  );
}
