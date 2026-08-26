import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { volunteerWhy } from "@/content/volunteer";

export function WhyVolunteer() {
  return (
    <Section aria-labelledby="why-volunteer-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="why-volunteer-heading" level="h2" className="mb-4">
            {volunteerWhy.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{volunteerWhy.intro}</p>
        </div>

        <Grid cols={2}>
          {volunteerWhy.items.map((item) => (
            <Card key={item.title} as="article">
              <Heading level="h3" className="mb-2">
                {item.title}
              </Heading>
              <p className="text-body-sm">{item.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
