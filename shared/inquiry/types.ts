import type {
  Condition,
  ContactMethod,
  FoodCategory,
  ProductType,
} from "./constants";

export type DonateGoodsInquiryInput = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  productType: ProductType | "";
  productTypeOther: string;
  approximateQuantity: string;
  location: string;
  condition: Condition | "";
  conditionOther: string;
  foodCategory: FoodCategory | "";
  photoDescription: string;
  preferredContactMethod: ContactMethod | "";
  additionalDetails: string;
  /** Honeypot — must be empty for legitimate submissions. */
  companyWebsite: string;
};

export type FieldErrors = Partial<Record<keyof DonateGoodsInquiryInput, string>>;

export type ValidationResult =
  | { ok: true; data: DonateGoodsInquiryInput }
  | { ok: false; errors: FieldErrors };

export type InquiryDeliveryStatus =
  | "delivered"
  | "development_accepted"
  | "not_configured";

export type ProcessInquiryResult =
  | {
      status: "success";
      delivery: InquiryDeliveryStatus;
    }
  | {
      status: "validation_error";
      errors: FieldErrors;
    }
  | {
      status: "spam";
    }
  | {
      status: "rate_limited";
    }
  | {
      status: "error";
      code:
        | "delivery_not_configured"
        | "delivery_failed"
        | "unexpected"
        | "turnstile_failed";
    };
