import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { volunteerWho } from "@/content/volunteer";

export function WhoCanVolunteer() {
  return (
    <Section
      tone="cream"
      aria-labelledby="who-can-volunteer-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="who-can-volunteer-heading" level="h2" className="mb-4">
            {volunteerWho.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{volunteerWho.intro}</p>
        </div>

        <Grid cols={3} className="mb-6">
          {volunteerWho.audiences.map((audience) => (
            <Card key={audience} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{audience}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body-sm max-w-3xl text-ink-muted">
          {volunteerWho.note}
        </p>
      </Container>
    </Section>
  );
}
