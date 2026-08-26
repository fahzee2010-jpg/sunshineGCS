import { createEnvEmailProvider } from "./env-provider";
import type { EmailProvider, EmailSendResult, OutboundEmail } from "./types";

let overrideProvider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  return overrideProvider ?? createEnvEmailProvider();
}

/** Test helper — inject a fake provider. */
export function setEmailProviderForTests(provider: EmailProvider | null): void {
  overrideProvider = provider;
}

export async function sendInquiryEmail(
  message: OutboundEmail,
): Promise<EmailSendResult> {
  return getEmailProvider().send(message);
}

export function isEmailDeliveryConfigured(): boolean {
  return getEmailProvider().isConfigured();
}

export function getInquiryMailboxConfig(): {
  to: string | undefined;
  from: string | undefined;
} {
  return {
    to: process.env.INQUIRY_EMAIL_TO || undefined,
    from: process.env.INQUIRY_EMAIL_FROM || undefined,
  };
}

/**
 * Server-side readiness check for operators/tests.
 * Never expose the missing-list to browsers.
 */
export function getEmailDeliveryReadiness(): {
  ready: boolean;
  missing: string[];
} {
  const missing: string[] = [];

  if (!process.env.INQUIRY_EMAIL_TO) missing.push("INQUIRY_EMAIL_TO");
  if (!process.env.INQUIRY_EMAIL_FROM) missing.push("INQUIRY_EMAIL_FROM");
  if (!process.env.EMAIL_PROVIDER_API_KEY) missing.push("EMAIL_PROVIDER_API_KEY");
  if (process.env.EMAIL_PROVIDER_READY !== "true") {
    missing.push("EMAIL_PROVIDER_READY");
  }

  return {
    ready: missing.length === 0 && isEmailDeliveryConfigured(),
    missing,
  };
}

/**
 * Future capability: donor confirmation email.
 * Not implemented — requires the same configured provider and confirmed copy.
 */
export const DONOR_CONFIRMATION_EMAIL_SUPPORTED = false;
