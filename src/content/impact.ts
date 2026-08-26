/**
 * Impact page copy for Sunshine Global Community Services.
 * Explains planned measurement and reporting only — no invented
 * statistics, outcomes, partners, or testimonials.
 */

import { DONATION_INQUIRY_ANCHOR } from "@/content/donate-goods";

export const impactSeo = {
  title: "Impact",
  description:
    "Learn how Sunshine Global Community Services plans to measure and report community impact as charitable programs develop and verified information becomes available.",
};

export const DONATE_GOODS_INQUIRY_HREF = `/donate-goods#${DONATION_INQUIRY_ANCHOR}`;

export const impactHero = {
  eyebrow: "Impact",
  headline: "Measuring Our Impact",
  support:
    "Sunshine intends to report on meaningful community impact as programs develop and verified information becomes available. This page explains how we plan to measure and communicate that work — not unsupported results.",
};

export const impactMeans = {
  heading: "What impact means",
  intro:
    "As programs develop, Sunshine's view of impact is grounded in careful, community-centered work.",
  items: [
    {
      title: "Community Support",
      body: "Impact may include connecting appropriate resources with community needs when programs are ready to do so.",
    },
    {
      title: "Resource Recovery",
      body: "Impact can help describe how usable surplus may be recovered and directed through responsible pathways.",
    },
    {
      title: "Responsible Stewardship",
      body: "Impact reporting should reflect thoughtful handling of resources, information, and community trust as programs develop.",
    },
  ],
};

export const impactMeasure = {
  heading: "What we plan to measure",
  intro:
    "Future reporting may include verified information in categories such as those below. These are reporting categories only — not claims that the activities are currently operating, and not numbers.",
  items: [
    "Resources received or distributed",
    "Community participation",
    "Program activity",
    "Volunteer involvement",
    "Other meaningful program measures",
  ],
};

export const impactStatus = {
  title: "Impact reporting will be published as verified information becomes available",
  body: "Sunshine does not want to publish unsupported numbers or claims. Confirmed impact information will appear here only when it can be verified and shared responsibly.",
};

export const impactTransparency = {
  heading: "Transparency",
  body: "Organizational and financial information will be shared through the appropriate transparency materials when available.",
  cta: "View Transparency",
};

export const impactGetInvolved = {
  heading: "Get involved",
  items: [
    {
      title: "Donate Goods",
      body: "Explore donating usable surplus goods.",
      href: `/donate-goods#${DONATION_INQUIRY_ANCHOR}`,
      cta: "Donate Goods",
    },
    {
      title: "Volunteer",
      body: "Explore potential volunteer pathways.",
      href: "/volunteer",
      cta: "Volunteer",
    },
    {
      title: "Corporate Partners",
      body: "Explore ongoing partnership opportunities.",
      href: "/corporate-partners",
      cta: "Corporate Partners",
    },
    {
      title: "Programs",
      body: "Learn about developing programs and initiatives.",
      href: "/programs",
      cta: "Explore Programs",
    },
  ],
};

export const impactFinalCta = {
  heading: "Help Us Build Meaningful Community Impact",
  support:
    "Your participation can help Sunshine prepare for community-centered work as programs develop. Specific outcomes will be reported only when verified.",
};
