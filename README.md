# Sunshine Global Community Services

Public website for Sunshine Global Community Services, an Illinois 501(c)(3) public charity.

**Positioning:** From Surplus to Service.

## Stack (Version 1 foundation)

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

No CMS, database, authentication, payments, or analytics in this phase.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Node.js unit tests |

## Environment

Copy `.env.example` to `.env.local` and adjust placeholders as needed.

`NEXT_PUBLIC_SITE_URL` defaults to `https://example.com` until a production domain is finalized.

Never put secrets in `NEXT_PUBLIC_*` variables.

## Render deployment (temporary hosting)

The site runs as a standard Next.js Node server — suitable for a Render **Web Service** while a permanent domain is not yet purchased.

| Setting | Value |
|---------|--------|
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |

After the first deploy, set this environment variable in the Render dashboard:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata, sitemap, and canonical links |

Use your temporary Render URL (for example `https://your-service.onrender.com`) as `NEXT_PUBLIC_SITE_URL`. Update it again when a permanent domain is connected.

Do not put inquiry email credentials, `RATE_LIMIT_SECRET`, or other server secrets in the repository. Configure those only in Render Environment when approved for production.

Render sets `PORT` automatically; `next start` uses it by default.

## Donate Goods Inquiry — Production Configuration

Email delivery is **not configured** in this repository.

Before real public submissions can be accepted in production:

1. **Confirm a real Sunshine mailbox** for inquiry notifications. Do not invent one.
2. **Select an email provider separately** (Project Manager decision). Do not wire a vendor until approved.
3. Store provider credentials as **server-side** environment variables only (`INQUIRY_EMAIL_TO`, `INQUIRY_EMAIL_FROM`, `EMAIL_PROVIDER_API_KEY`).
4. Implement the provider’s `send()` path in the email abstraction, verify delivery end-to-end, then set `EMAIL_PROVIDER_READY=true`.
5. Set `RATE_LIMIT_SECRET` (server-only) for salted client-key hashing.
6. Replace process-local rate limiting with a **durable/shared** rate-limit mechanism appropriate to the hosting environment.

### Why durable rate limiting matters

Current inquiry rate limiting uses an in-memory `RateLimiter` implementation (5 submissions / 15 minutes / salted hashed client key).

**In-memory rate limiting is process-local and does not reliably protect multi-instance/serverless deployments.** Each instance has its own memory, so limits can be bypassed across replicas. Production needs a shared limiter (edge middleware, platform tooling, or similar) behind the same `RateLimiter` interface — without requiring a database for this form.

### Runtime behavior

| Environment | Provider configured? | Result |
|-------------|----------------------|--------|
| Development / test | No | Inquiry validated; UI states it was **not emailed** (`development_accepted`) |
| Production | No | Generic failure — **no success**, no fake delivery |
| Production | Yes, provider reports success | Success (`delivered`) |
| Production | Yes, provider fails | Generic failure |

Donor confirmation emails are **not** sent today. That remains a future capability on the same provider abstraction after mailbox/provider decisions are finalized.

Photo uploads are **not** supported. Donors may optionally describe goods in text.

No database is required for the current inquiry path.

### Inquiry flow

```text
Form
  → Server Action
  → Honeypot + RateLimiter.check(...)
  → Shared validation
  → Inquiry service
  → Email delivery abstraction
```

## Project structure

```text
src/
  app/           # Routes, layout, SEO, server actions
  components/    # Shared UI and page sections
  content/       # Structured page content
  lib/           # Site config, inquiries, email abstraction
  styles/        # Global design tokens
  types/         # Shared TypeScript types
public/          # Static assets
```

## Notes

- Do not invent statistics, partnerships, testimonials, or contact details.
- Do not publish EIN or unconfirmed operational information.
- Agent brief Markdown files in the repository root are planning references only.
