import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
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

function createMemoryRateLimiter(limit = 5) {
  const buckets = new Map<string, number>();

  return {
    async check(key: string): Promise<boolean> {
      const count = buckets.get(key) ?? 0;
      if (count >= limit) {
        return false;
      }
      buckets.set(key, count + 1);
      return true;
    },
    reset() {
      buckets.clear();
    },
  };
}

afterEach(() => {
  setInquiryLogSink(null);
  delete process.env.RATE_LIMIT_SECRET;
});

describe("processDonateGoodsInquiry production guards", () => {
  it("does not return success in production without Resend configured", async () => {
    const limiter = createMemoryRateLimiter();
    const result = await processDonateGoodsInquiry(validInput(), {
      environment: "production",
      rateLimitKey: "prod-missing",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => false,
      getMailbox: () => ({}),
      sendEmail: async () => true,
    });
    assert.equal(result.status, "error");
    if (result.status === "error") {
      assert.equal(result.code, "delivery_not_configured");
    }
  });

  it("uses development_accepted (not delivered) without Resend outside production", async () => {
    const limiter = createMemoryRateLimiter();
    const result = await processDonateGoodsInquiry(validInput(), {
      environment: "development",
      rateLimitKey: "dev-ok",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => false,
      getMailbox: () => ({}),
      sendEmail: async () => true,
    });
    assert.equal(result.status, "success");
    if (result.status === "success") {
      assert.equal(result.delivery, "development_accepted");
      assert.notEqual(result.delivery, "delivered");
    }
  });

  it("returns success only when Resend reports success", async () => {
    const limiter = createMemoryRateLimiter();
    const result = await processDonateGoodsInquiry(validInput(), {
      environment: "production",
      rateLimitKey: "provider-ok",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => true,
      getMailbox: () => ({
        to: "info@example.com",
        from: "noreply@example.com",
      }),
      sendEmail: async () => true,
    });
    assert.equal(result.status, "success");
    if (result.status === "success") {
      assert.equal(result.delivery, "delivered");
    }
  });

  it("returns generic failure when Resend fails", async () => {
    const limiter = createMemoryRateLimiter();
    const result = await processDonateGoodsInquiry(validInput(), {
      environment: "production",
      rateLimitKey: "provider-fail",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => true,
      getMailbox: () => ({
        to: "info@example.com",
        from: "noreply@example.com",
      }),
      sendEmail: async () => false,
    });
    assert.equal(result.status, "error");
    if (result.status === "error") {
      assert.equal(result.code, "delivery_failed");
    }
  });

  it("blocks honeypot submissions", async () => {
    const limiter = createMemoryRateLimiter();
    const result = await processDonateGoodsInquiry(
      validInput({ companyWebsite: "http://spam.example" }),
      {
        environment: "test",
        rateLimitKey: "honeypot",
        checkRateLimit: limiter.check,
        isDeliveryConfigured: () => true,
        getMailbox: () => ({
          to: "info@example.com",
          from: "noreply@example.com",
        }),
        sendEmail: async () => true,
      },
    );
    assert.equal(result.status, "spam");
  });
});

describe("Rate limiting", () => {
  it("rate limits repeated submissions", async () => {
    const limiter = createMemoryRateLimiter();
    const key = "rate-limit-key";

    for (let i = 0; i < 5; i += 1) {
      const result = await processDonateGoodsInquiry(validInput(), {
        environment: "test",
        rateLimitKey: key,
        checkRateLimit: limiter.check,
        isDeliveryConfigured: () => false,
        getMailbox: () => ({}),
        sendEmail: async () => true,
      });
      assert.equal(result.status, "success");
    }

    const blocked = await processDonateGoodsInquiry(validInput(), {
      environment: "test",
      rateLimitKey: key,
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => false,
      getMailbox: () => ({}),
      sendEmail: async () => true,
    });
    assert.equal(blocked.status, "rate_limited");
  });
});

describe("logging", () => {
  it("does not log inquiry PII payloads", async () => {
    const lines: string[] = [];
    setInquiryLogSink((line) => lines.push(line));
    const limiter = createMemoryRateLimiter();

    await processDonateGoodsInquiry(validInput(), {
      environment: "development",
      rateLimitKey: "log-check",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => false,
      getMailbox: () => ({}),
      sendEmail: async () => true,
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
    const hashed = hashClientIdentifier("203.0.113.10", "test-secret");
    assert.notEqual(hashed, "203.0.113.10");
    assert.equal(hashed.length, 32);
  });

  it("changes when the secret changes", () => {
    const a = hashClientIdentifier("203.0.113.10", "secret-a");
    const b = hashClientIdentifier("203.0.113.10", "secret-b");
    assert.notEqual(a, b);
  });
});

describe("Resend delivery contract", () => {
  it("uses Reply-To for the customer email and never From", async () => {
    let capturedReplyTo = "";
    const limiter = createMemoryRateLimiter();

    await processDonateGoodsInquiry(validInput({ email: "customer@example.com" }), {
      environment: "production",
      rateLimitKey: "reply-to",
      checkRateLimit: limiter.check,
      isDeliveryConfigured: () => true,
      getMailbox: () => ({
        to: "info@sunshineservices.org",
        from: "noreply@sunshineservices.org",
      }),
      sendEmail: async (delivery) => {
        capturedReplyTo = delivery.replyTo;
        assert.equal(delivery.from, "noreply@sunshineservices.org");
        assert.equal(delivery.to, "info@sunshineservices.org");
        assert.notEqual(delivery.from, delivery.replyTo);
        return true;
      },
    });

    assert.equal(capturedReplyTo, "customer@example.com");
  });
});
