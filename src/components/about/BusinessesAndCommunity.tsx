import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { aboutTogether } from "@/content/about";

export function BusinessesAndCommunity() {
  return (
    <Section aria-labelledby="together-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="together-heading" level="h2" className="mb-4">
            {aboutTogether.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{aboutTogether.intro}</p>
        </div>

        <Grid cols={2}>
          {aboutTogether.cards.map((card) => (
            <Card key={card.title} as="article" muted>
              <Heading level="h3" className="mb-2">
                {card.title}
              </Heading>
              <p className="text-body-sm">{card.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
