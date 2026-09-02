import { hashClientIdentifier, extractClientIp } from "../../shared/inquiry/client-key";
import { jsonResponse } from "../../shared/inquiry/client-result";
import { TURNSTILE_FIELD } from "../../shared/inquiry/constants";
import { logInquiryEvent } from "../../shared/inquiry/logging";
import { isAllowedOrigin } from "../../shared/inquiry/origin";
import { processDonateGoodsInquiry } from "../../shared/inquiry/process-inquiry";
import { checkInquiryRateLimits } from "../../shared/inquiry/rate-limit";
import {
  isResendConfigured,
  sendInquiryViaResend,
} from "../../shared/inquiry/resend";
import { verifyTurnstileToken } from "../../shared/inquiry/turnstile";
import { normalizeInquiryInput } from "../../shared/inquiry/validation";
import type { InquiryPagesContext } from "../env";

function methodNotAllowed(): Response {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST" },
  });
}

function getEnvironment(env: InquiryPagesContext["env"]): string {
  return env.ENVIRONMENT ?? "production";
}

async function parseSubmissionBody(
  request: Request,
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Record<string, unknown>;
    return json ?? {};
  }

  const formData = await request.formData();
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    raw[key] = typeof value === "string" ? value : value.name;
  }
  return raw;
}

export async function onRequest(context: InquiryPagesContext): Promise<Response> {
  if (context.request.method === "OPTIONS") {
    const allowedOrigin = context.env.ALLOWED_ORIGIN ?? "https://sunshineservices.org";
    return new Response(null, {
      status: 204,
      headers: {
        Allow: "POST, OPTIONS",
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store",
      },
    });
  }

  if (context.request.method !== "POST") {
    return methodNotAllowed();
  }

  const env = getEnvironment(context.env);
  const allowedOrigin =
    context.env.ALLOWED_ORIGIN ?? "https://sunshineservices.org";

  if (
    !isAllowedOrigin(
      context.request.headers.get("Origin"),
      context.request.headers.get("Referer"),
      allowedOrigin,
      env,
    )
  ) {
    logInquiryEvent("inquiry_origin_rejected", { env });
    return jsonResponse({ status: "error", code: "unexpected" }, { status: 403 });
  }

  try {
    const raw = await parseSubmissionBody(context.request);
    const turnstileToken =
      typeof raw[TURNSTILE_FIELD] === "string" ? raw[TURNSTILE_FIELD] : "";

    if (!context.env.TURNSTILE_SECRET_KEY || !turnstileToken) {
      logInquiryEvent("inquiry_turnstile_failed", { env });
      return jsonResponse({ status: "error", code: "turnstile_failed" });
    }

    const clientIp = extractClientIp(context.request.headers);
    const turnstileOk = await verifyTurnstileToken({
      secret: context.env.TURNSTILE_SECRET_KEY,
      token: turnstileToken,
      remoteIp: clientIp === "unknown" ? undefined : clientIp,
    });

    if (!turnstileOk) {
      logInquiryEvent("inquiry_turnstile_failed", { env });
      return jsonResponse({ status: "error", code: "turnstile_failed" });
    }

    const input = normalizeInquiryInput(raw);
    const rateLimitKey = hashClientIdentifier(
      clientIp,
      context.env.RATE_LIMIT_SECRET,
    );

    const result = await processDonateGoodsInquiry(input, {
      environment: env,
      rateLimitKey,
      rateLimitSecret: context.env.RATE_LIMIT_SECRET,
      checkRateLimit: async (key: string) =>
        checkInquiryRateLimits(key, {
          rateLimiter: context.env.INQUIRY_RATE_LIMITER,
          kv: context.env.INQUIRY_KV,
        }),
      isDeliveryConfigured: () =>
        isResendConfigured(context.env.RESEND_API_KEY) &&
        Boolean(context.env.INQUIRY_EMAIL_TO && context.env.INQUIRY_EMAIL_FROM),
      getMailbox: () => ({
        to: context.env.INQUIRY_EMAIL_TO,
        from: context.env.INQUIRY_EMAIL_FROM,
      }),
      sendEmail: (delivery) =>
        sendInquiryViaResend(context.env.RESEND_API_KEY ?? "", delivery),
    });

    return jsonResponse(result);
  } catch {
    logInquiryEvent("inquiry_unexpected_error", { env });
    return jsonResponse({ status: "error", code: "unexpected" });
  }
}

export async function onRequestPost(context: InquiryPagesContext): Promise<Response> {
  return onRequest(context);
}

export async function onRequestOptions(context: InquiryPagesContext): Promise<Response> {
  return onRequest(context);
}
