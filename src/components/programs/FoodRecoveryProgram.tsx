import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { programsFood } from "@/content/programs";

export function FoodRecoveryProgram() {
  return (
    <Section
      tone="cream"
      aria-labelledby="food-recovery-heading"
      className="border-y border-border"
    >
      <Container>
        <article className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="food-recovery-heading" level="h2">
              {programsFood.heading}
            </Heading>
            <Badge tone="green">{programsFood.status}</Badge>
          </div>
          <p className="text-body-lg mb-6 text-ink-muted">{programsFood.body}</p>
          <p className="text-body mb-4 font-medium text-charcoal">
            {programsFood.considerationsIntro}
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {programsFood.considerations.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span className="text-body text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">{programsFood.note}</p>
        </article>
      </Container>
    </Section>
  );
}
