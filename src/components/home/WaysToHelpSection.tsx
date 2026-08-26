import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { homeWaysToHelp } from "@/content/home";

export function WaysToHelpSection() {
  return (
    <Section tone="cream" aria-labelledby="home-ways-heading">
      <Container>
        <Heading id="home-ways-heading" level="h2" className="mb-8 text-center">
          {homeWaysToHelp.heading}
        </Heading>
        <Grid cols={3}>
          {homeWaysToHelp.cards.map((card) => (
            <Card key={card.title} as="article" className="flex flex-col">
              <Heading level="h3" className="mb-3">
                {card.title}
              </Heading>
              <p className="text-body-sm mb-6 flex-1">{card.body}</p>
              <Button
                href={card.href}
                variant={card.href === "/donate" ? "primary" : "outline"}
                className="self-start"
              >
                {card.cta}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
