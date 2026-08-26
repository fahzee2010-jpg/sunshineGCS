import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { programsOverview } from "@/content/programs";

export function ProgramsOverview() {
  return (
    <Section aria-labelledby="programs-overview-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="programs-overview-heading" level="h2" className="mb-4">
            {programsOverview.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{programsOverview.intro}</p>
        </div>

        <ol className="mx-auto flex max-w-2xl flex-col items-stretch gap-0">
          {programsOverview.steps.map((step, index) => (
            <li key={step} className="flex flex-col items-center">
              <div className="w-full rounded-lg border border-border bg-surface px-5 py-4 text-center">
                <p className="font-semibold text-evergreen">{step}</p>
              </div>
              {index < programsOverview.steps.length - 1 ? (
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
