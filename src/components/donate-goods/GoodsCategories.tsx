import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsCategories } from "@/content/donate-goods";

export function GoodsCategories() {
  return (
    <Section
      tone="cream"
      aria-labelledby="goods-categories-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="goods-categories-heading" level="h2" className="mb-4">
            {donateGoodsCategories.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {donateGoodsCategories.intro}
          </p>
        </div>

        <Grid cols={2}>
          {donateGoodsCategories.items.map((item) => (
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
