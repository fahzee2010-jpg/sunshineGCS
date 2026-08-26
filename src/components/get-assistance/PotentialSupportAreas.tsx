import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceAreas } from "@/content/get-assistance";

export function PotentialSupportAreas() {
  return (
    <Section
      tone="cream"
      aria-labelledby="potential-support-areas-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="potential-support-areas-heading"
            level="h2"
            className="mb-4"
          >
            {getAssistanceAreas.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {getAssistanceAreas.intro}
          </p>
        </div>

        <Grid cols={2}>
          {getAssistanceAreas.items.map((item) => (
            <Card key={item.title} as="article">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Heading level="h3">{item.title}</Heading>
                <Badge tone="green">Developing</Badge>
              </div>
              <p className="text-body-sm">{item.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
