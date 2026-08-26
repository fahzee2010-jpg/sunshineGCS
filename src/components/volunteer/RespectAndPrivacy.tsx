import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { volunteerRespect } from "@/content/volunteer";

export function RespectAndPrivacy() {
  return (
    <Section
      tone="cream"
      aria-labelledby="respect-privacy-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="respect-privacy-heading" level="h2" className="mb-4">
            {volunteerRespect.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {volunteerRespect.intro}
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {volunteerRespect.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-community-green"
                  aria-hidden="true"
                />
                <span className="text-body text-charcoal">{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm mb-3 text-ink-muted">
            {volunteerRespect.note}
          </p>
          <p className="text-body-sm">
            <TextLink href="/privacy">{volunteerRespect.privacyLabel}</TextLink>
          </p>
        </div>
      </Container>
    </Section>
  );
}
