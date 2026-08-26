import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { contactResponse } from "@/content/contact";

export function ResponseExpectations() {
  return (
    <Section size="compact" aria-labelledby="response-expectations-heading">
      <Container>
        <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
          <Heading
            id="response-expectations-heading"
            level="h2"
            className="mb-3"
          >
            {contactResponse.heading}
          </Heading>
          <p className="text-body text-ink-muted">{contactResponse.body}</p>
        </div>
      </Container>
    </Section>
  );
}
