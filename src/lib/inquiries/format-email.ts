import {
  CONDITION_LABELS,
  CONTACT_METHOD_LABELS,
  FOOD_CATEGORY_LABELS,
  PRODUCT_TYPE_LABELS,
  type Condition,
  type ContactMethod,
  type FoodCategory,
  type ProductType,
} from "./constants";
import type { DonateGoodsInquiryInput } from "./types";

/** Prevent header injection / broken subjects from user-controlled values. */
export function sanitizeEmailHeaderValue(value: string, max = 120): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Normalize body field text without interpreting HTML. */
export function sanitizeEmailBodyValue(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

export function formatInquiryEmailSubject(companyName: string): string {
  const safeName = sanitizeEmailHeaderValue(companyName) || "Unknown company";
  return `New Sunshine Donate Goods Inquiry — ${safeName}`;
}

/**
 * Plain-text staff notification payload for a future email provider.
 * Does not include IPs, rate-limit data, secrets, or auth information.
 */
export function formatInquiryEmailText(data: DonateGoodsInquiryInput): string {
  const productType =
    data.productType === "other"
      ? `Other — ${sanitizeEmailBodyValue(data.productTypeOther)}`
      : PRODUCT_TYPE_LABELS[data.productType as ProductType];

  const condition =
    data.condition === "other"
      ? `Other — ${sanitizeEmailBodyValue(data.conditionOther)}`
      : CONDITION_LABELS[data.condition as Condition];

  const lines = [
    "New Donate Goods inquiry",
    "",
    `Company name: ${sanitizeEmailBodyValue(data.companyName)}`,
    `Contact person: ${sanitizeEmailBodyValue(data.contactPerson)}`,
    `Email: ${sanitizeEmailBodyValue(data.email)}`,
    `Phone: ${sanitizeEmailBodyValue(data.phone)}`,
    `Preferred contact method: ${CONTACT_METHOD_LABELS[data.preferredContactMethod as ContactMethod]}`,
    "",
    `Product type: ${productType}`,
    `Approximate quantity: ${sanitizeEmailBodyValue(data.approximateQuantity)}`,
    `Pickup or delivery location: ${sanitizeEmailBodyValue(data.location)}`,
    `Condition: ${condition}`,
    `Food / non-food: ${FOOD_CATEGORY_LABELS[data.foodCategory as FoodCategory]}`,
    "",
    `Photo description: ${
      data.photoDescription
        ? sanitizeEmailBodyValue(data.photoDescription)
        : "(not provided)"
    }`,
    "",
    "Additional details:",
    data.additionalDetails
      ? sanitizeEmailBodyValue(data.additionalDetails)
      : "(none)",
    "",
    "Note: Submitting an inquiry does not guarantee acceptance.",
    "Note: Donor confirmation email is not sent by the current architecture.",
  ];

  return lines.join("\n");
}

export type InquiryEmailPayload = {
  subject: string;
  text: string;
};

export function buildInquiryEmailPayload(
  data: DonateGoodsInquiryInput,
): InquiryEmailPayload {
  return {
    subject: formatInquiryEmailSubject(data.companyName),
    text: formatInquiryEmailText(data),
  };
}
