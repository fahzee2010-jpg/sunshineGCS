import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { getAssistanceInfoRequested } from "@/content/get-assistance";

export function InformationThatMayBeRequested() {
  return (
    <Section aria-labelledby="info-may-be-requested-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="info-may-be-requested-heading"
            level="h2"
            className="mb-4"
          >
            {getAssistanceInfoRequested.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {getAssistanceInfoRequested.intro}
          </p>
        </div>

        <ul className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {getAssistanceInfoRequested.fields.map((field) => (
            <li
              key={field}
              className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3"
            >
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-community-green"
                aria-hidden="true"
              />
              <span className="text-body font-medium text-charcoal">{field}</span>
            </li>
          ))}
        </ul>

        <div className="max-w-3xl space-y-3">
          <p className="text-body-sm text-ink-muted">
            {getAssistanceInfoRequested.note}
          </p>
          <p className="text-body-sm">
            <TextLink href="/privacy">
              {getAssistanceInfoRequested.privacyLabel}
            </TextLink>
          </p>
        </div>
      </Container>
    </Section>
  );
}
