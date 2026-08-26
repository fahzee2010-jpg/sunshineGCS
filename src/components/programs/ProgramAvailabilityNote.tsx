import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { programsDisclaimer } from "@/content/programs";

export function ProgramAvailabilityNote() {
  return (
    <Section size="compact" aria-labelledby="program-availability-heading">
      <Container>
        <Alert tone="info">
          <Heading
            id="program-availability-heading"
            level="h2"
            className="mb-2 text-h4"
          >
            {programsDisclaimer.title}
          </Heading>
          <p className="text-body text-ink-muted">{programsDisclaimer.body}</p>
        </Alert>
      </Container>
    </Section>
  );
}
