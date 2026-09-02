export async function verifyTurnstileToken(options: {
  secret: string;
  token: string;
  remoteIp?: string;
}): Promise<boolean> {
  const body = new URLSearchParams({
    secret: options.secret,
    response: options.token,
  });

  if (options.remoteIp) {
    body.set("remoteip", options.remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
