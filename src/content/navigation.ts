import type { NavItem } from "@/types/content";

/** Prominent header CTAs — conversion priority order. */
export const primaryActions: NavItem[] = [
  { href: "/donate-goods", label: "Donate Goods" },
  { href: "/get-assistance", label: "Get Assistance" },
  { href: "/donate", label: "Donate" },
];

/** Secondary header links — keep the top bar uncluttered. */
export const secondaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/corporate-partners", label: "Corporate Partners" },
];

/** Mobile menu: CTAs first, then secondary, then Volunteer & Contact. */
export const mobileNav: NavItem[] = [
  ...primaryActions,
  { href: "/volunteer", label: "Volunteer" },
  ...secondaryNav,
  { href: "/contact", label: "Contact" },
];

export type FooterGroup = {
  title: string;
  items: NavItem[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: "Get Involved",
    items: [
      { href: "/donate-goods", label: "Donate Goods" },
      { href: "/donate", label: "Donate" },
      { href: "/volunteer", label: "Volunteer" },
      { href: "/corporate-partners", label: "Corporate Partners" },
    ],
  },
  {
    title: "Community",
    items: [
      { href: "/get-assistance", label: "Get Assistance" },
      { href: "/programs", label: "Programs" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    title: "Organization",
    items: [
      { href: "/about", label: "About" },
      { href: "/transparency", label: "Transparency" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [{ href: "/privacy", label: "Privacy" }],
  },
];
