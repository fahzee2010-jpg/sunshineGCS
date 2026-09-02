import {
  CONDITIONS,
  CONTACT_METHODS,
  FIELD_LIMITS,
  FOOD_CATEGORIES,
  PRODUCT_TYPES,
  type Condition,
  type ContactMethod,
  type FoodCategory,
  type ProductType,
} from "./constants";
import type {
  DonateGoodsInquiryInput,
  FieldErrors,
  ValidationResult,
} from "./types";

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowed<T extends string>(
  value: string,
  allowed: readonly T[],
): value is T {
  return (allowed as readonly string[]).includes(value);
}

function tooLong(value: string, max: number): boolean {
  return value.length > max;
}

/** Practical email check — not a full RFC parser. */
export function isValidEmail(value: string): boolean {
  if (!value || value.length > FIELD_LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Accept common business/international formats; require enough digits. */
export function isValidPhone(value: string): boolean {
  if (!value || tooLong(value, FIELD_LIMITS.phone)) return false;
  if (!/^[+]?[\d\s()./-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function emptyInquiryInput(): DonateGoodsInquiryInput {
  return {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    productType: "",
    productTypeOther: "",
    approximateQuantity: "",
    location: "",
    condition: "",
    conditionOther: "",
    foodCategory: "",
    photoDescription: "",
    preferredContactMethod: "",
    additionalDetails: "",
    companyWebsite: "",
  };
}

export function normalizeInquiryInput(
  raw: Record<string, unknown>,
): DonateGoodsInquiryInput {
  const get = (key: string) => trim(raw[key]);

  return {
    companyName: get("companyName"),
    contactPerson: get("contactPerson"),
    email: get("email"),
    phone: get("phone"),
    productType: get("productType") as ProductType | "",
    productTypeOther: get("productTypeOther"),
    approximateQuantity: get("approximateQuantity"),
    location: get("location"),
    condition: get("condition") as Condition | "",
    conditionOther: get("conditionOther"),
    foodCategory: get("foodCategory") as FoodCategory | "",
    photoDescription: get("photoDescription"),
    preferredContactMethod: get("preferredContactMethod") as ContactMethod | "",
    additionalDetails: get("additionalDetails"),
    companyWebsite: get("companyWebsite") || get("company_website"),
  };
}

/**
 * Shared validation used by client and server.
 * Server must always call this; never trust the browser alone.
 */
export function validateDonateGoodsInquiry(
  input: DonateGoodsInquiryInput,
): ValidationResult {
  const errors: FieldErrors = {};

  if (!input.companyName) {
    errors.companyName = "Company name is required.";
  } else if (tooLong(input.companyName, FIELD_LIMITS.companyName)) {
    errors.companyName = "Company name is too long.";
  }

  if (!input.contactPerson) {
    errors.contactPerson = "Contact person is required.";
  } else if (tooLong(input.contactPerson, FIELD_LIMITS.contactPerson)) {
    errors.contactPerson = "Contact person name is too long.";
  }

  if (!input.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.phone) {
    errors.phone = "Phone is required.";
  } else if (!isValidPhone(input.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!input.productType) {
    errors.productType = "Select the type of goods you are offering.";
  } else if (!isAllowed(input.productType, PRODUCT_TYPES)) {
    errors.productType = "Select a valid product type.";
  } else if (input.productType === "other") {
    if (!input.productTypeOther) {
      errors.productTypeOther = "Please describe the product type.";
    } else if (tooLong(input.productTypeOther, FIELD_LIMITS.productTypeOther)) {
      errors.productTypeOther = "Product type description is too long.";
    }
  }

  if (!input.approximateQuantity) {
    errors.approximateQuantity = "Approximate quantity is required.";
  } else if (
    tooLong(input.approximateQuantity, FIELD_LIMITS.approximateQuantity)
  ) {
    errors.approximateQuantity = "Approximate quantity is too long.";
  }

  if (!input.location) {
    errors.location = "Pickup or delivery location is required.";
  } else if (tooLong(input.location, FIELD_LIMITS.location)) {
    errors.location = "Location is too long.";
  }

  if (!input.condition) {
    errors.condition = "Select the condition of the goods.";
  } else if (!isAllowed(input.condition, CONDITIONS)) {
    errors.condition = "Select a valid condition.";
  } else if (input.condition === "other") {
    if (!input.conditionOther) {
      errors.conditionOther = "Please describe the condition.";
    } else if (tooLong(input.conditionOther, FIELD_LIMITS.conditionOther)) {
      errors.conditionOther = "Condition description is too long.";
    }
  }

  if (!input.foodCategory) {
    errors.foodCategory = "Select whether the goods are food, non-food, or mixed.";
  } else if (!isAllowed(input.foodCategory, FOOD_CATEGORIES)) {
    errors.foodCategory = "Select a valid food/non-food option.";
  }

  if (tooLong(input.photoDescription, FIELD_LIMITS.photoDescription)) {
    errors.photoDescription = "Photo description is too long.";
  }

  if (!input.preferredContactMethod) {
    errors.preferredContactMethod = "Select a preferred contact method.";
  } else if (!isAllowed(input.preferredContactMethod, CONTACT_METHODS)) {
    errors.preferredContactMethod = "Select a valid contact method.";
  }

  if (tooLong(input.additionalDetails, FIELD_LIMITS.additionalDetails)) {
    errors.additionalDetails = "Additional details are too long.";
  }

  if (tooLong(input.companyWebsite, FIELD_LIMITS.honeypot)) {
    errors.companyWebsite = "Invalid submission.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: input };
}
