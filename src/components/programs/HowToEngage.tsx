import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { programsEngage } from "@/content/programs";

export function HowToEngage() {
  return (
    <Section
      tone="cream"
      aria-labelledby="how-to-engage-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="how-to-engage-heading" level="h2" className="mb-4">
            {programsEngage.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{programsEngage.intro}</p>
        </div>

        <Grid cols={2}>
          {programsEngage.pathways.map((pathway) => (
            <Card key={pathway.title} as="article">
              <Heading level="h3" className="mb-2">
                {pathway.title}
              </Heading>
              <p className="text-body-sm mb-6">{pathway.body}</p>
              <Button href={pathway.href} variant="secondary">
                {pathway.cta}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
