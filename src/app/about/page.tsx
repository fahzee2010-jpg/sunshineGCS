import type { Metadata } from "next";
import { AboutFinalCta } from "@/components/about/AboutFinalCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { BusinessesAndCommunity } from "@/components/about/BusinessesAndCommunity";
import { CommunityFocus } from "@/components/about/CommunityFocus";
import { HowWeWork } from "@/components/about/HowWeWork";
import { LeadershipGovernance } from "@/components/about/LeadershipGovernance";
import { LookingAhead } from "@/components/about/LookingAhead";
import { NonprofitStatus } from "@/components/about/NonprofitStatus";
import { StewardshipAndTrust } from "@/components/about/StewardshipAndTrust";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { aboutSeo } from "@/content/about";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: aboutSeo.title,
  },
  description: aboutSeo.description,
  alternates: {
    canonical: new URL("/about", SITE_URL).toString(),
  },
  openGraph: {
    title: aboutSeo.title,
    description: aboutSeo.description,
    url: new URL("/about", SITE_URL).toString(),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: aboutSeo.title,
    description: aboutSeo.description,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <AboutMission />
      <HowWeWork />
      <CommunityFocus />
      <BusinessesAndCommunity />
      <StewardshipAndTrust />
      <LeadershipGovernance />
      <NonprofitStatus />
      <LookingAhead />
      <AboutFinalCta />
    </>
  );
}
