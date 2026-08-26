import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { programsStore } from "@/content/programs";

export function CommunityStoreProgram() {
  return (
    <Section
      tone="cream"
      aria-labelledby="community-store-heading"
      className="border-y border-border"
    >
      <Container>
        <article className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Heading id="community-store-heading" level="h2">
              {programsStore.heading}
            </Heading>
            <Badge tone="gold">{programsStore.status}</Badge>
          </div>
          <p className="text-body-lg mb-6 text-ink-muted">{programsStore.body}</p>
          <p className="text-body mb-4 font-medium text-charcoal">
            {programsStore.conceptIntro}
          </p>
          <ul className="mb-6 space-y-3">
            {programsStore.points.map((point) => (
              <li key={point} className="flex gap-3 text-body text-charcoal">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-community-green"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">{programsStore.note}</p>
        </article>
      </Container>
    </Section>
  );
}
