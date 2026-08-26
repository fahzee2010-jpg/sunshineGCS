import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  getEmailDeliveryReadiness,
  setEmailProviderForTests,
} from "../email";
import { hashClientIdentifier } from "./client-key";
import {
  formatInquiryEmailSubject,
  sanitizeEmailHeaderValue,
  buildInquiryEmailPayload,
} from "./format-email";
import {
  logInquiryEvent,
  logLineLooksLikePii,
  setInquiryLogSink,
} from "./logging";
import { processDonateGoodsInquiry } from "./process-inquiry";
import {
  resetRateLimitState,
  setRateLimiterForTests,
  getRateLimiter,
} from "./rate-limit";
import type { RateLimiter } from "./rate-limiter";
import { emptyInquiryInput } from "./validation";
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
    productType: "food",
    approximateQuantity: "50 cases",
    location: "Midwest distribution center",
    condition: "good",
    foodCategory: "food",
    preferredContactMethod: "phone",
    ...overrides,
  };
}

afterEach(() => {
  resetRateLimitState();
  setRateLimiterForTests(null);
  setEmailProviderForTests(null);
  setInquiryLogSink(null);
  delete process.env.INQUIRY_EMAIL_TO;
  delete process.env.INQUIRY_EMAIL_FROM;
  delete process.env.EMAIL_PROVIDER_API_KEY;
  delete process.env.EMAIL_PROVIDER_READY;
  delete process.env.RATE_LIMIT_SECRET;
});

describe("processDonateGoodsInquiry production guards", () => {
  it("does not return success in production without a provider", async () => {
    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "production",
      rateLimitKey: "prod-missing",
    });
    assert.equal(result.status, "error");
    if (result.status === "error") {
      assert.equal(result.code, "delivery_not_configured");
    }
  });

  it("uses development_accepted (not delivered) without a provider outside production", async () => {
    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "development",
      rateLimitKey: "dev-ok",
    });
    assert.equal(result.status, "success");
    if (result.status === "success") {
      assert.equal(result.delivery, "development_accepted");
      assert.notEqual(result.delivery, "delivered");
    }
  });

  it("returns success only when the provider reports success", async () => {
    process.env.INQUIRY_EMAIL_TO = "inquiries@example.com";
    process.env.INQUIRY_EMAIL_FROM = "noreply@example.com";

    setEmailProviderForTests({
      name: "test",
      isConfigured: () => true,
      send: async () => ({ ok: true, provider: "test" }),
    });

    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "production",
      rateLimitKey: "provider-ok",
    });
    assert.equal(result.status, "success");
    if (result.status === "success") {
      assert.equal(result.delivery, "delivered");
    }
  });

  it("returns generic failure when the provider fails", async () => {
    process.env.INQUIRY_EMAIL_TO = "inquiries@example.com";
    process.env.INQUIRY_EMAIL_FROM = "noreply@example.com";

    setEmailProviderForTests({
      name: "test",
      isConfigured: () => true,
      send: async () => ({ ok: false, reason: "send_failed" }),
    });

    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "production",
      rateLimitKey: "provider-fail",
    });
    assert.equal(result.status, "error");
    if (result.status === "error") {
      assert.equal(result.code, "delivery_failed");
    }
  });

  it("blocks honeypot submissions", async () => {
    const result = await processDonateGoodsInquiry(
      validInput({ companyWebsite: "http://spam.example" }),
      { nodeEnv: "test", rateLimitKey: "honeypot" },
    );
    assert.equal(result.status, "spam");
  });
});

describe("RateLimiter abstraction", () => {
  it("uses the injected RateLimiter implementation", async () => {
    let checked = false;
    const fake: RateLimiter = {
      check() {
        checked = true;
        return { allowed: false, remaining: 0, retryAfterMs: 1000 };
      },
    };
    setRateLimiterForTests(fake);
    assert.equal(getRateLimiter(), fake);

    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "test",
      rateLimitKey: "via-abstraction",
    });
    assert.equal(checked, true);
    assert.equal(result.status, "rate_limited");
  });

  it("rate limits repeated submissions through the default limiter", async () => {
    const key = "rate-limit-key";
    for (let i = 0; i < 5; i += 1) {
      const result = await processDonateGoodsInquiry(validInput(), {
        nodeEnv: "test",
        rateLimitKey: key,
      });
      assert.equal(result.status, "success");
    }
    const blocked = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "test",
      rateLimitKey: key,
    });
    assert.equal(blocked.status, "rate_limited");
  });
});

describe("logging", () => {
  it("does not log inquiry PII payloads", async () => {
    const lines: string[] = [];
    setInquiryLogSink((line) => lines.push(line));

    await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "development",
      rateLimitKey: "log-check",
    });

    assert.ok(lines.length > 0);
    for (const line of lines) {
      assert.equal(logLineLooksLikePii(line), false);
      assert.doesNotMatch(line, /alex@example\.com/);
      assert.doesNotMatch(line, /Alex Rivera/);
      assert.doesNotMatch(line, /312\) 555/);
      assert.doesNotMatch(line, /Midwest distribution/);
    }
  });

  it("refuses forbidden meta keys", () => {
    assert.throws(() =>
      logInquiryEvent("inquiry_validation_failed", {
        // @ts-expect-error intentional forbidden key
        email: "alex@example.com",
      }),
    );
  });
});

describe("email payload", () => {
  it("builds the approved subject and body fields", () => {
    const payload = buildInquiryEmailPayload(
      validInput({
        productType: "other",
        productTypeOther: "Seasonal displays",
        condition: "other",
        conditionOther: "Outer cartons scuffed",
      }),
    );
    assert.equal(
      payload.subject,
      "New Sunshine Donate Goods Inquiry — Example Wholesale Co",
    );
    assert.match(payload.text, /Company name:/);
    assert.match(payload.text, /Seasonal displays/);
    assert.match(payload.text, /Outer cartons scuffed/);
    assert.doesNotMatch(payload.text, /rate.?limit/i);
    assert.doesNotMatch(payload.text, /\bIP\b/);
  });

  it("sanitizes newline injection in subjects", () => {
    assert.equal(
      sanitizeEmailHeaderValue("Acme\r\nBcc: evil@example.com"),
      "Acme Bcc: evil@example.com",
    );
    assert.match(
      formatInquiryEmailSubject("Acme\nCorp"),
      /^New Sunshine Donate Goods Inquiry — Acme Corp$/,
    );
  });
});

describe("client key hashing", () => {
  it("does not return the raw IP", () => {
    process.env.RATE_LIMIT_SECRET = "test-secret";
    const hashed = hashClientIdentifier("203.0.113.10");
    assert.notEqual(hashed, "203.0.113.10");
    assert.equal(hashed.length, 32);
  });

  it("changes when the secret changes", () => {
    process.env.RATE_LIMIT_SECRET = "secret-a";
    const a = hashClientIdentifier("203.0.113.10");
    process.env.RATE_LIMIT_SECRET = "secret-b";
    const b = hashClientIdentifier("203.0.113.10");
    assert.notEqual(a, b);
  });
});

describe("environment readiness", () => {
  it("reports missing production configuration safely", () => {
    const readiness = getEmailDeliveryReadiness();
    assert.equal(readiness.ready, false);
    assert.ok(readiness.missing.includes("INQUIRY_EMAIL_TO"));
    assert.ok(readiness.missing.includes("EMAIL_PROVIDER_READY"));
  });
});

describe("unwired env provider", () => {
  it("does not succeed even if READY placeholders are set without a real send implementation", async () => {
    process.env.INQUIRY_EMAIL_TO = "inquiries@example.com";
    process.env.INQUIRY_EMAIL_FROM = "noreply@example.com";
    process.env.EMAIL_PROVIDER_API_KEY = "placeholder-key";
    process.env.EMAIL_PROVIDER_READY = "true";
    setEmailProviderForTests(null);

    const result = await processDonateGoodsInquiry(validInput(), {
      nodeEnv: "production",
      rateLimitKey: "ready-but-unwired",
    });
    assert.equal(result.status, "error");
    if (result.status === "error") {
      assert.equal(result.code, "delivery_failed");
    }
  });
});
