import type { Metadata } from "next";
import { AfterExpressingInterest } from "@/components/volunteer/AfterExpressingInterest";
import { CommunityGroupsAndTeams } from "@/components/volunteer/CommunityGroupsAndTeams";
import { PotentialVolunteerRoles } from "@/components/volunteer/PotentialVolunteerRoles";
import { RespectAndPrivacy } from "@/components/volunteer/RespectAndPrivacy";
import { VolunteerAvailabilityNotice } from "@/components/volunteer/VolunteerAvailabilityNotice";
import { VolunteerExpectations } from "@/components/volunteer/VolunteerExpectations";
import { VolunteerFaq } from "@/components/volunteer/VolunteerFaq";
import { VolunteerFinalCta } from "@/components/volunteer/VolunteerFinalCta";
import { VolunteerHero } from "@/components/volunteer/VolunteerHero";
import { VolunteerInterestPlaceholder } from "@/components/volunteer/VolunteerInterestPlaceholder";
import { WhoCanVolunteer } from "@/components/volunteer/WhoCanVolunteer";
import { WhyVolunteer } from "@/components/volunteer/WhyVolunteer";
import { volunteerSeo } from "@/content/volunteer";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${volunteerSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/volunteer", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: volunteerSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: volunteerSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: volunteerSeo.description,
  },
};

export default function VolunteerPage() {
  return (
    <>
      <VolunteerHero />
      <WhyVolunteer />
      <PotentialVolunteerRoles />
      <VolunteerExpectations />
      <WhoCanVolunteer />
      <VolunteerAvailabilityNotice />
      <AfterExpressingInterest />
      <VolunteerInterestPlaceholder />
      <CommunityGroupsAndTeams />
      <RespectAndPrivacy />
      <VolunteerFaq />
      <VolunteerFinalCta />
    </>
  );
}
