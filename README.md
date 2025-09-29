# EventMatch MVP

**Stack**: Next.js 14 (App Router) · Tailwind · Prisma (SQLite by default)

## 1) Install & Run
```bash
npm i
npm run db:push
npm run db:seed
npm run dev
```

Visit http://localhost:3000

## 2) Deploy on Vercel
- Push this repo to GitHub
- Import on Vercel → Framework: Next.js
- For demo you can keep SQLite locally. For production, set `DATABASE_URL` to a Postgres (Neon/Supabase) and update `schema.prisma` provider to `postgresql`, then:
```bash
npx prisma migrate deploy
npm run db:seed
```