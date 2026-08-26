import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsWho } from "@/content/donate-goods";

export function WhoCanDonate() {
  return (
    <Section aria-labelledby="who-can-donate-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="who-can-donate-heading" level="h2" className="mb-4">
            {donateGoodsWho.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{donateGoodsWho.intro}</p>
        </div>

        <Grid cols={3} className="mb-6">
          {donateGoodsWho.audiences.map((audience) => (
            <Card key={audience} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{audience}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body max-w-3xl text-ink-muted">
          {donateGoodsWho.note}
        </p>
      </Container>
    </Section>
  );
}
