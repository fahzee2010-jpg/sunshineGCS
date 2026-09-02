/// <reference types="@cloudflare/workers-types" />

import type { RateLimitBinding } from "../shared/inquiry/rate-limit";

export type InquiryEnv = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  RATE_LIMIT_SECRET?: string;
  INQUIRY_EMAIL_TO?: string;
  INQUIRY_EMAIL_FROM?: string;
  ALLOWED_ORIGIN?: string;
  ENVIRONMENT?: string;
  INQUIRY_KV?: KVNamespace;
  INQUIRY_RATE_LIMITER?: RateLimitBinding;
};

export type InquiryPagesContext = EventContext<InquiryEnv, string, unknown>;
