import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { pages } from "@/content/pages";
import { buildPageMetadata } from "@/lib/metadata";

const page = pages.privacy;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.slug,
});

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      heading={page.heading}
      note="This page is under development. A full privacy policy will be published before forms or analytics collect personal information."
    />
  );
}
