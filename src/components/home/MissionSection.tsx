import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { homeMission } from "@/content/home";

export function MissionSection() {
  return (
    <Section aria-labelledby="home-mission-heading">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Heading id="home-mission-heading" level="h2" className="mb-4">
            {homeMission.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{homeMission.intro}</p>
        </div>

        <Grid cols={3}>
          {homeMission.pillars.map((pillar, index) => (
            <Card key={pillar.title} as="article">
              <p className="text-caption mb-3 font-semibold text-community-green">
                Step {index + 1}
              </p>
              <Heading level="h3" className="mb-1">
                {pillar.title}
              </Heading>
              <p className="mb-3 font-semibold text-charcoal">
                {pillar.subtitle}
              </p>
              <p className="text-body-sm">{pillar.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
