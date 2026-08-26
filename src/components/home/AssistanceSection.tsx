import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";
import { homeAssistance } from "@/content/home";

export function AssistanceSection() {
  return (
    <Section aria-labelledby="home-assistance-heading">
      <Container>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 sm:p-10">
          <Heading id="home-assistance-heading" level="h2" className="mb-4">
            {homeAssistance.heading}
          </Heading>
          <p className="text-body-lg mb-8 text-ink-muted">
            {homeAssistance.support}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/get-assistance" variant="secondary">
              Get Assistance
            </Button>
            <TextLink href="/programs" className="font-semibold">
              Explore Programs
            </TextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
