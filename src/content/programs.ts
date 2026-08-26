/**
 * Programs page copy for Sunshine Global Community Services.
 * Distinguishes developing, planned, and future programs.
 * Do not invent statistics, locations, eligibility, store details,
 * partners, outcomes, or claims that programs are fully operational.
 */

import { DONATION_INQUIRY_ANCHOR } from "@/content/donate-goods";

export const programsSeo = {
  title: "Programs",
  description:
    "Explore Sunshine Global Community Services programs and developing initiatives that may connect usable resources with community needs through charitable recovery and community support.",
};

export const DONATE_GOODS_INQUIRY_HREF = `/donate-goods#${DONATION_INQUIRY_ANCHOR}`;

export const programsHero = {
  eyebrow: "Programs",
  headline: "Programs That Connect Resources With Community Needs",
  support:
    "Sunshine Global Community Services is developing charitable programs designed to connect usable resources with community needs. Program details will continue to evolve as operations develop.",
};

export const programsOverview = {
  heading: "How resources may reach community programs",
  intro:
    "Usable goods may be reviewed and, when appropriate, directed through charitable programs or other appropriate pathways. Not every donated item follows the same path, and acceptance is never guaranteed.",
  steps: [
    "Resources",
    "Sunshine Review & Coordination",
    "Community Programs",
    "Community Needs",
  ],
};

export const programsFood = {
  heading: "Food Recovery & Distribution",
  status: "Developing",
  body: "Sunshine may explore opportunities to recover usable food and connect appropriate food resources with community needs as programs develop.",
  considerationsIntro:
    "When food opportunities are considered, review may include factors such as:",
  considerations: [
    "Product condition",
    "Packaging",
    "Dates where relevant",
    "Quantity",
    "Handling",
    "Timing",
    "Logistics",
    "Applicable requirements",
  ],
  note: "Food opportunities are subject to review. Sunshine does not claim that all food is accepted, always distributed, or appropriate without careful consideration of applicable requirements.",
};

export const programsEssentials = {
  heading: "Essential Goods Distribution",
  status: "Developing",
  body: "Sunshine may develop opportunities to connect appropriate essential goods with individuals, families, community organizations, or other community needs, subject to review and available capacity.",
  categoriesIntro: "Possible categories may include:",
  categories: [
    "Household essentials",
    "Personal care items",
    "Basic supplies",
    "Other useful goods",
  ],
  note: "Assistance pathways and program details will be shared as they are confirmed. This page does not publish eligibility rules, service hours, addresses, or distribution schedules.",
};

export const programsStore = {
  heading: "Community Store / Affordable Access",
  status: "Planned / Developing",
  body: "Sunshine may develop a community store or other affordable-access model as operations and legal and operational readiness allow.",
  conceptIntro: "The general concept:",
  points: [
    "Appropriate donated goods may potentially be made available through an affordable-access model when suitable.",
    "Details will be provided when the program is operational and ready to share.",
  ],
  note: "This is not presented as an operating store. Sunshine does not publish a store address, hours, opening date, inventory, prices, or eligibility on this page.",
};

export const programsFuture = {
  heading: "Future Programs",
  intro:
    "Sunshine expects its programs to develop as community needs, resources, partnerships, capacity, and operational readiness evolve.",
  areasIntro: "Potential future areas may include:",
  areas: [
    "Additional goods recovery",
    "Community support initiatives",
    "Volunteer-supported activities",
    "Other charitable programs",
  ],
  note: "These are possibilities for exploration over time — not promises of specific programs, launch dates, or facilities.",
};

export const programsMissionFlow = {
  heading: "How programs connect to the mission",
  intro:
    "Programs are one way Sunshine may put its mission into practice as capacity develops.",
  steps: [
    {
      title: "Businesses and donors",
      body: "May provide usable surplus or other support.",
    },
    {
      title: "Sunshine",
      body: "Reviews opportunities and coordinates appropriate pathways.",
    },
    {
      title: "Programs",
      body: "Resources may be used through charitable or community programs when appropriate.",
    },
    {
      title: "Community",
      body: "Programs are intended to support community needs as they develop.",
    },
  ],
};

export const programsApproach = {
  heading: "A community-centered approach",
  intro:
    "Sunshine aims to develop programs carefully, with community needs and responsible stewardship in mind.",
  principles: [
    {
      title: "Responsible review",
      body: "Opportunities are considered individually.",
    },
    {
      title: "Community focus",
      body: "Program development is informed by community needs and available resources.",
    },
    {
      title: "Practical coordination",
      body: "Logistics, timing, condition, quantity, and other relevant factors are considered.",
    },
    {
      title: "Responsible stewardship",
      body: "Resources are handled thoughtfully and transparently.",
    },
    {
      title: "Developing responsibly",
      body: "Programs are introduced as operational and legal requirements are ready.",
    },
  ],
};

export const programsEngage = {
  heading: "How to engage",
  intro:
    "Different people and organizations can explore participation as Sunshine's programs take shape.",
  pathways: [
    {
      title: "Businesses",
      body: "Explore donating usable surplus.",
      cta: "Donate Goods",
      href: `/donate-goods#${DONATION_INQUIRY_ANCHOR}`,
    },
    {
      title: "Corporate partners",
      body: "Explore an ongoing relationship.",
      cta: "Corporate Partners",
      href: "/corporate-partners",
    },
    {
      title: "Community members",
      body: "Learn about assistance as details become available.",
      cta: "Get Assistance",
      href: "/get-assistance",
    },
    {
      title: "Volunteers",
      body: "Explore opportunities to contribute time and skills when available.",
      cta: "Volunteer",
      href: "/volunteer",
    },
  ],
};

export const programsDisclaimer = {
  title: "Program availability",
  body: "Program availability and details may change as Sunshine develops its operations. Information about eligibility, locations, schedules, and specific services will be provided when those details are confirmed.",
};

export const programsFaq = {
  heading: "Frequently asked questions",
  items: [
    {
      question: "What programs does Sunshine offer?",
      answer:
        "Sunshine is developing charitable programs that may include food recovery and distribution, essential goods distribution, and — as readiness allows — a community store or other affordable-access model. Additional community support areas may be explored over time.",
    },
    {
      question: "Are all of the programs currently operating?",
      answer:
        "Not necessarily. This page describes developing, planned, and future program directions. Sunshine does not claim that every listed program is fully operational today. Confirmed details will be published as programs are ready to share.",
    },
    {
      question: "How does food recovery work?",
      answer:
        "Sunshine may explore opportunities to recover usable food and connect appropriate food resources with community needs. Opportunities may be considered based on condition, packaging, dates where relevant, quantity, handling, timing, logistics, and applicable requirements. Acceptance is never automatic.",
    },
    {
      question: "What types of essential goods may be considered?",
      answer:
        "Possible categories may include household essentials, personal care items, basic supplies, and other useful goods. What can be supported depends on available resources, review, and program capacity as operations develop.",
    },
    {
      question: "Is the Community Store open?",
      answer:
        "A community store or affordable-access model may be developed as operational and legal readiness allow. Detailed store information will be provided when the program is operational and ready to share. An opening date is not published here.",
    },
    {
      question: "How can businesses or community members get involved?",
      answer:
        "Businesses can explore donating surplus through Donate Goods or learn about Corporate Partners. Community members can visit Get Assistance for developing assistance information. Volunteers can explore Volunteer opportunities as they become available.",
    },
  ],
};

export const programsFinalCta = {
  heading: "Help Connect Resources With Community Needs",
  support:
    "Whether you represent a business with usable surplus, need community support, or want to explore volunteering, you can take a next step.",
};
