import type { EmailProvider, EmailSendResult, OutboundEmail } from "./types";

/**
 * Future managed-email provider slot (vendor not selected yet).
 *
 * Keep provider-specific SDKs out of this module until the Project Manager
 * chooses a vendor. Secrets must remain server-side only (never NEXT_PUBLIC_).
 *
 * EMAIL_PROVIDER_READY must stay false until real delivery is verified.
 * Setting READY alone must never fabricate successful delivery.
 */
export function createEnvEmailProvider(): EmailProvider {
  const hasMailbox = Boolean(
    process.env.INQUIRY_EMAIL_TO && process.env.INQUIRY_EMAIL_FROM,
  );
  const hasApiKey = Boolean(process.env.EMAIL_PROVIDER_API_KEY);
  const vendorReady = process.env.EMAIL_PROVIDER_READY === "true";

  return {
    name: "unwired-env-provider",
    isConfigured() {
      return hasMailbox && hasApiKey && vendorReady;
    },
    async send(message: OutboundEmail): Promise<EmailSendResult> {
      if (!this.isConfigured()) {
        return { ok: false, reason: "not_configured" };
      }

      // Intentionally unimplemented until a vendor is selected and wired.
      // Returning send_failed prevents fake production success.
      void message;
      return { ok: false, reason: "send_failed" };
    },
  };
}
