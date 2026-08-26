import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { programsApproach } from "@/content/programs";

export function CommunityCenteredApproach() {
  return (
    <Section aria-labelledby="community-approach-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="community-approach-heading" level="h2" className="mb-4">
            {programsApproach.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{programsApproach.intro}</p>
        </div>

        <Grid cols={2}>
          {programsApproach.principles.map((principle) => (
            <Card key={principle.title} as="article">
              <Heading level="h3" className="mb-2">
                {principle.title}
              </Heading>
              <p className="text-body-sm">{principle.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
