# Slidesly — Next.js + Sanity Clone

A pixel-faithful recreation of [slidesly.studio](https://www.slidesly.studio/) built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Sanity CMS — ready to deploy to Vercel.

> **Note on copy.** This is a structural and design clone. All body copy in the project has been rewritten in our own words. Replace it with your own brand voice before going live.

---

## Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS** with a custom dark agency theme
- **Sanity** (embedded Studio at `/studio`)
- **Portable Text** for rich blog content
- **Framer Motion**, **Lucide icons**

---

## Project layout

```
slidesly-clone/
├── sanity.config.ts           # Studio config
├── sanity.cli.ts              # Sanity CLI config
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.local.example         # Copy to .env.local and fill in
├── scripts/
│   └── seed.ts                # Seed sample blog posts
└── src/
    ├── app/
    │   ├── layout.tsx         # Root layout, fonts, metadata
    │   ├── page.tsx           # Homepage
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── api/draft/route.ts # Sanity preview mode
    │   ├── blog/
    │   │   ├── page.tsx       # Blog index
    │   │   └── [slug]/page.tsx
    │   ├── projects/page.tsx
    │   ├── contact/page.tsx
    │   ├── legal/[slug]/page.tsx   # Privacy, terms, refund
    │   └── studio/[[...tool]]/page.tsx  # Sanity Studio mount
    ├── components/
    │   ├── layout/   (Header, Footer)
    │   ├── sections/ (Hero, Services, Process, Works, ProblemSolution,
    │   │              Pricing, Reviews, FAQ, RecentBlog)
    │   └── ui/       (Marquee)
    ├── lib/          (constants, utils)
    └── sanity/
        ├── lib/      (client, image, env, queries)
        └── schemas/  (post, author)
```

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

```bash
npx sanity@latest init --env
```

When prompted:
- Choose **Create new project**
- Name it (e.g. "Slidesly CMS")
- Use the **default dataset configuration** (`production`, public)
- **Skip** the schema — you already have one in this repo

This writes a `.env` file with your project ID and dataset. Copy those values into `.env.local`.

### 3. Set environment variables

Copy the example file and fill in the values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=        # optional, for previews
SANITY_PREVIEW_SECRET=any-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Generate a read token at: **sanity.io/manage → your project → API → Tokens** (Viewer or Editor permissions).

### 4. Seed sample blog posts (optional)

```bash
npx sanity exec scripts/seed.ts --with-user-token
```

This adds a sample author and four starter posts so the site has content immediately.

### 5. Run the dev server

```bash
npm run dev
```

- **Site**: http://localhost:3000
- **Studio**: http://localhost:3000/studio

Sign in with the same Sanity account you used to create the project. Anything you publish in the Studio appears on the site within seconds (ISR is set to 60s).

---

## Deploy to Vercel

### One-time setup

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Add environment variables in the Vercel project settings (the same ones from `.env.local`).
4. Deploy.

### CORS for the embedded Studio

After your first deploy, add your Vercel URL as an allowed CORS origin:

**sanity.io/manage → your project → API → CORS Origins → Add CORS origin**

Add both:
- `https://your-app.vercel.app`
- `https://your-custom-domain.com` (if you have one)

Tick **Allow credentials** for both.

### Custom domain

In Vercel: **Settings → Domains → Add**. Update DNS, set `NEXT_PUBLIC_SITE_URL` to the new domain, and re-deploy.

---

## Editing content

All content is editable from the Studio at `/studio`. After deploy this is `https://your-domain.com/studio`.

The Studio currently exposes:

- **Blog Post** — title, slug, excerpt, cover image, category, author reference, published date, reading time, rich text body, SEO overrides
- **Author** — name, role, avatar, bio

To make more sections editable later (homepage hero, services, pricing, etc.), add new schemas under `src/sanity/schemas/` and matching queries in `src/sanity/lib/queries.ts`.

---

## Customization

### Brand colors

Edit `tailwind.config.ts`:

```ts
colors: {
  ink: { DEFAULT: '#0A0A0B', 50: '#18181B', 100: '#1F1F23', 200: '#27272A' },
  cream: '#F5F1EA',
  accent: { DEFAULT: '#FF6B3D', soft: '#FFB199' },
  muted: '#A1A1AA',
}
```

### Fonts

Swap the Google Fonts link in `src/app/layout.tsx` and update the CSS variables in `src/app/globals.css`.

### Static copy

Edit the section components in `src/components/sections/`. Each section is a single file with its own data array at the top — quick to find and tweak.

### Nav / footer / brand

Everything centralized in `src/lib/constants.ts`.

---

## Replacing static images

The hero, project cards, and blog cards currently use gradient placeholders. To swap in real images:

1. Add files to `/public/images/`
2. Replace the placeholder `div` (the one with the gradient classes) with `<Image src="/images/your-image.jpg" ... />`

For images uploaded via the Studio (cover images, body images), they render automatically using `urlFor()` from `src/sanity/lib/image.ts`.

---

## Wiring up the contact form

The form on `/contact` is a static UI shell. To make it send messages:

**Option A — Resend**
```bash
npm install resend
```
Add a server action that calls `resend.emails.send(...)`.

**Option B — Formspree / Web3Forms / Tally**
Replace the `<form>` action with the endpoint from your provider.

**Option C — Vercel Server Actions**
Add `'use server'` to a function in `src/app/contact/actions.ts` and call it from the form.

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Run the production build
npm run lint      # Lint
npm run typegen   # Generate TS types from Sanity schema
```

---

## License

This project is yours to use and modify. The original site at slidesly.studio belongs to Slidesly Studio — replace branding, copy, and imagery with your own before publishing publicly.
