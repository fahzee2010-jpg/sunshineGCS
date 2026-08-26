import type {
  RateLimitOptions,
  RateLimitResult,
  RateLimiter,
} from "./rate-limiter";

type RateBucket = {
  count: number;
  resetAt: number;
};

/**
 * Process-local in-memory rate limiter.
 *
 * Suitable for local development and unit tests only.
 * In-memory rate limiting is process-local and does not reliably protect
 * multi-instance or serverless deployments — production needs a durable/
 * shared limiter integration (selected with hosting later).
 */
export function createMemoryRateLimiter(): RateLimiter & {
  reset(): void;
} {
  const buckets = new Map<string, RateBucket>();

  return {
    check(key: string, options: RateLimitOptions = {}): RateLimitResult {
      const limit = options.limit ?? 5;
      const windowMs = options.windowMs ?? 15 * 60 * 1000;
      const now = Date.now();
      const existing = buckets.get(key);

      if (!existing || existing.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1, retryAfterMs: 0 };
      }

      if (existing.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterMs: Math.max(0, existing.resetAt - now),
        };
      }

      existing.count += 1;
      buckets.set(key, existing);
      return {
        allowed: true,
        remaining: Math.max(0, limit - existing.count),
        retryAfterMs: 0,
      };
    },
    reset() {
      buckets.clear();
    },
  };
}
