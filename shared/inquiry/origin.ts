const LOCAL_ORIGIN_PREFIXES = [
  "http://localhost:",
  "http://127.0.0.1:",
  "http://[::1]:",
];

export function isAllowedOrigin(
  origin: string | null,
  referer: string | null,
  allowedOrigin: string,
  environment: string,
): boolean {
  const candidates = [origin, referer].filter(Boolean) as string[];

  if (candidates.length === 0) {
    return environment !== "production";
  }

  for (const candidate of candidates) {
    if (candidate === allowedOrigin || candidate.startsWith(`${allowedOrigin}/`)) {
      return true;
    }

    if (environment !== "production") {
      for (const prefix of LOCAL_ORIGIN_PREFIXES) {
        if (candidate.startsWith(prefix)) {
          return true;
        }
      }
    }
  }

  return false;
}
