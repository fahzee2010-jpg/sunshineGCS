import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { homePrograms } from "@/content/home";

export function ProgramsPreview() {
  return (
    <Section aria-labelledby="home-programs-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="home-programs-heading" level="h2" className="mb-4">
            {homePrograms.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{homePrograms.intro}</p>
        </div>

        <Grid cols={3} className="mb-8">
          {homePrograms.items.map((item) => (
            <Card key={item.title} as="article" muted>
              <Heading level="h3" className="mb-2">
                {item.title}
              </Heading>
              <p className="text-body-sm">{item.body}</p>
            </Card>
          ))}
        </Grid>

        <Button href="/programs" variant="outline">
          Explore Programs
        </Button>
      </Container>
    </Section>
  );
}
