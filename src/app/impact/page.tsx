import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import {
  DONATE_GOODS_INQUIRY_HREF,
  impactFinalCta,
  impactGetInvolved,
  impactHero,
  impactMeans,
  impactMeasure,
  impactSeo,
  impactStatus,
  impactTransparency,
} from "@/content/impact";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${impactSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/impact", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: impactSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: impactSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: impactSeo.description,
  },
};

export default function ImpactPage() {
  return (
    <>
      <Section size="large" tone="cream" aria-labelledby="impact-hero-heading">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {impactHero.eyebrow}
            </p>
            <Heading id="impact-hero-heading" level="h1" className="mb-5">
              {impactHero.headline}
            </Heading>
            <p className="text-body-lg text-ink-muted">{impactHero.support}</p>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="what-impact-means-heading">
        <Container>
          <div className="mb-8 max-w-3xl">
            <Heading id="what-impact-means-heading" level="h2" className="mb-4">
              {impactMeans.heading}
            </Heading>
            <p className="text-body-lg text-ink-muted">{impactMeans.intro}</p>
          </div>
          <Grid cols={3}>
            {impactMeans.items.map((item) => (
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
        aria-labelledby="what-we-plan-to-measure-heading"
        className="border-y border-border"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading
              id="what-we-plan-to-measure-heading"
              level="h2"
              className="mb-4"
            >
              {impactMeasure.heading}
            </Heading>
            <p className="text-body-lg mb-6 text-ink-muted">
              {impactMeasure.intro}
            </p>
            <ul className="space-y-3">
              {impactMeasure.items.map((item) => (
                <li key={item} className="flex gap-3 text-body text-charcoal">
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

      <Section size="compact" aria-labelledby="impact-status-heading">
        <Container>
          <Alert tone="info">
            <Heading
              id="impact-status-heading"
              level="h2"
              className="mb-2 text-h4"
            >
              {impactStatus.title}
            </Heading>
            <p className="text-body text-ink-muted">{impactStatus.body}</p>
          </Alert>
        </Container>
      </Section>

      <Section aria-labelledby="impact-transparency-heading" size="compact">
        <Container>
          <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
            <Heading
              id="impact-transparency-heading"
              level="h2"
              className="mb-3"
            >
              {impactTransparency.heading}
            </Heading>
            <p className="text-body mb-6 text-ink-muted">
              {impactTransparency.body}
            </p>
            <Button href="/transparency" variant="outline">
              {impactTransparency.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        tone="cream"
        aria-labelledby="impact-get-involved-heading"
        className="border-y border-border"
      >
        <Container>
          <Heading id="impact-get-involved-heading" level="h2" className="mb-8">
            {impactGetInvolved.heading}
          </Heading>
          <Grid cols={2}>
            {impactGetInvolved.items.map((item) => (
              <Card key={item.title} as="article">
                <Heading level="h3" className="mb-2">
                  {item.title}
                </Heading>
                <p className="text-body-sm mb-6">{item.body}</p>
                <Button href={item.href} variant="secondary">
                  {item.cta}
                </Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section
        size="large"
        className="bg-evergreen text-white"
        aria-labelledby="impact-final-cta-heading"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heading
              id="impact-final-cta-heading"
              level="h2"
              className="mb-4 text-white"
            >
              {impactFinalCta.heading}
            </Heading>
            <p className="mb-8 text-lg text-white/85">{impactFinalCta.support}</p>
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <Button
                  href={DONATE_GOODS_INQUIRY_HREF}
                  variant="primary"
                  className="bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
                >
                  Donate Goods
                </Button>
              </li>
              <li>
                <Button
                  href="/volunteer"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Volunteer
                </Button>
              </li>
              <li>
                <Button
                  href="/corporate-partners"
                  variant="ghost"
                  className="text-sunshine-gold hover:text-white"
                >
                  Corporate Partners
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
