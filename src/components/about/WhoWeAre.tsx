import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { aboutWhoWeAre } from "@/content/about";

export function WhoWeAre() {
  return (
    <Section aria-labelledby="who-we-are-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="who-we-are-heading" level="h2" className="mb-4">
            {aboutWhoWeAre.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {aboutWhoWeAre.intro}
          </p>

          <p className="text-caption mb-3 font-semibold tracking-wide text-community-green uppercase">
            {aboutWhoWeAre.modelLabel}
          </p>
          <ol className="mb-8 space-y-3">
            {aboutWhoWeAre.modelSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-evergreen text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-medium text-charcoal">{step}</span>
                {index < aboutWhoWeAre.modelSteps.length - 1 ? (
                  <span className="sr-only">then</span>
                ) : null}
              </li>
            ))}
          </ol>

          <p className="text-body text-ink-muted">{aboutWhoWeAre.body}</p>
        </div>
      </Container>
    </Section>
  );
}
