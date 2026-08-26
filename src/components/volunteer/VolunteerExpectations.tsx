import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { volunteerExpectations } from "@/content/volunteer";

export function VolunteerExpectations() {
  return (
    <Section aria-labelledby="volunteer-expectations-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Heading
            id="volunteer-expectations-heading"
            level="h2"
            className="mb-4"
          >
            {volunteerExpectations.heading}
          </Heading>
          <p className="text-body-lg mb-6 text-ink-muted">
            {volunteerExpectations.intro}
          </p>
          <ul className="mb-6 space-y-3">
            {volunteerExpectations.items.map((item) => (
              <li key={item} className="flex gap-3 text-body text-charcoal">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-sunshine-gold"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink-muted">
            {volunteerExpectations.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
