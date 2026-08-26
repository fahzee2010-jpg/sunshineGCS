import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { corporatePartnersCategories } from "@/content/corporate-partners";

export function WhatWeMayConsider() {
  return (
    <Section
      tone="cream"
      aria-labelledby="what-we-may-consider-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="what-we-may-consider-heading"
            level="h2"
            className="mb-4"
          >
            {corporatePartnersCategories.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {corporatePartnersCategories.intro}
          </p>
        </div>

        <Grid cols={2}>
          {corporatePartnersCategories.items.map((item) => (
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
