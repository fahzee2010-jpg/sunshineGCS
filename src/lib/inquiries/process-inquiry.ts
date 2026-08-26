import {
  getInquiryMailboxConfig,
  isEmailDeliveryConfigured,
  sendInquiryEmail,
} from "../email";
import { buildInquiryEmailPayload } from "./format-email";
import { logInquiryEvent } from "./logging";
import { checkRateLimit } from "./rate-limit";
import type {
  DonateGoodsInquiryInput,
  ProcessInquiryResult,
} from "./types";
import { validateDonateGoodsInquiry } from "./validation";

export type ProcessInquiryOptions = {
  /** Opaque rate-limit key (e.g. salted hashed IP). Never log the raw IP. */
  rateLimitKey?: string;
  /** Override NODE_ENV for tests. */
  nodeEnv?: string;
};

function isHoneypotTriggered(input: DonateGoodsInquiryInput): boolean {
  return Boolean(input.companyWebsite.trim());
}

/**
 * Server-side inquiry pipeline:
 * honeypot → rate limit → validation → delivery abstraction.
 *
 * Does not contain provider-specific code.
 * Never logs full inquiry payloads or PII.
 */
export async function processDonateGoodsInquiry(
  input: DonateGoodsInquiryInput,
  options: ProcessInquiryOptions = {},
): Promise<ProcessInquiryResult> {
  const env = options.nodeEnv ?? process.env.NODE_ENV ?? "development";

  if (isHoneypotTriggered(input)) {
    logInquiryEvent("inquiry_honeypot_blocked", { env });
    return { status: "spam" };
  }

  if (env === "production" && !process.env.RATE_LIMIT_SECRET) {
    logInquiryEvent("inquiry_rate_limit_secret_missing", { env });
  }

  const rateKey = options.rateLimitKey ?? "anonymous";
  const rate = checkRateLimit(rateKey, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rate.allowed) {
    logInquiryEvent("inquiry_rate_limited", { env });
    return { status: "rate_limited" };
  }

  const validation = validateDonateGoodsInquiry(input);
  if (!validation.ok) {
    logInquiryEvent("inquiry_validation_failed", {
      env,
      fieldCount: Object.keys(validation.errors).length,
    });
    return { status: "validation_error", errors: validation.errors };
  }

  const deliveryConfigured = isEmailDeliveryConfigured();

  if (!deliveryConfigured) {
    if (env === "production") {
      logInquiryEvent("inquiry_delivery_not_configured", {
        env,
        providerConfigured: false,
      });
      return { status: "error", code: "delivery_not_configured" };
    }

    // Development/test only — never report as delivered email.
    logInquiryEvent("inquiry_development_accepted", {
      env,
      providerConfigured: false,
    });
    return { status: "success", delivery: "development_accepted" };
  }

  const mailbox = getInquiryMailboxConfig();
  if (!mailbox.to || !mailbox.from) {
    logInquiryEvent("inquiry_delivery_not_configured", {
      env,
      providerConfigured: true,
    });
    return { status: "error", code: "delivery_not_configured" };
  }

  const payload = buildInquiryEmailPayload(validation.data);
  const sendResult = await sendInquiryEmail({
    to: mailbox.to,
    from: mailbox.from,
    subject: payload.subject,
    text: payload.text,
  });

  if (!sendResult.ok) {
    if (sendResult.reason === "not_configured") {
      logInquiryEvent("inquiry_delivery_not_configured", {
        env,
        providerConfigured: false,
      });
      return { status: "error", code: "delivery_not_configured" };
    }
    logInquiryEvent("inquiry_delivery_failed", {
      env,
      providerConfigured: true,
    });
    return { status: "error", code: "delivery_failed" };
  }

  logInquiryEvent("inquiry_delivery_succeeded", {
    env,
    providerConfigured: true,
  });
  return { status: "success", delivery: "delivered" };
}
