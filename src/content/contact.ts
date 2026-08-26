/**
 * Contact page copy for Sunshine Global Community Services.
 * Informational only — no live contact form and no invented email,
 * phone, address, hours, contact persons, or response times.
 */

import { DONATION_INQUIRY_ANCHOR } from "@/content/donate-goods";

export const contactSeo = {
  title: "Contact Sunshine Global Community Services",
  description:
    "Find the appropriate Sunshine Global Community Services resource for donation inquiries, corporate partnerships, community programs, assistance information, and volunteer opportunities.",
};

export const DONATE_GOODS_INQUIRY_HREF = `/donate-goods#${DONATION_INQUIRY_ANCHOR}`;

export const contactHero = {
  eyebrow: "Contact",
  headline: "Contact Sunshine Global Community Services",
  support:
    "Sunshine welcomes questions from community members, businesses, volunteers, and organizations. Use this page to find the right pathway while public contact channels are being finalized.",
};

export const contactChannels = {
  heading: "Contact information status",
  intro:
    "Public contact channels are being finalized. Verified details will be published here when confirmed.",
  items: [
    {
      title: "General Contact",
      body: "Public email and phone information will be published once confirmed.",
    },
    {
      title: "Mailing / Physical Location",
      body: "Address information will be published when confirmed.",
    },
    {
      title: "Hours",
      body: "Public operating and contact hours will be published when confirmed.",
    },
  ],
};

export const contactPathways = {
  heading: "Choose the right pathway",
  intro:
    "Many questions already have a dedicated page. Choosing the right pathway helps you find the most useful information.",
  items: [
    {
      title: "Donate Goods",
      body: "For businesses interested in donating usable surplus goods.",
      cta: "Donate Goods",
      href: `/donate-goods#${DONATION_INQUIRY_ANCHOR}`,
    },
    {
      title: "Corporate Partnerships",
      body: "For businesses exploring ongoing partnership opportunities.",
      cta: "Corporate Partners",
      href: "/corporate-partners",
    },
    {
      title: "Get Assistance",
      body: "For people exploring potential community-support programs.",
      cta: "Get Assistance",
      href: "/get-assistance",
    },
    {
      title: "Volunteer",
      body: "For people interested in potential volunteer opportunities.",
      cta: "Volunteer",
      href: "/volunteer",
    },
    {
      title: "Programs",
      body: "To explore developing programs and initiatives.",
      cta: "Explore Programs",
      href: "/programs",
    },
  ],
};

export const contactBusiness = {
  heading: "Business inquiries",
  intro:
    "Businesses interested in donating usable surplus should use the Donate Goods inquiry pathway. Organizations exploring an ongoing relationship can review Corporate Partners.",
  donateLabel: "Donate Goods",
  partnersLabel: "Corporate Partners",
};

export const contactCommunity = {
  heading: "Community questions",
  intro:
    "People with questions about developing programs, potential assistance, or volunteering can start with the pages below. These pages describe developing pathways and do not claim that every program is currently available.",
  items: [
    {
      title: "Programs",
      body: "Review developing programs and initiatives.",
      href: "/programs",
      cta: "Explore Programs",
    },
    {
      title: "Get Assistance",
      body: "Learn how assistance pathways may work as programs develop.",
      href: "/get-assistance",
      cta: "Get Assistance",
    },
    {
      title: "Volunteer",
      body: "Explore potential volunteer interest pathways.",
      href: "/volunteer",
      cta: "Volunteer",
    },
  ],
};

export const contactGeneralPlaceholder = {
  heading: "General Inquiries",
  status: "Pathway being prepared",
  body: "The general contact pathway is being prepared. Verified public contact information will be published when available.",
  support:
    "Until then, visitors can review About, Programs, or Donate Goods for the most relevant information. This is not a live contact form, and no personal information is collected on this page.",
};

export const contactPrivacy = {
  heading: "Privacy",
  body: "Please do not submit sensitive personal information through an unverified or public channel. Sunshine does not request Social Security numbers, financial information, passwords, medical records, or other unnecessary sensitive information on this page.",
  privacyLabel: "Read our Privacy page",
};

export const contactResponse = {
  heading: "Response expectations",
  body: "Response information will be published once Sunshine's contact workflow is finalized. This page does not promise a response time or guarantee that every inquiry will receive a reply.",
};

export const contactEmergency = {
  heading: "Emergency situations",
  body: "This website is not an emergency service. For an immediate emergency, contact the appropriate local emergency service.",
};

export const contactFaq = {
  heading: "Frequently asked questions",
  items: [
    {
      question: "How can I contact Sunshine?",
      answer:
        "Public email, phone, address, and hours will be published once confirmed. Until then, use the pathway cards on this page to find the most relevant Sunshine resource.",
    },
    {
      question: "How can a business donate surplus goods?",
      answer:
        "Businesses interested in donating usable surplus should use the Donate Goods inquiry pathway. That is the approved place to share donation details for review.",
    },
    {
      question: "How can a business explore a partnership?",
      answer:
        "Businesses exploring an ongoing relationship can review the Corporate Partners page for partnership information and next steps.",
    },
    {
      question: "How can I ask about community assistance?",
      answer:
        "Review Get Assistance for information about developing community-support pathways. Confirmed eligibility, locations, and schedules will be published when ready.",
    },
    {
      question: "How can I learn about volunteer opportunities?",
      answer:
        "Review the Volunteer page for potential volunteer pathways. Specific opportunities will be published when confirmed.",
    },
    {
      question: "Can I visit a Sunshine location?",
      answer:
        "Public location, mailing address, and visiting information have not yet been confirmed for publication. Details will be shared when available. This page does not invent a visit address or hours.",
    },
  ],
};

export const contactFinalCta = {
  heading: "Find the Right Sunshine Resource",
  support:
    "Choose the pathway that best matches your question while public contact channels are being finalized.",
};
