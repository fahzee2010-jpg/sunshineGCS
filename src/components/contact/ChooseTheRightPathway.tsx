import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { contactPathways } from "@/content/contact";

export function ChooseTheRightPathway() {
  return (
    <Section
      tone="cream"
      aria-labelledby="contact-pathways-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="contact-pathways-heading" level="h2" className="mb-4">
            {contactPathways.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{contactPathways.intro}</p>
        </div>

        <Grid cols={2}>
          {contactPathways.items.map((item) => (
            <Card key={item.title} as="article">
              <Heading level="h3" className="mb-2">
                {item.title}
              </Heading>
              <p className="text-body-sm mb-6">{item.body}</p>
              <Button href={item.href} variant="secondary">
                {item.cta}
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
