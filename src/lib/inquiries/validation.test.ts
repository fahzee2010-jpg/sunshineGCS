import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FIELD_LIMITS } from "./constants";
import {
  emptyInquiryInput,
  isValidEmail,
  isValidPhone,
  validateDonateGoodsInquiry,
} from "./validation";
import type { DonateGoodsInquiryInput } from "./types";

function validInput(
  overrides: Partial<DonateGoodsInquiryInput> = {},
): DonateGoodsInquiryInput {
  return {
    ...emptyInquiryInput(),
    companyName: "Example Wholesale Co",
    contactPerson: "Alex Rivera",
    email: "alex@example.com",
    phone: "+1 (312) 555-0100",
    productType: "merchandise",
    approximateQuantity: "3 pallets",
    location: "Warehouse district, Chicago area",
    condition: "good",
    foodCategory: "non_food",
    preferredContactMethod: "email",
    ...overrides,
  };
}

describe("isValidEmail", () => {
  it("accepts a normal email", () => {
    assert.equal(isValidEmail("ops@example.com"), true);
  });

  it("rejects invalid email", () => {
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail(""), false);
  });
});

describe("isValidPhone", () => {
  it("accepts international-style numbers", () => {
    assert.equal(isValidPhone("+44 20 7946 0958"), true);
    assert.equal(isValidPhone("(312) 555-0199"), true);
  });

  it("rejects too few digits", () => {
    assert.equal(isValidPhone("123"), false);
  });
});

describe("validateDonateGoodsInquiry", () => {
  it("accepts a valid submission", () => {
    const result = validateDonateGoodsInquiry(validInput());
    assert.equal(result.ok, true);
  });

  it("rejects missing required fields", () => {
    const result = validateDonateGoodsInquiry(emptyInquiryInput());
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.errors.companyName, "Company name is required.");
      assert.equal(result.errors.email, "Email is required.");
      assert.equal(
        result.errors.productType,
        "Select the type of goods you are offering.",
      );
    }
  });

  it("rejects invalid email", () => {
    const result = validateDonateGoodsInquiry(
      validInput({ email: "bad-email" }),
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.errors.email, "Enter a valid email address.");
    }
  });

  it("rejects invalid enum values", () => {
    const result = validateDonateGoodsInquiry(
      validInput({
        productType: "not-real" as DonateGoodsInquiryInput["productType"],
        condition: "broken" as DonateGoodsInquiryInput["condition"],
        foodCategory: "maybe" as DonateGoodsInquiryInput["foodCategory"],
        preferredContactMethod:
          "fax" as DonateGoodsInquiryInput["preferredContactMethod"],
      }),
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.productType);
      assert.ok(result.errors.condition);
      assert.ok(result.errors.foodCategory);
      assert.ok(result.errors.preferredContactMethod);
    }
  });

  it("rejects excessively long input", () => {
    const result = validateDonateGoodsInquiry(
      validInput({
        companyName: "A".repeat(FIELD_LIMITS.companyName + 1),
        additionalDetails: "B".repeat(FIELD_LIMITS.additionalDetails + 1),
      }),
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.errors.companyName, "Company name is too long.");
      assert.equal(
        result.errors.additionalDetails,
        "Additional details are too long.",
      );
    }
  });

  it("requires other explanations when Other is selected", () => {
    const result = validateDonateGoodsInquiry(
      validInput({
        productType: "other",
        productTypeOther: "",
        condition: "other",
        conditionOther: "",
      }),
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.productTypeOther);
      assert.ok(result.errors.conditionOther);
    }
  });
});
