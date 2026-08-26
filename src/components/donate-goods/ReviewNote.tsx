import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { donateGoodsReviewNote } from "@/content/donate-goods";

export function ReviewNote() {
  return (
    <Section aria-labelledby="review-note-heading" size="compact">
      <Container>
        <Alert tone="info" className="border-l-4 border-l-sunshine-gold p-6 sm:p-8">
          <Heading id="review-note-heading" level="h2" className="mb-3">
            {donateGoodsReviewNote.heading}
          </Heading>
          <p className="text-body text-charcoal">{donateGoodsReviewNote.body}</p>
        </Alert>
      </Container>
    </Section>
  );
}
