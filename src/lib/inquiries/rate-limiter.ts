export type RateLimitOptions = {
  /** Max attempts within the window. Default: 5 */
  limit?: number;
  /** Window length in milliseconds. Default: 15 minutes */
  windowMs?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** Internal only — never expose remaining counts to end users. */
  remaining: number;
  /** Internal only — never expose retry timing to end users. */
  retryAfterMs: number;
};

/**
 * Rate-limit abstraction used by the inquiry pipeline.
 * Swap implementations without changing form / server-action code.
 */
export type RateLimiter = {
  check(key: string, options?: RateLimitOptions): RateLimitResult;
};
