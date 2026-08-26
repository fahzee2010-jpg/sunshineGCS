import type { Metadata } from "next";
import { CorporateLogistics } from "@/components/corporate-partners/CorporateLogistics";
import { CorporatePartnersFaq } from "@/components/corporate-partners/CorporatePartnersFaq";
import { CorporatePartnersFinalCta } from "@/components/corporate-partners/CorporatePartnersFinalCta";
import { CorporatePartnersHero } from "@/components/corporate-partners/CorporatePartnersHero";
import { CorporateTaxInformation } from "@/components/corporate-partners/CorporateTaxInformation";
import { InfoToPrepare } from "@/components/corporate-partners/InfoToPrepare";
import { OngoingRelationships } from "@/components/corporate-partners/OngoingRelationships";
import { PartnershipForms } from "@/components/corporate-partners/PartnershipForms";
import { PartnershipInquiryCta } from "@/components/corporate-partners/PartnershipInquiryCta";
import { PartnershipProcess } from "@/components/corporate-partners/PartnershipProcess";
import { WhatWeMayConsider } from "@/components/corporate-partners/WhatWeMayConsider";
import { WhoCanPartner } from "@/components/corporate-partners/WhoCanPartner";
import { WhyPartner } from "@/components/corporate-partners/WhyPartner";
import { corporatePartnersSeo } from "@/content/corporate-partners";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${corporatePartnersSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/corporate-partners", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: corporatePartnersSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: corporatePartnersSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: corporatePartnersSeo.description,
  },
};

export default function CorporatePartnersPage() {
  return (
    <>
      <CorporatePartnersHero />
      <WhyPartner />
      <PartnershipForms />
      <WhoCanPartner />
      <WhatWeMayConsider />
      <PartnershipProcess />
      <InfoToPrepare />
      <CorporateLogistics />
      <OngoingRelationships />
      <CorporateTaxInformation />
      <PartnershipInquiryCta />
      <CorporatePartnersFaq />
      <CorporatePartnersFinalCta />
    </>
  );
}
