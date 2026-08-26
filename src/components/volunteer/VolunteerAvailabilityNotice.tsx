import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { volunteerAvailability } from "@/content/volunteer";

export function VolunteerAvailabilityNotice() {
  return (
    <Section
      size="compact"
      aria-labelledby="volunteer-availability-heading"
    >
      <Container>
        <Alert tone="info">
          <Heading
            id="volunteer-availability-heading"
            level="h2"
            className="mb-2 text-h4"
          >
            {volunteerAvailability.title}
          </Heading>
          <p className="text-body text-ink-muted">
            {volunteerAvailability.body}
          </p>
        </Alert>
      </Container>
    </Section>
  );
}
