# Next Docs CMS (FastAPI-style)

A full-stack Next.js 14 (App Router) documentation CMS with Prisma, basic admin auth via env credentials, a clean UI, and a blog module.

## Tech
- Next.js 14 (App Router + Server Actions)
- Prisma ORM (SQLite by default)
- Tailwind CSS (custom dark theme: #001221 | #228fb3 | #309bbb | #001424)
- Markdown rendering via `react-markdown` + `remark-gfm`
- Basic auth (no register): env-based admin login, signed JWT cookie, protected `/admin` via middleware

## Getting started
```bash
# 1) Install deps
pnpm i   # or npm i / yarn

# 2) Prepare env
cp .env.example .env
# change ADMIN_USERNAME / ADMIN_PASSWORD / AUTH_SECRET

# 3) Initialize DB and seed sample data
npx prisma migrate dev --name init
npm run seed

# 4) Run
npm run dev
```

Visit:
- Public docs: http://localhost:3000
- Admin: http://localhost:3000/admin  (login required)

## Content model
- Topic → Section → Page (published boolean). Each Section renders a "table of contents" listing its Pages.
- Blog with Markdown content and tags (JSON).

## Deployment
- Works on Vercel (set `DATABASE_URL` to a managed SQLite or Postgres).
- Set env vars in Vercel:
  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`, `DATABASE_URL`
- Run `prisma migrate deploy` on build or use Vercel's prisma integration.

## Notes
- This starter uses Server Actions for CRUD (no client libs needed).
- For Postgres, change `datasource db { provider = "postgresql" }` and update `DATABASE_URL` accordingly.
- Search uses simple `contains` queries; swap for full-text search if needed.
