/**
 * Donate Money page copy for Sunshine Global Community Services.
 * Informational only — no payment processor, donation form, bank
 * details, EIN, or invented financial claims.
 */

import { DONATION_INQUIRY_ANCHOR } from "@/content/donate-goods";

export const donateSeo = {
  title: "Donate Money",
  description:
    "Learn how financial support may help Sunshine Global Community Services develop charitable programs and community support initiatives.",
};

export const DONATE_GOODS_INQUIRY_HREF = `/donate-goods#${DONATION_INQUIRY_ANCHOR}`;

export const donateHero = {
  eyebrow: "Donate Money",
  headline: "Support Sunshine's Mission",
  support:
    "Financial contributions can help Sunshine develop and operate charitable programs connecting usable resources with community needs. An official online donation method will be published once confirmed.",
};

export const donateWhy = {
  heading: "Why give",
  intro:
    "Monetary support may help Sunshine prepare for and sustain community-focused work as programs develop.",
  items: [
    "Program development",
    "Community support",
    "Charitable recovery activities",
    "Operational needs",
    "Future program readiness",
  ],
};

export const donateHow = {
  heading: "How donations help",
  items: [
    {
      title: "Support Programs",
      body: "Financial gifts may help Sunshine develop charitable programs that connect resources with community needs.",
    },
    {
      title: "Support Operations",
      body: "Contributions can help with practical operational needs as the organization builds capacity.",
    },
    {
      title: "Support Community Needs",
      body: "Support may help Sunshine prepare to respond thoughtfully as community needs and resources evolve.",
    },
  ],
};

export const donateStatus = {
  title: "Online monetary donations are not yet available",
  body: "Sunshine is preparing the appropriate donation process. An official donation method will be published once confirmed. This page does not accept payments and does not publish bank details, mailing addresses for checks, or payment processor links.",
};

export const donateTax = {
  heading: "Tax information",
  body: "Sunshine Global Community Services is an Illinois nonprofit organization and is described on this website as a 501(c)(3) public charity. Donors should consult their own tax advisor regarding the tax treatment of any contribution.",
};

export const donateOtherWays = {
  heading: "Other ways to help",
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

export const donateFinalCta = {
  heading: "Help Turn Resources Into Community Support",
  support:
    "While online monetary donations are being prepared, you can still explore other ways to support Sunshine's mission.",
};
