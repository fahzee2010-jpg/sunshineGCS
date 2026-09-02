# Sunshine Global Community Services

Public website for Sunshine Global Community Services, an Illinois 501(c)(3) public charity.

**Positioning:** From Surplus to Service.

## Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS v4
- Cloudflare Pages + Pages Function (`/api/inquiry`)
- Cloudflare Turnstile
- Resend (HTTP API for inquiry notifications)

No CMS, database, authentication, payments, or analytics in this phase.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For static export preview:

```bash
npm run build
npm run preview:static
```

For local Pages Function testing (after build):

```bash
npm run pages:dev
```

Configure local Function secrets in `.dev.vars` (never commit).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js development server |
| `npm run build` | Static export to `out/` |
| `npm run preview:static` | Serve static `out/` locally |
| `npm run pages:dev` | Wrangler Pages dev (`out/` + Functions) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Node.js unit tests |

## Environment

Copy `.env.example` to `.env.local` for local static builds.

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | Build | Canonical URL, sitemap, Open Graph |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build | Turnstile widget |

Function secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_SECRET`) belong in Cloudflare Pages secrets or `.dev.vars` only — never `NEXT_PUBLIC_*`.

## Cloudflare Pages deployment

| Setting | Value |
|---------|--------|
| **Build command** | `npm ci && npm run build` |
| **Output directory** | `out` |
| **Node.js** | 20 |

Bind in the Cloudflare dashboard (or `wrangler.toml`):

- `INQUIRY_RATE_LIMITER` (preferred) or `INQUIRY_KV` (fallback)
- Secrets: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_SECRET`
- Vars: `ALLOWED_ORIGIN`, `INQUIRY_EMAIL_TO`, `INQUIRY_EMAIL_FROM`

Do **not** deploy DNS or production secrets until the Project Manager completes the email setup checklist.

## Rate limiting

Desired policy: **5 submissions / 15 minutes** per hashed client key.

Cloudflare Rate Limit bindings only support periods of **10 or 60 seconds**, so they cannot express a 15-minute window alone.

This project uses a dual-layer design (no database):

1. **`INQUIRY_RATE_LIMITER`** — burst protection: 5 / 60 seconds
2. **`INQUIRY_KV`** — sustained protection: 5 / 15 minutes (TTL; non-atomic)

Both layers run when both bindings are present.

## Donate Goods inquiry architecture

```text
Static form (Next.js)
  → POST /api/inquiry (Cloudflare Pages Function)
  → Turnstile verify + honeypot + validation + rate limit + IP hash
  → Resend HTTP API
  → info@sunshineservices.org
  → Cloudflare Email Routing (INBOUND ONLY)
  → sunshineservices@gmail.com
```

Staff replies use **Gmail Send mail as** `info@sunshineservices.org` via **Resend SMTP** (configured in Gmail — not in this repository).

Notification headers:

- **From:** `noreply@sunshineservices.org`
- **To:** `info@sunshineservices.org`
- **Reply-To:** customer email (never in From)

## Project structure

```text
src/              # Next.js static site
shared/inquiry/   # Shared validation + inquiry pipeline logic
functions/        # Cloudflare Pages Functions
public/           # Static assets + _headers
out/              # Static export output (gitignored)
```

## Notes

- Do not invent statistics, partnerships, testimonials, or contact details.
- Do not publish EIN or unconfirmed operational information.
- Do not commit secrets or activate paid services automatically.
