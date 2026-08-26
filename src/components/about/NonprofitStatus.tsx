import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { aboutStatus } from "@/content/about";

export function NonprofitStatus() {
  return (
    <Section aria-labelledby="nonprofit-status-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading id="nonprofit-status-heading" level="h2" className="mb-6">
            {aboutStatus.heading}
          </Heading>
          <ul className="mb-6 space-y-3 text-left sm:mx-auto sm:max-w-lg">
            {aboutStatus.points.map((point) => (
              <li key={point} className="flex gap-3 text-body text-charcoal">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm mb-8 text-ink-muted">{aboutStatus.note}</p>
          <Button href="/transparency" variant="outline">
            View Transparency
          </Button>
        </div>
      </Container>
    </Section>
  );
}
