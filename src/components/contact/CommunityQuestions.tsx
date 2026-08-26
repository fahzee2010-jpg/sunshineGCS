import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { contactCommunity } from "@/content/contact";

export function CommunityQuestions() {
  return (
    <Section
      tone="cream"
      aria-labelledby="community-questions-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="community-questions-heading"
            level="h2"
            className="mb-4"
          >
            {contactCommunity.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {contactCommunity.intro}
          </p>
        </div>

        <Grid cols={3}>
          {contactCommunity.items.map((item) => (
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
