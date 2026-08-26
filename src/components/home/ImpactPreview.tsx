import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { homeImpact } from "@/content/home";

export function ImpactPreview() {
  return (
    <Section
      tone="cream"
      aria-labelledby="home-impact-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Badge tone="muted">{homeImpact.status}</Badge>
          <Heading id="home-impact-heading" level="h2" className="mt-4 mb-4">
            {homeImpact.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{homeImpact.support}</p>
        </div>

        <Grid cols={3}>
          {homeImpact.labels.map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface px-5 py-6"
            >
              <p className="text-h4 mb-2">{label}</p>
              <p className="text-body-sm text-community-green font-medium">
                {homeImpact.status}
              </p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
