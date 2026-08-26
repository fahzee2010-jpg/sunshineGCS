import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceWho } from "@/content/get-assistance";

export function WhoMaySeekAssistance() {
  return (
    <Section aria-labelledby="who-may-seek-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="who-may-seek-heading" level="h2" className="mb-4">
            {getAssistanceWho.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{getAssistanceWho.intro}</p>
        </div>

        <Grid cols={2} className="mb-6">
          {getAssistanceWho.audiences.map((audience) => (
            <Card key={audience} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{audience}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body-sm max-w-3xl text-ink-muted">
          {getAssistanceWho.note}
        </p>
      </Container>
    </Section>
  );
}
