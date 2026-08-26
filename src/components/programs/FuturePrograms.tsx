import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { programsFuture } from "@/content/programs";

export function FuturePrograms() {
  return (
    <Section aria-labelledby="future-programs-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="future-programs-heading" level="h2" className="mb-4">
            {programsFuture.heading}
          </Heading>
          <p className="text-body-lg mb-4 text-ink-muted">
            {programsFuture.intro}
          </p>
          <p className="text-body font-medium text-charcoal">
            {programsFuture.areasIntro}
          </p>
        </div>

        <Grid cols={2} className="mb-6">
          {programsFuture.areas.map((area) => (
            <Card key={area} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{area}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body-sm max-w-3xl text-ink-muted">
          {programsFuture.note}
        </p>
      </Container>
    </Section>
  );
}
