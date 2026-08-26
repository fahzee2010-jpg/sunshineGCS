import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { programsEssentials } from "@/content/programs";

export function EssentialGoodsProgram() {
  return (
    <Section aria-labelledby="essential-goods-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="essential-goods-heading" level="h2">
              {programsEssentials.heading}
            </Heading>
            <Badge tone="green">{programsEssentials.status}</Badge>
          </div>
          <p className="text-body-lg mb-4 text-ink-muted">
            {programsEssentials.body}
          </p>
          <p className="text-body font-medium text-charcoal">
            {programsEssentials.categoriesIntro}
          </p>
        </div>

        <Grid cols={2} className="mb-6">
          {programsEssentials.categories.map((category) => (
            <Card key={category} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{category}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-body-sm max-w-3xl text-ink-muted">
          {programsEssentials.note}
        </p>
      </Container>
    </Section>
  );
}
