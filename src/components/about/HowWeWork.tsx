import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { aboutHowWeWork } from "@/content/about";

export function HowWeWork() {
  return (
    <Section aria-labelledby="how-we-work-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="how-we-work-heading" level="h2" className="mb-4">
            {aboutHowWeWork.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{aboutHowWeWork.intro}</p>
        </div>

        <Grid cols={2}>
          {aboutHowWeWork.steps.map((step, index) => (
            <Card key={step.title} as="article">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-sunshine-gold text-sm font-bold text-charcoal">
                  {index + 1}
                </span>
                <Heading level="h3" className="text-h4">
                  {step.title}
                </Heading>
              </div>
              <p className="text-body-sm">{step.body}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
