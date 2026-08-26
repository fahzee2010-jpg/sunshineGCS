import type { Metadata } from "next";
import { AssistanceSection } from "@/components/home/AssistanceSection";
import { CorporateDonationSection } from "@/components/home/CorporateDonationSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactPreview } from "@/components/home/ImpactPreview";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { TrustSection } from "@/components/home/TrustSection";
import { WaysToHelpSection } from "@/components/home/WaysToHelpSection";
import { homeSeo } from "@/content/home";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: homeSeo.title,
  },
  description: homeSeo.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: homeSeo.title,
    description: homeSeo.description,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <CorporateDonationSection />
      <AssistanceSection />
      <WaysToHelpSection />
      <ProgramsPreview />
      <ImpactPreview />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
