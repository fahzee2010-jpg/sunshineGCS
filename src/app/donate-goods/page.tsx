import type { Metadata } from "next";
import { DonationInquirySection } from "@/components/donate-goods/DonationInquirySection";
import { DonateGoodsFaq } from "@/components/donate-goods/DonateGoodsFaq";
import { DonateGoodsFinalCta } from "@/components/donate-goods/DonateGoodsFinalCta";
import { DonateGoodsHero } from "@/components/donate-goods/DonateGoodsHero";
import { DonationProcess } from "@/components/donate-goods/DonationProcess";
import { GoodsCategories } from "@/components/donate-goods/GoodsCategories";
import { InfoNeeded } from "@/components/donate-goods/InfoNeeded";
import { LogisticsNote } from "@/components/donate-goods/LogisticsNote";
import { PartnershipCta } from "@/components/donate-goods/PartnershipCta";
import { ReviewNote } from "@/components/donate-goods/ReviewNote";
import { TaxInformation } from "@/components/donate-goods/TaxInformation";
import { WhoCanDonate } from "@/components/donate-goods/WhoCanDonate";
import { donateGoodsSeo } from "@/content/donate-goods";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: donateGoodsSeo.title,
  description: donateGoodsSeo.description,
  path: "/donate-goods",
});

export default function DonateGoodsPage() {
  return (
    <>
      <DonateGoodsHero />
      <WhoCanDonate />
      <GoodsCategories />
      <InfoNeeded />
      <DonationProcess />
      <ReviewNote />
      <PartnershipCta />
      <TaxInformation />
      <LogisticsNote />
      <DonateGoodsFaq />
      <DonationInquirySection />
      <DonateGoodsFinalCta />
    </>
  );
}
