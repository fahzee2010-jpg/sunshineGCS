import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { homeCorporate } from "@/content/home";

export function CorporateDonationSection() {
  return (
    <Section
      tone="cream"
      aria-labelledby="home-corporate-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <div>
            <Heading id="home-corporate-heading" level="h2" className="mb-4">
              {homeCorporate.heading}
            </Heading>
            <p className="text-body-lg mb-8 text-ink-muted">
              {homeCorporate.support}
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button href="/donate-goods" variant="primary">
                  Donate Goods
                </Button>
              </li>
              <li>
                <Button href="/corporate-partners" variant="outline">
                  Become a Corporate Partner
                </Button>
              </li>
            </ul>
            <p className="text-body-sm mt-6 max-w-xl border-l-4 border-sunshine-gold pl-4">
              {homeCorporate.taxNote}
            </p>
          </div>

          <ol className="space-y-4">
            {homeCorporate.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <p className="mb-2 text-sm font-bold text-evergreen">
                  <span className="mr-2 inline-flex size-7 items-center justify-center rounded-full bg-sunshine-gold text-charcoal">
                    {index + 1}
                  </span>
                  {step.title}
                </p>
                <p className="text-body-sm pl-9">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
