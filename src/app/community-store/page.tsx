import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { pages } from "@/content/pages";
import { buildPageMetadata } from "@/lib/metadata";

const page = pages["community-store"];

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.slug,
});

export default function CommunityStorePage() {
  return (
    <PlaceholderPage
      heading={page.heading}
      note="This page is under development. Store details will be published only when the program is operational and legally ready."
    />
  );
}
