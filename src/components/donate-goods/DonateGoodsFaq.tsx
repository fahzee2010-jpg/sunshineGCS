import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsFaq } from "@/content/donate-goods";

/**
 * Accessible FAQ using native details/summary — keyboard and screen-reader friendly
 * without custom accordion JavaScript.
 */
export function DonateGoodsFaq() {
  return (
    <Section aria-labelledby="donate-goods-faq-heading">
      <Container>
        <Heading id="donate-goods-faq-heading" level="h2" className="mb-8">
          {donateGoodsFaq.heading}
        </Heading>

        <div className="mx-auto max-w-3xl space-y-3">
          {donateGoodsFaq.items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-summary">
                <span className="faq-summary-text">{item.question}</span>
              </summary>
              <div className="faq-panel">
                <p className="text-body text-ink-muted">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
