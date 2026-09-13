/**
 * Contact page copy for Sunshine Global Community Services.
 * Use only confirmed public contact details. Do not invent city, days of
 * operation, service area, pickup/drop-off availability, or response times.
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
    "We welcome questions about our programs, donations, volunteering, community assistance, and partnership opportunities.",
};

export type ContactChannelItem = {
  title: string;
  body?: string;
  href?: string;
  accessibilityLabel?: string;
  openInNewTab?: boolean;
  contacts?: Array<{
    label: string;
    value: string;
    href: string;
    accessibilityLabel: string;
  }>;
};

export const contactChannels = {
  heading: "Contact Information",
  intro:
    "Use the contact details below for general questions. For donations, partnerships, assistance, or volunteering, the pathway cards on this page can help you find the most relevant resource.",
  items: [
    {
      title: "General Contact",
      contacts: [
        {
          label: "Email",
          value: "info@sunshineservices.org",
          href: "mailto:info@sunshineservices.org",
          accessibilityLabel:
            "Email Sunshine Global Community Services at info@sunshineservices.org",
        },
        {
          label: "Phone",
          value: "+1 630-880-4123",
          href: "tel:+16308804123",
          accessibilityLabel:
            "Call Sunshine Global Community Services at +1 630-880-4123",
        },
      ],
    },
    {
      title: "Physical Location",
      body: "20 Hampton Rd\nMorris, IL 60450\nUSA",
      href: "https://www.google.com/maps/search/?api=1&query=20+Hampton+Rd%2C+Morris%2C+IL+60450%2C+USA",
      accessibilityLabel:
        "Get directions to Sunshine Global Community Services",
      openInNewTab: true,
    },
    {
      title: "Contact Hours",
      body: "9:00 AM–6:00 PM",
    },
    {
      title: "Service Area",
      body: "Our service area information will be published once confirmed.",
    },
    {
      title: "Donation Pickup / Drop-off",
      body: "Information about donation pickup and drop-off availability will be published once confirmed.",
    },
  ] satisfies ContactChannelItem[],
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
  status: "Public contact details published",
  body: "Public email, phone, location, and contact hours are listed above. This section is not a live contact form, and no personal information is collected on this page.",
  support:
    "For donation, partnership, assistance, or volunteer questions, use the pathway cards on this page or review About, Programs, or Donate Goods.",
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
        "You can reach Sunshine at info@sunshineservices.org or +1 630-880-4123. Contact hours are 9:00 AM–6:00 PM. For donations, partnerships, assistance, or volunteering, use the pathway cards on this page.",
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
        "Sunshine's published physical location is 20 Hampton Road, IL 60450. Visiting availability and related details will be shared when confirmed.",
    },
  ],
};

export const contactFinalCta = {
  heading: "Find the Right Sunshine Resource",
  support:
    "Choose the pathway that best matches your question, or use the public contact details on this page.",
};
