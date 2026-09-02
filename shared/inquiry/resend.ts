import type { InquiryEmailDelivery } from "./process-inquiry";

export async function sendInquiryViaResend(
  apiKey: string,
  delivery: InquiryEmailDelivery,
): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Sunshine Global Community Services <${delivery.from}>`,
      to: [delivery.to],
      reply_to: delivery.replyTo,
      subject: delivery.subject,
      text: delivery.text,
    }),
  });

  return response.ok;
}

export function isResendConfigured(apiKey: string | undefined): boolean {
  return Boolean(apiKey?.trim());
}
