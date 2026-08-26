import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceAfterInquiry } from "@/content/get-assistance";

export function AfterAnInquiry() {
  return (
    <Section
      tone="cream"
      aria-labelledby="after-inquiry-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="after-inquiry-heading" level="h2" className="mb-4">
            {getAssistanceAfterInquiry.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {getAssistanceAfterInquiry.intro}
          </p>
        </div>

        <ol className="mb-6 grid gap-4 md:grid-cols-3">
          {getAssistanceAfterInquiry.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-lg border border-border bg-surface p-5 sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-sunshine-gold text-sm font-bold text-charcoal">
                  {index + 1}
                </span>
                <h3 className="text-h4">{step.title}</h3>
              </div>
              <p className="text-body-sm text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="text-body-sm max-w-3xl text-ink-muted">
          {getAssistanceAfterInquiry.note}
        </p>
      </Container>
    </Section>
  );
}
