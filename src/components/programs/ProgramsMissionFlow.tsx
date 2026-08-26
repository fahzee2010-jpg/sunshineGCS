import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { programsMissionFlow } from "@/content/programs";

export function ProgramsMissionFlow() {
  return (
    <Section
      tone="cream"
      aria-labelledby="programs-mission-flow-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="programs-mission-flow-heading"
            level="h2"
            className="mb-4"
          >
            {programsMissionFlow.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {programsMissionFlow.intro}
          </p>
        </div>

        <ol className="mx-auto flex max-w-2xl flex-col items-stretch">
          {programsMissionFlow.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center">
              <div className="w-full rounded-lg border border-border bg-surface p-5 sm:p-6">
                <h3 className="text-h4 mb-2">{step.title}</h3>
                <p className="text-body-sm text-ink-muted">{step.body}</p>
              </div>
              {index < programsMissionFlow.steps.length - 1 ? (
                <span
                  className="my-2 text-community-green"
                  aria-hidden="true"
                >
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
