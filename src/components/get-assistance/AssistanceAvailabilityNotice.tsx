import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceNotice } from "@/content/get-assistance";

export function AssistanceAvailabilityNotice() {
  return (
    <Section
      size="compact"
      aria-labelledby="assistance-availability-heading"
    >
      <Container>
        <Alert tone="info">
          <Heading
            id="assistance-availability-heading"
            level="h2"
            className="mb-2 text-h4"
          >
            {getAssistanceNotice.title}
          </Heading>
          <p className="text-body text-ink-muted">{getAssistanceNotice.body}</p>
        </Alert>
      </Container>
    </Section>
  );
}
