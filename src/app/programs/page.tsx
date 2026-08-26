import type { Metadata } from "next";
import { CommunityCenteredApproach } from "@/components/programs/CommunityCenteredApproach";
import { CommunityStoreProgram } from "@/components/programs/CommunityStoreProgram";
import { EssentialGoodsProgram } from "@/components/programs/EssentialGoodsProgram";
import { FoodRecoveryProgram } from "@/components/programs/FoodRecoveryProgram";
import { FuturePrograms } from "@/components/programs/FuturePrograms";
import { HowToEngage } from "@/components/programs/HowToEngage";
import { ProgramAvailabilityNote } from "@/components/programs/ProgramAvailabilityNote";
import { ProgramsFaq } from "@/components/programs/ProgramsFaq";
import { ProgramsFinalCta } from "@/components/programs/ProgramsFinalCta";
import { ProgramsHero } from "@/components/programs/ProgramsHero";
import { ProgramsMissionFlow } from "@/components/programs/ProgramsMissionFlow";
import { ProgramsOverview } from "@/components/programs/ProgramsOverview";
import { programsSeo } from "@/content/programs";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const pageTitle = `${programsSeo.title} | ${SITE_NAME}`;
const pageUrl = new URL("/programs", SITE_URL).toString();

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: programsSeo.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: programsSeo.description,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: programsSeo.description,
  },
};

export default function ProgramsPage() {
  return (
    <>
      <ProgramsHero />
      <ProgramsOverview />
      <FoodRecoveryProgram />
      <EssentialGoodsProgram />
      <CommunityStoreProgram />
      <FuturePrograms />
      <ProgramsMissionFlow />
      <CommunityCenteredApproach />
      <HowToEngage />
      <ProgramAvailabilityNote />
      <ProgramsFaq />
      <ProgramsFinalCta />
    </>
  );
}
