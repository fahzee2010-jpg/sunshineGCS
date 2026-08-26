import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsInfoNeeded } from "@/content/donate-goods";

export function InfoNeeded() {
  return (
    <Section aria-labelledby="info-needed-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="info-needed-heading" level="h2" className="mb-4">
            {donateGoodsInfoNeeded.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">
            {donateGoodsInfoNeeded.intro}
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {donateGoodsInfoNeeded.fields.map((field) => (
            <li
              key={field}
              className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3"
            >
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-sunshine-gold"
                aria-hidden="true"
              />
              <span className="text-body font-medium text-charcoal">{field}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
