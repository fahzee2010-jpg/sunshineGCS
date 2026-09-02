# Sunshine Global Community Services

## Website Architecture, Domain & Hosting Recommendation

**Audit date:** 2026-08-31  
**Scope:** Current repository only — no code changes made during this audit  
**Prior audit status:** No saved prior audit/report was found in the repository (`*audit*` search returned 0 files). This report is a fresh analysis.

**Uncertainty rule:** Items that cannot be determined from the repo are marked **Cannot be determined from the codebase — requires verification.** Pricing that depends on live vendor catalogs is marked **REQUIRES CURRENT EXTERNAL VERIFICATION**.

---

## Executive Summary

Sunshine Global Community Services’ website is a **Next.js 16 App Router** public marketing and inquiry site built with **React 19**, **TypeScript**, and **Tailwind CSS v4**.

It is **not** a CMS site, **not** a database-backed app, **not** an authenticated admin portal, and **not** a payment-enabled donation platform yet.

What it *is*:

- Mostly **statically prerendered** pages (build output shows all app routes as static `○`)
- One real backend capability: a **Donate Goods inquiry Server Action** with honeypot, rate limiting, validation, PII-safe logging, and an **unwired email provider abstraction**
- Informational placeholders for Get Assistance, Volunteer, Contact, Donate Money, Privacy, and Community Store (no live PII collection on those pages)
- Already documented for temporary **Render Web Service** deployment (`npm run build` / `npm run start`)
- Git remote present: `https://github.com/fahzee2010-jpg/sunshineGCS.git`

**Bottom-line recommendation:** Keep the current architecture. Register a **`.org` domain**, host on a **Node-capable Next.js platform** (Render is already prepared; Vercel is an equally strong Next.js-native alternative), set `NEXT_PUBLIC_SITE_URL`, then later add transactional email + durable rate limiting before enabling public inquiry delivery.

Do **not** buy a VPS, database, CMS, or shared PHP hosting for launch.

---

## 1. Current Technology Stack

### Frontend (verified)

| Item | Finding |
|------|---------|
| Framework | Next.js **16.3.3** (App Router) |
| UI library | React **19.2.8** + React DOM **19.2.8** |
| Language | TypeScript **^5** |
| CSS | Tailwind CSS **v4** (`@tailwindcss/postcss`) |
| Component libraries | Custom design system only (no MUI/Chakra/shadcn package) |
| Build tool | Next.js / Turbopack production build |
| Rendering | **Hybrid leaning static**: public pages are prerendered static; Donate Goods form uses client component + Server Action |
| Client components | `Header.tsx`, `DonateGoodsInquiryForm.tsx`, `error.tsx` |

### Backend (verified)

| Item | Finding |
|------|---------|
| Backend framework | Next.js Server Actions (App Router) — **no Express/FastAPI/etc.** |
| Runtime | **Node.js** (`next start`) |
| API routes | **None** — no `route.ts` files found |
| Server Actions | `src/app/actions/donate-goods-inquiry.ts` |
| Background jobs | **None** |
| Webhooks | **None** |

### Database (verified)

| Item | Finding |
|------|---------|
| Database | **None** |
| ORM | **None** (no Prisma/Drizzle/etc.) |
| Schema | N/A |
| Production DB required | **Not required** for current codebase |

### Storage (verified)

| Item | Finding |
|------|---------|
| Local filesystem uploads | **Not implemented** |
| Object storage | **Not used** |
| Image uploads | Explicitly deferred (Donate Goods form text note) |
| `public/` assets | Only `public/.gitkeep` — no favicon/images committed |

### Authentication (verified)

| Item | Finding |
|------|---------|
| Auth | **None** |
| Admin users / roles | **None** |
| Session cookies for login | **None** |

### Runtime dependencies (verified from `package.json`)

**Production:** `next`, `react`, `react-dom`  
**Dev:** Tailwind, ESLint, TypeScript, `tsx`, Next ESLint config, React types

This is an intentionally lean stack — appropriate for a nonprofit launch.

### External services (verified)

| Service | Purpose | Required now? | Production dependency | Alternative |
|---------|---------|---------------|----------------------|-------------|
| Unwired email abstraction (`env-provider`) | Future inquiry email send | Not until wired | Optional until `EMAIL_PROVIDER_READY=true` | Resend / Postmark / SES (not selected in code) |
| Payment processor | Monetary donations | No — page states not available | Not in code | Stripe / PayPal / donor platforms — BUY LATER |
| Analytics | Privacy-conscious analytics | No | Placeholder env only | Plausible / Fathom / GA4 — BUY LATER |
| CMS | Content editing | No | Content is TypeScript modules under `src/content/` | Sanity/Contentful — NOT REQUIRED for launch |
| Database | Persistence | No | N/A | Only if later forms need storage |
| Object storage | Photos | No | Deferred | S3/R2 later if photo upload is approved |

---

## 2. Architecture Diagram (actual)

```text
User
  ↓
Domain / DNS  (not purchased yet — SITE_URL placeholder example.com)
  ↓
HTTPS Host (Node process: next start)  e.g. Render Web Service
  ↓
Next.js App Router
  ├─ Statically prerendered pages (Home, About, Programs, …)
  ├─ Client UI (Header, Donate Goods form)
  └─ Server Action: submitDonateGoodsInquiry
        ↓
     Honeypot → RateLimiter (in-memory today)
        ↓
     Validation → processDonateGoodsInquiry
        ↓
     EmailProvider abstraction
        ↓
     [UNWIRED] — fails closed in production until vendor wired
```

### Architecture classification

| Option | Fits current code? |
|--------|--------------------|
| A. Pure static website | **No** — Server Action requires Node runtime for Donate Goods |
| B. Static + serverless functions | **Possible** on Vercel/Netlify-style platforms |
| C. Full-stack application | **Yes (lightweight)** — current implementation |
| D. CMS-based website | **No** |
| E. Traditional shared PHP/Apache app | **No** — wrong runtime |

**Currently implemented:** Lightweight full-stack Next.js (mostly SSG pages + one Server Action).

---

## 3. Routes & page maturity (verified)

| Route | Status |
|-------|--------|
| `/` | Production content |
| `/about` | Production content |
| `/donate-goods` | Production content + **live inquiry form** (delivery unwired) |
| `/corporate-partners` | Production content |
| `/programs` | Production content |
| `/get-assistance` | Production informational + **placeholder** (no form) |
| `/volunteer` | Production informational + **placeholder** (no form) |
| `/contact` | Production informational + **placeholder** (no contact details/form) |
| `/donate` | Production informational — **payments not available** |
| `/impact` | Production informational — no invented stats |
| `/transparency` | Production informational — no invented documents |
| `/community-store` | Placeholder page |
| `/privacy` | Placeholder page |
| `/design-system` | Internal preview, `robots: noindex,nofollow`, omitted from sitemap |

---

## 4. Infrastructure Requirements

### Required

- Node.js runtime capable of running `next start`
- HTTPS / TLS certificate
- Environment variable: `NEXT_PUBLIC_SITE_URL`
- Git-based deploy from GitHub
- Modest CPU/RAM (single small instance is enough for current traffic profile — **Cannot be determined from the codebase** exact visitor volume)

### Recommended (before enabling public inquiry email)

- `RATE_LIMIT_SECRET`
- Confirmed inquiry mailbox (`INQUIRY_EMAIL_TO` / `INQUIRY_EMAIL_FROM`)
- Wired transactional email provider + `EMAIL_PROVIDER_API_KEY` + `EMAIL_PROVIDER_READY=true`
- Durable/shared rate limiting (README already warns in-memory is process-local)

### Not required for launch of current code

- Database
- Redis (unless chosen later for shared rate limits)
- Object storage
- Authentication
- Payment processor
- CMS
- Docker
- Cron jobs
- Webhooks
- CDN **required** (nice-to-have; static assets are tiny today)

### Build / start (verified)

```bash
npm install
npm run build
npm run start
```

Dev: `npm run dev` → [http://localhost:3000](http://localhost:3000)

---

## 5. Domain Analysis

### Preferred structure

**Primary recommendation:** `sunshineglobalcommunityservices.org`

**Also configure:** `www.sunshineglobalcommunityservices.org` → redirect to apex (or apex → www — pick one canonical)

**Why `.org`:** Organization is an Illinois 501(c)(3) public charity. `.org` signals nonprofit credibility for corporate donors, volunteers, and community partners. Agent brief SEO terms emphasize Illinois/community charity language; `.org` aligns with that trust model.

**Alternatives:** `.com` is acceptable if `.org` is unavailable, but prefer `.org` for nonprofit positioning.

**Availability / exact string registration:** **Cannot be determined from the codebase — requires verification** at registrar checkout.

### DNS records needed (conceptual)

| Record | Purpose |
|--------|---------|
| A / ALIAS / CNAME | Point domain to host (provider-specific) |
| AAAA | Optional IPv6 if host supports |
| CNAME `www` | www → apex or host |
| TXT | Domain verification / SPF |
| MX | Business email (when purchased) |
| SPF / DKIM / DMARC | Email authentication (when email goes live) |
| SSL | Provided by host (Let’s Encrypt / platform cert) |

Redirect requirement: enforce **HTTPS** and **one canonical host** (www or non-www).

---

## 6. Domain Registrar Comparison

**REQUIRES CURRENT EXTERNAL VERIFICATION** for live checkout prices. Observed third-party snapshots around Aug 2026 (not guarantees):

| Registrar | Strengths | Risks / notes | Nonprofit fit |
|-----------|-----------|---------------|---------------|
| **Cloudflare Registrar** | At-cost renewals; excellent DNS/security; free WHOIS privacy typically | Must use Cloudflare DNS; less “beginner email hosting” | Excellent if comfortable with Cloudflare |
| **Porkbun** | Low predictable pricing; free WHOIS privacy; simple UI | Still verify renewal at checkout | Excellent for nonprofits |
| **Namecheap** | Familiar UI; promos | First-year promo / higher renewal pattern common | OK if you track renewals |
| **GoDaddy** | Ubiquitous support | Often higher renewals / upsells | Usually **not** best value |

**Primary registrar recommendation:** **Cloudflare Registrar** *or* **Porkbun**  
- Choose **Cloudflare** if you want DNS + security + at-cost renewals in one place.  
- Choose **Porkbun** if you want the simplest registrar UX and plan DNS separately.

---

## 7. Hosting Comparison (scored vs *this* codebase)

Scores 1–10 against **actual** needs: Next.js 16 + Server Actions, no DB, low ops, nonprofit budget.

| Provider | Fit | Ease | Cost | Scale | Security | Maint. | DB | Forms/API | Overall | Notes |
|----------|-----|------|------|-------|----------|--------|----|-----------|---------|-------|
| **Render** | 9 | 9 | 8 | 7 | 8 | 9 | 5 | 9 | **9** | Already documented in README; classic `build`/`start` Web Service |
| **Vercel** | 10 | 10 | 9* | 9 | 9 | 10 | 5 | 10 | **10** | Best native Next.js platform; free tier often enough initially (*verify current Hobby limits*) |
| **Netlify** | 8 | 8 | 8 | 7 | 8 | 8 | 4 | 8 | **8** | Works, but Next.js 16 features may need adapter care — **verify** |
| **Cloudflare Pages/Workers** | 7 | 6 | 9 | 9 | 9 | 7 | 3 | 7 | **7** | Excellent edge; Next.js Server Actions compatibility needs careful verification |
| **Railway** | 8 | 8 | 6 | 8 | 7 | 8 | 7 | 8 | **7** | Fine Node host; usually costlier than needed |
| **DigitalOcean App Platform** | 8 | 7 | 6 | 8 | 8 | 7 | 7 | 8 | **7** | Good but more ops than needed |
| **AWS (Amplify/ECS/etc.)** | 7 | 4 | 5 | 10 | 9 | 4 | 9 | 8 | **5** | Overkill for this site |
| **Shared hosting (cPanel/PHP)** | 2 | 3 | 7 | 3 | 4 | 5 | 3 | 2 | **2** | Wrong runtime for Next.js Server Actions |

\*Cost scores assume typical nonprofit traffic; **REQUIRES CURRENT EXTERNAL VERIFICATION** of free-tier limits and sleep policies (Render free tiers historically sleep).

---

## 8. Cost Analysis

All dollar figures below are **planning estimates** and **REQUIRES CURRENT EXTERNAL VERIFICATION** before purchase.

### Option A — Lowest sensible cost

| Item | Estimate |
|------|----------|
| Domain `.org` | ~$7–$12 / year |
| Hosting (Vercel Hobby or Render free/starter) | ~$0–$7 / month |
| Business email | Deferred or free forwarding initially |
| Transactional email | Deferred until form delivery needed |
| Database / storage / payments | $0 |

**Rough year 1:** domain + $0–$85 hosting  
**Tradeoff:** Free tiers may sleep/cold-start or have limits; inquiry email still disabled until configured.

### Option B — Best overall value (**recommended**)

| Item | Estimate |
|------|----------|
| Domain (Cloudflare/Porkbun) | ~$8–$12 / year |
| Hosting (Render Starter **or** Vercel) | ~$0–$20 / month |
| Business email (Google Workspace Nonprofit or M365 Nonprofit if eligible) | often discounted / free if approved — **verify eligibility** |
| Transactional email (Resend/Postmark free tier) | ~$0 initially |
| Payments | $0 until Donate Money goes live |

**Rough monthly:** ~$0–$25  
**Rough annual:** ~$50–$300 depending on paid hosting + email

### Option C — More scalable/professional

| Item | Estimate |
|------|----------|
| Domain + Cloudflare Pro (optional) | higher |
| Vercel Pro / always-on Render | ~$20–$50+ / month |
| Workspace email + Postmark | ~$10–$30 / month |
| Stripe + monitoring | usage-based |

**When worthwhile:** sustained traffic, multiple forms storing data, staff workflows, paid ads, or compliance needs.

---

## 9. Nonprofit Requirements vs Current Code

| Need | Supported today? | Gap |
|------|------------------|-----|
| Donate Goods | Yes (form) | Email delivery unwired; photos deferred |
| Corporate Partner inquiries | Pathways to Donate Goods / Contact | No separate form |
| Get Assistance | Informational | No live request form (intentional) |
| Donate Money | Informational disclaimer | No processor |
| Volunteer | Informational | No live form |
| Secure forms | Strong design for Donate Goods | Needs provider + durable rate limit |
| Privacy-conscious analytics | Not implemented | Privacy page still placeholder |
| HTTPS | Host responsibility | Configure on deploy |
| Backups | Git is source of truth | No DB/media to back up yet |
| Accessibility | Skip link, focus styles, FAQ details, semantic headings | Ongoing QA |
| SEO | Titles, descriptions, canonical, sitemap, robots | No Organization JSON-LD; no favicon assets; `SITE_URL` still placeholder until set |

---

## 10. Security Audit

### Findings

| Severity | Finding |
|----------|---------|
| 🟠 High | **Email delivery unwired** — production correctly fails closed, but public form exists; operators must not set `EMAIL_PROVIDER_READY=true` until real send works |
| 🟠 High | **In-memory rate limiting** — insufficient for multi-instance/serverless; documented in README |
| 🟡 Medium | **`RATE_LIMIT_SECRET` optional** — without it, hashing is unsalted (still no raw IP storage, but weaker) |
| 🟡 Medium | **No Content-Security-Policy** header yet (baseline headers exist) |
| 🟡 Medium | **Privacy policy still placeholder** — should be completed before analytics or more forms collect PII |
| 🟢 Low | Design-system route publicly reachable (noindex, not in sitemap) |
| 🟢 Low | No favicon/social images in `public/` |
| 🔵 Info | Security headers present: nosniff, DENY frame, referrer policy, permissions-policy; `poweredByHeader: false` |
| 🔵 Info | Honeypot + opaque spam response; client results strip internal codes |
| 🔵 Info | Structured PII-free logging rules in inquiry logger |
| 🔵 Info | No secrets found in repo; `.env` / `.env.local` absent; `.gitignore` ignores env files except `.env.example` |
| 🔵 Info | No auth/admin routes to harden |
| 🔵 Info | No file uploads / no card data handling |

### Not found (good)

- No committed API keys
- No Stripe/PayPal keys
- No database credentials
- No accidental mailto/tel with fake contacts on Contact page (verified pattern from content architecture)

---

## 11. Performance Audit

| Area | Finding |
|------|---------|
| Bundle | Extremely lean production deps (Next/React only) |
| Images | Media placeholders — little/no real imagery yet |
| Fonts | Project CSS tokens; no heavy third-party font CDN package evident in dependencies |
| Caching | Static prerender of pages is favorable |
| CDN | Beneficial later; not a blocker |
| Core Web Vitals risk | Low for current content-heavy/static pages — **full Lighthouse numbers cannot be determined from the codebase alone** |

**Recommendation:** Keep static generation; add CDN via host/Cloudflare when domain is live; optimize images only when real photography is added.

---

## 12. SEO & Domain Architecture

### Present (verified)

- Per-page titles/descriptions
- Canonical URLs via `SITE_URL`
- Open Graph / Twitter card metadata helpers
- `sitemap.ts` from `pages` map
- `robots.ts` allow-all + sitemap pointer
- `/design-system` noindex
- `not-found` / error routes exist in app tree

### Missing / incomplete

- Organization structured data (JSON-LD) — intentionally avoided earlier until verified org facts
- Favicon / apple-touch / OG images in `public/`
- Full Privacy policy page
- Production `NEXT_PUBLIC_SITE_URL` still defaults to `https://example.com` until set
- Sitemap currently will emit `example.com` URLs until env is updated

---

## 13. Form Architecture

### Donate Goods (only live form)

**Flow:** Form → Server Action → honeypot → rate limit → validation → email abstraction  

**Stores data?** No database — email-only intended  
**Spam protection?** Honeypot + rate limit (in-memory)  
**CAPTCHA?** Not implemented  
**Sensitive data?** Business contact fields; no SSN/payment/medical  
**Photos?** Deferred  

**Production without provider:** generic failure (no fake success) — verified in `process-inquiry.ts`

### Get Assistance / Volunteer / Contact

**Live forms?** No — placeholders only  
**PII collection?** No  

### Safest near-term form architecture

1. Keep Donate Goods as email-forwarded inquiries (no DB)  
2. Wire Resend/Postmark/SES behind existing abstraction  
3. Add shared rate limiting appropriate to host  
4. Add CAPTCHA only if spam becomes a problem  
5. Add assistance/volunteer forms only after operational policies exist  

---

## 14. Donation / Payment Architecture

**Current state:** `/donate` explicitly states online monetary donations are **not yet available**. No Stripe/PayPal code, no checkout, no webhooks, no PCI surface.

**Appropriate future architecture:** Hosted checkout (Stripe Checkout / PayPal Donate / nonprofit donor platform) — never store card data on this server.

---

## 15. Email Architecture

### Business email vs transactional email

| Type | Purpose | Example |
|------|---------|---------|
| **Business email** | Humans send/receive mail | `info@yourdomain.org`, Google Workspace |
| **Transactional email** | Website sends automated messages | Inquiry notifications to staff |

### Recommendation

1. **Business email:** Apply for **Google Workspace for Nonprofits** or **Microsoft 365 Nonprofit** if eligible (**verify eligibility**). Until then, registrar forwarding is a temporary stopgap — not ideal long-term.  
2. **Transactional email:** **Resend** or **Postmark** (simple API, good deliverability). Wire into existing `EmailProvider` — do not invent a second architecture.  
3. Configure SPF/DKIM/DMARC on the domain when either goes live.

---

## 16. Backups & Disaster Recovery

### What needs backup today

| Asset | Backup method |
|-------|---------------|
| Source code / content | GitHub repository (primary) |
| Environment variables | Secure password manager / host secret store (not git) |
| Database | N/A |
| Uploaded media | N/A |

### Suggested nonprofit DR targets

| Metric | Suggested target |
|--------|------------------|
| RPO | Minutes–hours for code (Git); env vars recoverable from vault |
| RTO | < 4 hours for static/marketing site restore |
| Max downtime | Prefer < 1 business day for launch-phase site |

### Plan

1. GitHub as source of truth  
2. Host one-click redeploy from `main`  
3. Document env var checklist  
4. When DB/media appear later, add automated backups  

---

## 17. Deployment Architecture (recommended path)

1. GitHub repo (already exists: `fahzee2010-jpg/sunshineGCS`)  
2. Host: **Render Web Service** (already documented) **or** **Vercel**  
3. Build: `npm run build`  
4. Start: `npm run start` (Render) / platform default (Vercel)  
5. Env: `NEXT_PUBLIC_SITE_URL=https://your-domain-or-temp-url`  
6. Connect custom domain + SSL  
7. DNS at registrar/Cloudflare  
8. Smoke-test key routes  
9. Rollback: redeploy previous Git commit  

**Do not enable** `EMAIL_PROVIDER_READY=true` until send is verified.

---

## 18. Local Development

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm test
npm run lint
npm run typecheck
```

**Port:** Next defaults to **3000** (override with `PORT`).  
**Forms:** Donate Goods works in development with `development_accepted` when email not configured.  
**API routes:** None to test.

---

## 19. Production Readiness Score (0–100)

| Category | Score | Notes |
|----------|------:|-------|
| Architecture | 90 | Lean, appropriate, no over-engineering |
| Security | 78 | Strong form design; email unwired; rate limit memory; CSP gap |
| Performance | 88 | Tiny dependency set; static pages |
| Accessibility | 82 | Good foundations; continue QA |
| SEO | 75 | Solid metadata; missing favicon/JSON-LD; placeholder SITE_URL |
| Forms | 70 | One secure form; others correctly deferred |
| Donation system | 40 | Intentionally incomplete |
| Maintainability | 92 | Clear content modules; README quality |
| Deployment | 85 | Render prep done; GitHub remote present |
| Backup/recovery | 80 | Git-centric is enough for now |
| Scalability | 72 | Fine for launch; rate limiter needs upgrade with scale |

**Overall: ~80 / 100** — content-ready for temporary hosting; not fully production-complete for public inquiry delivery or monetary donations.

---

## 20. Recommended Architecture (ONE primary)

### Recommended Architecture

| Layer | Choice |
|-------|--------|
| **Domain Registrar** | Cloudflare Registrar *(or Porkbun if simpler UX preferred)* |
| **Domain** | `sunshineglobalcommunityservices.org` + `www` redirect to canonical apex |
| **Hosting** | **Render Web Service** (already prepared) — *or Vercel if PM prefers native Next.js platform* |
| **Frontend** | Current Next.js 16 App Router (keep) |
| **Backend** | Current Server Actions only (keep) |
| **Database** | None |
| **Storage** | None |
| **Business Email** | Google Workspace Nonprofit / M365 Nonprofit if eligible; else temporary forwarding |
| **Transactional Email** | Resend or Postmark (wire later into existing abstraction) |
| **Donation Processing** | None now; Stripe Checkout / nonprofit donor platform later |
| **DNS** | Cloudflare DNS (even if registrar is Porkbun) |
| **Analytics** | Later — privacy-first (Plausible/Fathom) after Privacy policy |
| **Backup** | GitHub + host redeploy + env vault |
| **Monitoring** | Host uptime checks; optional UptimeRobot later |
| **Estimated Cost** | **~$0–$25/month** + **~$8–$12/year domain** (**REQUIRES CURRENT EXTERNAL VERIFICATION**) |

**Why not change architecture before launch?** The codebase already matches a simple, secure nonprofit launch model. Adding CMS/DB/VPS would increase cost and risk without benefit.

---

## 21. Exactly Three Alternatives

### 1. Cheapest Sensible

- Domain: Porkbun `.org`
- Host: Vercel Hobby or Render free/starter
- Email: forwarding only
- No payments / no analytics  

**Who should choose it:** Launch ASAP with minimal spend; accept free-tier limits.

### 2. Best Overall (**recommended**)

- Domain: Cloudflare or Porkbun `.org`
- Host: Render (documented) or Vercel
- Set `NEXT_PUBLIC_SITE_URL`
- Plan nonprofit Workspace email
- Wire Resend/Postmark before relying on Donate Goods in production  

**Why:** Matches the code, budget, and trust needs without overbuilding.

### 3. Scalable Professional

- Cloudflare DNS + WAF
- Vercel Pro / always-on Render
- Workspace email + Postmark
- Durable rate limiting (Upstash Redis or equivalent)
- Stripe Checkout when Donate Money is approved
- Privacy policy + privacy-first analytics  

**When worthwhile:** Higher traffic, multiple staff, paid fundraising campaigns, or compliance pressure.

---

## 22. Implementation Plan

### Phase 1 — Before purchasing
- Confirm legal/branding name for domain
- Check `.org` availability
- Decide Render vs Vercel
- Do not invent contact email until mailbox is real

### Phase 2 — Domain
- Buy `.org`
- Enable WHOIS privacy
- Point DNS to Cloudflare (recommended)

### Phase 3 — Hosting
- Connect GitHub repo
- Build `npm run build` / Start `npm run start` (Render)
- Deploy

### Phase 4 — Environment variables
- Set `NEXT_PUBLIC_SITE_URL` to temporary then permanent URL
- Do **not** set email READY flags yet

### Phase 5 — Forms
- Keep placeholders for assistance/volunteer/contact
- Wire Donate Goods email only after mailbox + provider verified

### Phase 6 — Donation system
- Later — choose Stripe/nonprofit platform; no card storage

### Phase 7 — Email
- Business mailbox + SPF/DKIM/DMARC
- Transactional provider wired to abstraction

### Phase 8 — DNS
- Apex + www canonical
- MX for business email

### Phase 9 — Security
- `RATE_LIMIT_SECRET`
- Shared rate limiter when multi-instance
- Complete Privacy policy
- Consider CSP

### Phase 10 — Testing
- Route smoke tests
- Form failure/success paths
- Mobile + accessibility spot checks

### Phase 11 — Launch
- Cut DNS to production
- Announce only verified contact channels

### Phase 12 — Backup & maintenance
- Protect `main` branch
- Document env vars
- Monthly dependency updates (`npm audit` awareness)

---

## 23. PURCHASE CHECKLIST

| Item | Decision | Why |
|------|----------|-----|
| Domain (`.org`) | **BUY NOW** | Needed for professional nonprofit presence & email |
| Hosting (Render or Vercel) | **BUY NOW** (free tier OK to start) | Site must be publicly reachable |
| DNS (Cloudflare free) | **BUY NOW** (usually free) | Reliable DNS + easier SSL/email auth later |
| Business email (Workspace/M365 Nonprofit) | **BUY LATER** (soon) | Apply for nonprofit pricing; temporary forwarding acceptable briefly |
| Transactional email (Resend/Postmark) | **BUY LATER** | Required before production inquiry delivery |
| Payment processor | **BUY LATER** | Donate Money intentionally offline |
| Database | **NOT REQUIRED** | No persistence in current code |
| Object storage | **NOT REQUIRED** | Uploads deferred |
| CMS | **NOT REQUIRED** | Content is code modules |
| Analytics | **BUY LATER** | After Privacy policy |
| Monitoring/uptime | **BUY LATER** | Nice after launch |
| Backup product | **NOT REQUIRED** now | GitHub suffices without DB/media |
| VPS / AWS complex setup | **NOT REQUIRED** | Overkill |
| Shared cPanel hosting | **NOT REQUIRED** | Incompatible with Next.js Server Actions model |

---

## Risks

1. Launching with `example.com` still in `NEXT_PUBLIC_SITE_URL` → wrong canonicals/sitemap  
2. Enabling `EMAIL_PROVIDER_READY` without a real send implementation → production failures (or worse if mis-wired)  
3. Multi-instance deploy without shared rate limiting → spam risk  
4. Publishing contact/phone before verified → trust/compliance risk  
5. Free-tier host sleep → slow first load (**verify** current Render/Vercel policies)

---

## Open Questions

1. Is `sunshineglobalcommunityservices.org` available?  
2. Nonprofit eligibility for Google/Microsoft email discounts?  
3. Preferred host: stick with Render (already prepared) or switch to Vercel?  
4. Confirmed staff inquiry mailbox address?  
5. Timeline for Donate Money processor selection?  
6. Will Community Store launch require a separate operational site later?

---

## Bottom Line

### 1. Which domain registrar should I use?
**Cloudflare Registrar** (best long-term renewals + DNS) **or Porkbun** (simplest low-cost UX).

### 2. Which domain should I purchase?
**`sunshineglobalcommunityservices.org`** (verify availability). Use `www` as redirect to the canonical host.

### 3. Which hosting provider should I use?
**Render Web Service** (already prepared in this repo) **or Vercel** (best native Next.js alternative). Do **not** use shared PHP hosting.

### 4. What else do I need?
Near-term: domain + hosting + `NEXT_PUBLIC_SITE_URL`.  
Soon after: business email, transactional email (before relying on Donate Goods delivery), `RATE_LIMIT_SECRET`, Privacy policy.  
Later: payments, analytics, photo storage.

### 5. Expected monthly and annual cost?
**Planning range only — REQUIRES CURRENT EXTERNAL VERIFICATION:**  
- **Monthly:** ~$0–$25 for recommended setup  
- **Annual:** ~$50–$300 including domain + light hosting/email  

### 6. What should I do first?
1. Verify and purchase the `.org` domain  
2. Deploy the existing GitHub repo to Render (or Vercel)  
3. Set `NEXT_PUBLIC_SITE_URL` to the live URL  
4. Connect the custom domain + HTTPS  
5. Only then plan mailbox + transactional email wiring  

---

*End of audit. No codebase modifications were made for this report.*
