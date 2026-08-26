import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { aboutMission } from "@/content/about";

export function AboutMission() {
  return (
    <Section
      tone="cream"
      aria-labelledby="about-mission-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading id="about-mission-heading" level="h2" className="mb-4">
            {aboutMission.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-charcoal">{aboutMission.body}</p>
          <ul className="space-y-3">
            {aboutMission.focus.map((item) => (
              <li key={item} className="flex gap-3 text-body text-ink-muted">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
