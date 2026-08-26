import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import {
  transparencyCommitment,
  transparencyFinancial,
  transparencyFinalCta,
  transparencyGovernance,
  transparencyHero,
  transparencyImpact,
  transparencyOrg,
  transparencyQuestions,
  transparencySeo,
} from "@/content/transparency";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${transparencySeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/transparency", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: transparencySeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: transparencySeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: transparencySeo.description,
  },
};

export default function TransparencyPage() {
  return (
    <>
      <Section
        size="large"
        tone="cream"
        aria-labelledby="transparency-hero-heading"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {transparencyHero.eyebrow}
            </p>
            <Heading id="transparency-hero-heading" level="h1" className="mb-5">
              {transparencyHero.headline}
            </Heading>
            <p className="text-body-lg text-ink-muted">
              {transparencyHero.support}
            </p>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="transparency-commitment-heading">
        <Container>
          <Heading
            id="transparency-commitment-heading"
            level="h2"
            className="mb-8"
          >
            {transparencyCommitment.heading}
          </Heading>
          <Grid cols={3}>
            {transparencyCommitment.items.map((item) => (
              <Card key={item.title} as="article">
                <Heading level="h3" className="mb-2">
                  {item.title}
                </Heading>
                <p className="text-body-sm">{item.body}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section
        tone="cream"
        aria-labelledby="organizational-information-heading"
        className="border-y border-border"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading
              id="organizational-information-heading"
              level="h2"
              className="mb-4"
            >
              {transparencyOrg.heading}
            </Heading>
            <p className="text-body-lg text-ink-muted">{transparencyOrg.body}</p>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="financial-transparency-heading">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading
              id="financial-transparency-heading"
              level="h2"
              className="mb-4"
            >
              {transparencyFinancial.heading}
            </Heading>
            <p className="text-body-lg text-ink-muted">
              {transparencyFinancial.body}
            </p>
          </div>
        </Container>
      </Section>

      <Section
        tone="cream"
        aria-labelledby="governance-heading"
        className="border-y border-border"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading id="governance-heading" level="h2" className="mb-4">
              {transparencyGovernance.heading}
            </Heading>
            <p className="text-body-lg mb-6 text-ink-muted">
              {transparencyGovernance.body}
            </p>
            <Button href="/about" variant="secondary">
              {transparencyGovernance.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="impact-reporting-heading">
        <Container>
          <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
            <Heading id="impact-reporting-heading" level="h2" className="mb-3">
              {transparencyImpact.heading}
            </Heading>
            <p className="text-body mb-6 text-ink-muted">
              {transparencyImpact.body}
            </p>
            <Button href="/impact" variant="outline">
              {transparencyImpact.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        tone="cream"
        aria-labelledby="transparency-questions-heading"
        className="border-y border-border"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading
              id="transparency-questions-heading"
              level="h2"
              className="mb-4"
            >
              {transparencyQuestions.heading}
            </Heading>
            <p className="text-body-lg mb-6 text-ink-muted">
              {transparencyQuestions.body}
            </p>
            <Button href="/contact" variant="secondary">
              {transparencyQuestions.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        size="large"
        className="bg-evergreen text-white"
        aria-labelledby="transparency-final-cta-heading"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heading
              id="transparency-final-cta-heading"
              level="h2"
              className="mb-4 text-white"
            >
              {transparencyFinalCta.heading}
            </Heading>
            <p className="mb-8 text-lg text-white/85">
              {transparencyFinalCta.support}
            </p>
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <Button
                  href="/about"
                  variant="primary"
                  className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
                >
                  About
                </Button>
              </li>
              <li>
                <Button
                  href="/impact"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Impact
                </Button>
              </li>
              <li>
                <Button
                  href="/contact"
                  variant="ghost"
                  className="text-sunshine-gold hover:text-white"
                >
                  Contact
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
