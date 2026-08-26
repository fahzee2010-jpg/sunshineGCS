import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { contactPrivacy } from "@/content/contact";

export function ContactPrivacy() {
  return (
    <Section
      tone="cream"
      aria-labelledby="contact-privacy-heading"
      className="border-y border-border"
      size="compact"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="contact-privacy-heading" level="h2" className="mb-3">
            {contactPrivacy.heading}
          </Heading>
          <p className="text-body mb-3 text-ink-muted">{contactPrivacy.body}</p>
          <p className="text-body-sm">
            <TextLink href="/privacy">{contactPrivacy.privacyLabel}</TextLink>
          </p>
        </div>
      </Container>
    </Section>
  );
}
