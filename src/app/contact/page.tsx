import type { Metadata } from "next";
import { BusinessInquiries } from "@/components/contact/BusinessInquiries";
import { ChooseTheRightPathway } from "@/components/contact/ChooseTheRightPathway";
import { CommunityQuestions } from "@/components/contact/CommunityQuestions";
import { ContactEmergencyNotice } from "@/components/contact/ContactEmergencyNotice";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactFinalCta } from "@/components/contact/ContactFinalCta";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInformationStatus } from "@/components/contact/ContactInformationStatus";
import { ContactPrivacy } from "@/components/contact/ContactPrivacy";
import { GeneralInquiriesPlaceholder } from "@/components/contact/GeneralInquiriesPlaceholder";
import { ResponseExpectations } from "@/components/contact/ResponseExpectations";
import { contactSeo } from "@/content/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = contactSeo.title;
const pageUrl = new URL("/contact", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: contactSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: contactSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: contactSeo.description,
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInformationStatus />
      <ChooseTheRightPathway />
      <BusinessInquiries />
      <CommunityQuestions />
      <GeneralInquiriesPlaceholder />
      <ContactPrivacy />
      <ResponseExpectations />
      <ContactEmergencyNotice />
      <ContactFaq />
      <ContactFinalCta />
    </>
  );
}
