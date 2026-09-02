import type { FieldErrors, ProcessInquiryResult } from "./types";

/**
 * Client-safe inquiry response.
 * Strips internal error codes and honeypot signals so browsers/network
 * inspectors cannot distinguish spam blocks from normal success, or learn
 * whether delivery failed due to configuration vs provider errors.
 */
export type ClientInquiryResult =
  | {
      status: "success";
      delivery: "delivered" | "development_accepted";
    }
  | {
      status: "validation_error";
      errors: FieldErrors;
    }
  | {
      status: "rate_limited";
    }
  | {
      status: "error";
    };

export function toClientInquiryResult(
  result: ProcessInquiryResult,
): ClientInquiryResult {
  switch (result.status) {
    case "spam":
      return { status: "success", delivery: "delivered" };
    case "error":
      return { status: "error" };
    case "validation_error":
      return { status: "validation_error", errors: result.errors };
    case "rate_limited":
      return { status: "rate_limited" };
    case "success":
      return {
        status: "success",
        delivery:
          result.delivery === "development_accepted"
            ? "development_accepted"
            : "delivered",
      };
    default: {
      const _exhaustive: never = result;
      void _exhaustive;
      return { status: "error" };
    }
  }
}

export function jsonResponse(
  result: ProcessInquiryResult,
  init?: ResponseInit,
): Response {
  const body = toClientInquiryResult(result);
  const status =
    result.status === "validation_error"
      ? 400
      : result.status === "rate_limited"
        ? 429
        : 200;

  return Response.json(body, {
    ...init,
    status: init?.status ?? status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}
