import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
};

/**
 * Builds consistent page metadata with Open Graph and canonical URL.
 * SITE_URL uses a documented placeholder until a production domain is set.
 */
export function buildPageMetadata({
  title,
  description,
  path = "/",
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title === "Home" ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    // Use absolute so the root title template does not append SITE_NAME twice.
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};
