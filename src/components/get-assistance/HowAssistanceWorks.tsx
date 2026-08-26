import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { getAssistanceHowItWorks } from "@/content/get-assistance";

export function HowAssistanceWorks() {
  return (
    <Section aria-labelledby="how-assistance-works-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading
            id="how-assistance-works-heading"
            level="h2"
            className="mb-4"
          >
            {getAssistanceHowItWorks.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {getAssistanceHowItWorks.intro}
          </p>
        </div>

        <ol className="grid gap-4 lg:grid-cols-2">
          {getAssistanceHowItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-lg border border-border bg-surface p-5 sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-evergreen text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-h4">{step.title}</h3>
              </div>
              <p className="text-body-sm pl-11 text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
