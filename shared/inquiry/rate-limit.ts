import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_SECONDS,
} from "./constants";

/**
 * Non-atomic KV rate limiter for the sustained 15-minute window.
 * Concurrent requests may rarely exceed the configured limit by a small margin.
 *
 * Cloudflare Rate Limit bindings only support 10s or 60s periods, so they
 * cannot alone enforce 5 submissions / 15 minutes. Use KV for that window.
 */
export async function checkKvRateLimit(
  kv: KVNamespace,
  key: string,
  limit = RATE_LIMIT_MAX,
  windowSeconds = RATE_LIMIT_WINDOW_SECONDS,
): Promise<boolean> {
  const kvKey = `rl:${key}`;
  const existing = await kv.get(kvKey);
  const count = existing ? Number.parseInt(existing, 10) : 0;

  if (!Number.isFinite(count)) {
    await kv.put(kvKey, "1", { expirationTtl: windowSeconds });
    return true;
  }

  if (count >= limit) {
    return false;
  }

  await kv.put(kvKey, String(count + 1), { expirationTtl: windowSeconds });
  return true;
}

export type RateLimitBinding = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

export async function checkBindingRateLimit(
  binding: RateLimitBinding,
  key: string,
): Promise<boolean> {
  const { success } = await binding.limit({ key });
  return success;
}

export type InquiryRateLimitDeps = {
  /** Preferred: Cloudflare Rate Limit binding (burst; period 10 or 60 only). */
  rateLimiter?: RateLimitBinding;
  /** Sustained window: KV 5 / 15 minutes (non-atomic). */
  kv?: KVNamespace;
};

/**
 * Dual-layer rate limit:
 * 1) Rate Limit binding — burst protection (configured as 5 / 60s)
 * 2) KV — sustained protection (5 / 15 minutes)
 *
 * Both layers run when both bindings exist. Missing layers are skipped.
 * If neither binding exists, returns true (local/dev without bindings).
 */
export async function checkInquiryRateLimits(
  key: string,
  deps: InquiryRateLimitDeps,
): Promise<boolean> {
  if (deps.rateLimiter) {
    const burstAllowed = await checkBindingRateLimit(deps.rateLimiter, key);
    if (!burstAllowed) {
      return false;
    }
  }

  if (deps.kv) {
    return checkKvRateLimit(deps.kv, key);
  }

  return true;
}
