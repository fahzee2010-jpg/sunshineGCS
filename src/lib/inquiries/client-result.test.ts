import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { toClientInquiryResult } from "../../../shared/inquiry/client-result";

describe("toClientInquiryResult", () => {
  it("maps honeypot spam to opaque success without revealing spam status", () => {
    const result = toClientInquiryResult({ status: "spam" });
    assert.deepEqual(result, {
      status: "success",
      delivery: "delivered",
    });
  });

  it("strips internal error codes from client responses", () => {
    const result = toClientInquiryResult({
      status: "error",
      code: "delivery_not_configured",
    });
    assert.deepEqual(result, { status: "error" });
    assert.equal("code" in result, false);
  });

  it("preserves development_accepted distinctly from delivered", () => {
    assert.deepEqual(
      toClientInquiryResult({
        status: "success",
        delivery: "development_accepted",
      }),
      { status: "success", delivery: "development_accepted" },
    );
    assert.deepEqual(
      toClientInquiryResult({
        status: "success",
        delivery: "delivered",
      }),
      { status: "success", delivery: "delivered" },
    );
  });
});
