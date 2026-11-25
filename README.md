# RecipeShare

A community recipe-sharing app built with Next.js, TypeScript, Prisma, and PostgreSQL.

Live URL: Not deployed yet.

## Run locally

```bash
npm install
```

Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string. Then run:

```bash
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests and build

```bash
npm test
npm run build
```

`npm run db:deploy` applies checked-in migrations in a deployment environment. Never commit `.env` or database credentials.

## Feature checklist

- [x] M1 — Browse recipe cards with photos, title, cuisine, category, and average rating.
- [x] M2 — Open a recipe to see its author and complete ingredients, steps, and prep time.
- [x] M3 — Add a recipe with required-field validation and field-specific messages.
- [x] M4 — Filter by cuisine and category together, clear filters, and see an empty state when no recipes match.
- [x] M5 — Submit 1–5 star ratings; averages and counts come from persisted ratings.
- [~] M6 — Prisma/PostgreSQL persistence and migration are verified on Neon; Vercel/shared deployment verification is pending.
- [~] M7 — Four sample recipes are seeded and verified on Neon; live deployment is pending.
- [ ] S1 — Google sign-in and profile.
- [ ] S2 — Edit and delete own recipes.
- [ ] S3 — Fair, signed-in ratings.
- [ ] S4 — Image uploads.
- [ ] S5 — Keyword search.
- [ ] S6 — Recipe sorting.
- [ ] Could — Comments, favorites, servings scaler, recipe video, dietary tags, and phone-friendly layout.

The app reads and writes recipes and ratings through PostgreSQL. Run the seed command to populate sample recipes.
