import { buildInquiryEmailPayload } from "./format-email";
import { logInquiryEvent } from "./logging";
import type { DonateGoodsInquiryInput, ProcessInquiryResult } from "./types";
import { validateDonateGoodsInquiry } from "./validation";

export type InquiryEmailDelivery = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type ProcessInquiryDependencies = {
  environment: string;
  rateLimitKey: string;
  rateLimitSecret?: string;
  checkRateLimit: (key: string) => Promise<boolean>;
  isDeliveryConfigured: () => boolean;
  getMailbox: () => { to?: string; from?: string };
  sendEmail: (delivery: InquiryEmailDelivery) => Promise<boolean>;
};

function isHoneypotTriggered(input: DonateGoodsInquiryInput): boolean {
  return Boolean(input.companyWebsite.trim());
}

/**
 * Server-side inquiry pipeline:
 * honeypot → rate limit → validation → Resend delivery.
 *
 * Never logs full inquiry payloads or PII.
 */
export async function processDonateGoodsInquiry(
  input: DonateGoodsInquiryInput,
  deps: ProcessInquiryDependencies,
): Promise<ProcessInquiryResult> {
  const env = deps.environment;

  if (isHoneypotTriggered(input)) {
    logInquiryEvent("inquiry_honeypot_blocked", { env });
    return { status: "spam" };
  }

  if (env === "production" && !deps.rateLimitSecret) {
    logInquiryEvent("inquiry_rate_limit_secret_missing", { env });
  }

  const allowed = await deps.checkRateLimit(deps.rateLimitKey);
  if (!allowed) {
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

  if (!deps.isDeliveryConfigured()) {
    if (env === "production") {
      logInquiryEvent("inquiry_delivery_not_configured", {
        env,
        providerConfigured: false,
      });
      return { status: "error", code: "delivery_not_configured" };
    }

    logInquiryEvent("inquiry_development_accepted", {
      env,
      providerConfigured: false,
    });
    return { status: "success", delivery: "development_accepted" };
  }

  const mailbox = deps.getMailbox();
  if (!mailbox.to || !mailbox.from) {
    logInquiryEvent("inquiry_delivery_not_configured", {
      env,
      providerConfigured: true,
    });
    return { status: "error", code: "delivery_not_configured" };
  }

  const payload = buildInquiryEmailPayload(validation.data);
  const sent = await deps.sendEmail({
    to: mailbox.to,
    from: mailbox.from,
    replyTo: validation.data.email,
    subject: payload.subject,
    text: payload.text,
  });

  if (!sent) {
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
