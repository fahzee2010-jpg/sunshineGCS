import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { contactEmergency } from "@/content/contact";

export function ContactEmergencyNotice() {
  return (
    <Section size="compact" aria-labelledby="contact-emergency-heading">
      <Container>
        <Alert tone="info">
          <Heading
            id="contact-emergency-heading"
            level="h2"
            className="mb-2 text-h4"
          >
            {contactEmergency.heading}
          </Heading>
          <p className="text-body text-ink-muted">{contactEmergency.body}</p>
        </Alert>
      </Container>
    </Section>
  );
}
