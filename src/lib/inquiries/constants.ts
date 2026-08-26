export const PRODUCT_TYPES = [
  "food",
  "household",
  "merchandise",
  "surplus",
  "other",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  food: "Food",
  household: "Household/essential goods",
  merchandise: "General merchandise",
  surplus: "Surplus inventory",
  other: "Other",
};

export const CONDITIONS = [
  "new",
  "like_new",
  "good",
  "mixed",
  "other",
] as const;

export type Condition = (typeof CONDITIONS)[number];

export const CONDITION_LABELS: Record<Condition, string> = {
  new: "New",
  like_new: "Like new",
  good: "Good",
  mixed: "Mixed",
  other: "Other / needs explanation",
};

export const FOOD_CATEGORIES = ["food", "non_food", "mixed"] as const;

export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  food: "Food",
  non_food: "Non-food",
  mixed: "Mixed",
};

export const CONTACT_METHODS = ["email", "phone"] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const CONTACT_METHOD_LABELS: Record<ContactMethod, string> = {
  email: "Email",
  phone: "Phone",
};

export const FIELD_LIMITS = {
  companyName: 200,
  contactPerson: 120,
  email: 254,
  phone: 40,
  productTypeOther: 200,
  approximateQuantity: 300,
  location: 300,
  conditionOther: 200,
  photoDescription: 500,
  additionalDetails: 4000,
  honeypot: 200,
} as const;

/** Honeypot field name — must stay obscure and unused by real users. */
export const HONEYPOT_FIELD = "company_website";
