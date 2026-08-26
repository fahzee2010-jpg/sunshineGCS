import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { volunteerRoles } from "@/content/volunteer";

export function PotentialVolunteerRoles() {
  return (
    <Section
      tone="cream"
      aria-labelledby="potential-roles-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="potential-roles-heading" level="h2" className="mb-4">
            {volunteerRoles.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{volunteerRoles.intro}</p>
        </div>

        <Grid cols={2}>
          {volunteerRoles.items.map((item) => (
            <Card key={item.title} as="article">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Heading level="h3">{item.title}</Heading>
                <Badge tone="muted">Potential</Badge>
              </div>
              <p className="text-body-sm">{item.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
