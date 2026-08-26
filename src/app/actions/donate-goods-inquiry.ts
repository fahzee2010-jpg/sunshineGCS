"use server";

import { headers } from "next/headers";
import {
  extractClientIp,
  hashClientIdentifier,
} from "@/lib/inquiries/client-key";
import {
  toClientInquiryResult,
  type ClientInquiryResult,
} from "@/lib/inquiries/client-result";
import { logInquiryEvent } from "@/lib/inquiries/logging";
import { processDonateGoodsInquiry } from "@/lib/inquiries/process-inquiry";
import { normalizeInquiryInput } from "@/lib/inquiries/validation";

/**
 * Secure App Router server action for Donate Goods inquiries.
 * Provider-specific details stay outside this file.
 * Responses are sanitized before returning to the browser.
 */
export async function submitDonateGoodsInquiry(
  formData: FormData,
): Promise<ClientInquiryResult> {
  try {
    const headerStore = await headers();
    const input = normalizeInquiryInput(
      Object.fromEntries(formData.entries()) as Record<
        string,
        FormDataEntryValue
      >,
    );

    const rateLimitKey = hashClientIdentifier(extractClientIp(headerStore));

    const result = await processDonateGoodsInquiry(input, {
      rateLimitKey,
    });

    return toClientInquiryResult(result);
  } catch {
    logInquiryEvent("inquiry_unexpected_error", {
      env: process.env.NODE_ENV ?? "unknown",
    });
    return { status: "error" };
  }
}
