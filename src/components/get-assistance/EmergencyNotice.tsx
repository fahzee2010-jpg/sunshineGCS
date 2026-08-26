import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceEmergency } from "@/content/get-assistance";

export function EmergencyNotice() {
  return (
    <Section size="compact" aria-labelledby="emergency-notice-heading">
      <Container>
        <Alert tone="info">
          <Heading
            id="emergency-notice-heading"
            level="h2"
            className="mb-2 text-h4"
          >
            {getAssistanceEmergency.heading}
          </Heading>
          <p className="text-body text-ink-muted">
            {getAssistanceEmergency.body}
          </p>
        </Alert>
      </Container>
    </Section>
  );
}
