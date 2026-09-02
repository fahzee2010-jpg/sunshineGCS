/**
 * Structured inquiry logging — never include PII or secrets.
 */

export type InquiryLogEvent =
  | "inquiry_honeypot_blocked"
  | "inquiry_rate_limited"
  | "inquiry_validation_failed"
  | "inquiry_delivery_not_configured"
  | "inquiry_development_accepted"
  | "inquiry_delivery_failed"
  | "inquiry_delivery_succeeded"
  | "inquiry_unexpected_error"
  | "inquiry_rate_limit_secret_missing"
  | "inquiry_turnstile_failed"
  | "inquiry_origin_rejected";

export type InquiryLogMeta = {
  env?: string;
  fieldCount?: number;
  providerConfigured?: boolean;
};

const FORBIDDEN_META_KEYS = new Set([
  "email",
  "phone",
  "name",
  "company",
  "companyName",
  "contactPerson",
  "location",
  "message",
  "additionalDetails",
  "ip",
  "address",
  "payload",
  "form",
  "body",
  "apiKey",
  "secret",
  "token",
]);

let logSink: ((line: string) => void) | null = null;

/** Test helper — capture log lines. */
export function setInquiryLogSink(sink: ((line: string) => void) | null): void {
  logSink = sink;
}

export function logInquiryEvent(
  event: InquiryLogEvent,
  meta: InquiryLogMeta = {},
): void {
  for (const key of Object.keys(meta)) {
    if (FORBIDDEN_META_KEYS.has(key)) {
      throw new Error(`Refusing to log forbidden inquiry meta key: ${key}`);
    }
  }

  const line = JSON.stringify({
    scope: "donate-goods-inquiry",
    event,
    ...meta,
  });

  if (logSink) {
    logSink(line);
    return;
  }

  console.info(line);
}

/** Test helper — detect accidental PII-looking content in a log line. */
export function logLineLooksLikePii(line: string): boolean {
  return /@|phone|contactPerson|companyName|555-|password|api[_-]?key/i.test(
    line,
  );
}
