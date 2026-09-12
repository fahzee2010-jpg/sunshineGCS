/**
 * Public social / contact channel links for Sunshine Global Community Services.
 * Facebook and Instagram URLs are organization-confirmed.
 * WhatsApp uses NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, with country code).
 * Do not invent a phone number.
 */

export const FACEBOOK_URL =
  "https://www.facebook.com/SunshineGlobalCommunityServices";

export const INSTAGRAM_URL =
  "https://www.instagram.com/sunshineglobalservicesorg/";

export type SocialLinkItem = {
  id: "facebook" | "instagram" | "whatsapp";
  href: string;
  label: string;
};

/**
 * Digits-only WhatsApp Business number from build env (country code + number).
 * Example value shape: 13125550100 — never invent or hard-code an unknown number.
 */
export function getWhatsAppNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length > 0 ? digits : null;
}

export function getWhatsAppUrl(): string | null {
  const digits = getWhatsAppNumber();
  return digits ? `https://wa.me/${digits}` : null;
}

export function getSocialLinks(): SocialLinkItem[] {
  const links: SocialLinkItem[] = [
    {
      id: "facebook",
      href: FACEBOOK_URL,
      label: "Follow Sunshine Global Community Services on Facebook",
    },
    {
      id: "instagram",
      href: INSTAGRAM_URL,
      label: "Follow Sunshine Global Community Services on Instagram",
    },
  ];

  const whatsappUrl = getWhatsAppUrl();
  if (whatsappUrl) {
    links.push({
      id: "whatsapp",
      href: whatsappUrl,
      label: "Contact Sunshine Global Community Services on WhatsApp",
    });
  }

  return links;
}
