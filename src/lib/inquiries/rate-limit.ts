import { createMemoryRateLimiter } from "./memory-rate-limiter";
import type {
  RateLimitOptions,
  RateLimitResult,
  RateLimiter,
} from "./rate-limiter";

const memoryLimiter = createMemoryRateLimiter();
let activeLimiter: RateLimiter = memoryLimiter;

export function getRateLimiter(): RateLimiter {
  return activeLimiter;
}

/** Test helper — inject a custom RateLimiter implementation. */
export function setRateLimiterForTests(limiter: RateLimiter | null): void {
  activeLimiter = limiter ?? memoryLimiter;
  if (!limiter) {
    memoryLimiter.reset();
  }
}

/**
 * Convenience wrapper used by the inquiry service.
 * Callers depend on the RateLimiter abstraction, not Map storage.
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions = {},
): RateLimitResult {
  return getRateLimiter().check(key, options);
}

/** Test helper — clears the default in-memory implementation. */
export function resetRateLimitState(): void {
  memoryLimiter.reset();
  activeLimiter = memoryLimiter;
}

export type { RateLimiter, RateLimitOptions, RateLimitResult };
