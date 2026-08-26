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
  donateFinalCta,
  donateHero,
  donateHow,
  donateOtherWays,
  donateSeo,
  donateStatus,
  donateTax,
  donateWhy,
} from "@/content/donate";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${donateSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/donate", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: donateSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: donateSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: donateSeo.description,
  },
};

export default function DonatePage() {
  return (
    <>
      <Section size="large" tone="cream" aria-labelledby="donate-hero-heading">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-community-green uppercase">
              {donateHero.eyebrow}
            </p>
            <Heading id="donate-hero-heading" level="h1" className="mb-5">
              {donateHero.headline}
            </Heading>
            <p className="text-body-lg mb-8 text-ink-muted">
              {donateHero.support}
            </p>
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <Button href="#other-ways-to-help" variant="primary">
                  Explore Ways to Help
                </Button>
              </li>
              <li>
                <Button href={DONATE_GOODS_INQUIRY_HREF} variant="outline">
                  Donate Goods
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="why-give-heading">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading id="why-give-heading" level="h2" className="mb-4">
              {donateWhy.heading}
            </Heading>
            <p className="text-body-lg mb-6 text-ink-muted">{donateWhy.intro}</p>
            <ul className="space-y-3">
              {donateWhy.items.map((item) => (
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

      <Section
        tone="cream"
        aria-labelledby="how-donations-help-heading"
        className="border-y border-border"
      >
        <Container>
          <Heading id="how-donations-help-heading" level="h2" className="mb-8">
            {donateHow.heading}
          </Heading>
          <Grid cols={3}>
            {donateHow.items.map((item) => (
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

      <Section size="compact" aria-labelledby="donation-status-heading">
        <Container>
          <Alert tone="info">
            <Heading
              id="donation-status-heading"
              level="h2"
              className="mb-2 text-h4"
            >
              {donateStatus.title}
            </Heading>
            <p className="text-body text-ink-muted">{donateStatus.body}</p>
          </Alert>
        </Container>
      </Section>

      <Section aria-labelledby="donate-tax-heading" size="compact">
        <Container>
          <div className="mx-auto max-w-3xl border-l-4 border-sunshine-gold pl-5 sm:pl-6">
            <Heading id="donate-tax-heading" level="h2" className="mb-3">
              {donateTax.heading}
            </Heading>
            <p className="text-body text-ink-muted">{donateTax.body}</p>
          </div>
        </Container>
      </Section>

      <Section
        id="other-ways-to-help"
        tone="cream"
        aria-labelledby="other-ways-heading"
        className="border-y border-border"
      >
        <Container>
          <Heading id="other-ways-heading" level="h2" className="mb-8">
            {donateOtherWays.heading}
          </Heading>
          <Grid cols={2}>
            {donateOtherWays.items.map((item) => (
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
        aria-labelledby="donate-final-cta-heading"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heading
              id="donate-final-cta-heading"
              level="h2"
              className="mb-4 text-white"
            >
              {donateFinalCta.heading}
            </Heading>
            <p className="mb-8 text-lg text-white/85">{donateFinalCta.support}</p>
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
