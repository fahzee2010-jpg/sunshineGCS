import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { contactFaq } from "@/content/contact";

/**
 * Accessible FAQ using native details/summary — keyboard and screen-reader
 * friendly without custom accordion JavaScript.
 */
export function ContactFaq() {
  return (
    <Section aria-labelledby="contact-faq-heading">
      <Container>
        <Heading id="contact-faq-heading" level="h2" className="mb-8">
          {contactFaq.heading}
        </Heading>

        <div className="mx-auto max-w-3xl space-y-3">
          {contactFaq.items.map((item) => (
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
