import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { corporatePartnersWhy } from "@/content/corporate-partners";

export function WhyPartner() {
  return (
    <Section aria-labelledby="why-partner-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="why-partner-heading" level="h2" className="mb-4">
            {corporatePartnersWhy.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {corporatePartnersWhy.intro}
          </p>
        </div>

        <Grid cols={2}>
          {corporatePartnersWhy.items.map((item) => (
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
