import type { Metadata } from "next";
import { AfterAnInquiry } from "@/components/get-assistance/AfterAnInquiry";
import { AssistanceAvailabilityNotice } from "@/components/get-assistance/AssistanceAvailabilityNotice";
import { AssistanceRequestPlaceholder } from "@/components/get-assistance/AssistanceRequestPlaceholder";
import { EligibilityGuidance } from "@/components/get-assistance/EligibilityGuidance";
import { EmergencyNotice } from "@/components/get-assistance/EmergencyNotice";
import { GetAssistanceFaq } from "@/components/get-assistance/GetAssistanceFaq";
import { GetAssistanceFinalCta } from "@/components/get-assistance/GetAssistanceFinalCta";
import { GetAssistanceHero } from "@/components/get-assistance/GetAssistanceHero";
import { HowAssistanceWorks } from "@/components/get-assistance/HowAssistanceWorks";
import { InformationThatMayBeRequested } from "@/components/get-assistance/InformationThatMayBeRequested";
import { PotentialSupportAreas } from "@/components/get-assistance/PotentialSupportAreas";
import { WhoMaySeekAssistance } from "@/components/get-assistance/WhoMaySeekAssistance";
import { getAssistanceSeo } from "@/content/get-assistance";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${getAssistanceSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/get-assistance", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: getAssistanceSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: getAssistanceSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: getAssistanceSeo.description,
  },
};

export default function GetAssistancePage() {
  return (
    <>
      <GetAssistanceHero />
      <AssistanceAvailabilityNotice />
      <HowAssistanceWorks />
      <PotentialSupportAreas />
      <WhoMaySeekAssistance />
      <EligibilityGuidance />
      <InformationThatMayBeRequested />
      <AfterAnInquiry />
      <EmergencyNotice />
      <AssistanceRequestPlaceholder />
      <GetAssistanceFaq />
      <GetAssistanceFinalCta />
    </>
  );
}
