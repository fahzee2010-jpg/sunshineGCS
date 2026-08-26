import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { contactChannels } from "@/content/contact";

export function ContactInformationStatus() {
  return (
    <Section aria-labelledby="contact-channels-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="contact-channels-heading" level="h2">
              {contactChannels.heading}
            </Heading>
            <Badge tone="muted">Being finalized</Badge>
          </div>
          <p className="text-body-lg text-ink-muted">{contactChannels.intro}</p>
        </div>

        <Grid cols={3}>
          {contactChannels.items.map((item) => (
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
