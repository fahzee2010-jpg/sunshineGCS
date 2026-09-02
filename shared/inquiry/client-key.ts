import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Builds an opaque rate-limit key from a client identifier (typically IP).
 * Raw IPs are never returned or emailed.
 */
export function hashClientIdentifier(
  rawIdentifier: string,
  rateLimitSecret?: string,
): string {
  const normalized = rawIdentifier.trim() || "unknown";
  const secret =
    rateLimitSecret ??
    (typeof process !== "undefined" ? process.env.RATE_LIMIT_SECRET : undefined);

  const material = secret
    ? `rl:v1:${secret}:${normalized}`
    : `rl:v1:unsalted:${normalized}`;

  return createHash("sha256").update(material).digest("hex").slice(0, 32);
}

export function extractClientIp(headerStore: Headers): string {
  const cfIp = headerStore.get("cf-connecting-ip");
  const forwarded = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");
  return (cfIp ?? forwarded?.split(",")[0] ?? realIp ?? "unknown").trim();
}

/** Constant-time string compare for tests / future auth tokens — not for IPs. */
export function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
