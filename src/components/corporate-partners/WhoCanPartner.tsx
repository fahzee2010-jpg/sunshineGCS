import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { corporatePartnersWho } from "@/content/corporate-partners";

export function WhoCanPartner() {
  return (
    <Section aria-labelledby="who-can-partner-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="who-can-partner-heading" level="h2" className="mb-4">
            {corporatePartnersWho.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {corporatePartnersWho.intro}
          </p>
        </div>

        <Grid cols={4} className="mb-6">
          {corporatePartnersWho.audiences.map((audience) => (
            <Card key={audience} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{audience}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body max-w-3xl text-ink-muted">
          {corporatePartnersWho.note}
        </p>
      </Container>
    </Section>
  );
}
