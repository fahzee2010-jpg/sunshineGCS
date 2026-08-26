export type OutboundEmail = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

export type EmailSendResult =
  | { ok: true; provider: string }
  | { ok: false; reason: "not_configured" | "send_failed" };

export type EmailProvider = {
  readonly name: string;
  isConfigured(): boolean;
  send(message: OutboundEmail): Promise<EmailSendResult>;
};
