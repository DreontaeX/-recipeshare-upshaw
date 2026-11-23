# RecipeShare Implementation Plan

This plan follows [docs/spec.md](spec.md) and builds only the Must features M1–M7. It assumes Next.js with the App Router, TypeScript, Supabase/PostgreSQL, and Vercel.

## 1. Initialize the application

- **Features:** Foundation
- **Files:** `package.json`, `tsconfig.json`, `next.config.*`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.env.example`
- **Work:**
  - Create the Next.js TypeScript app.
  - Configure scripts for `dev`, `test`, and `build`.
  - Add placeholder environment-variable names only, such as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Test:** Add a basic app smoke test after the initial page renders.
- **Check:** Run `npm install && npm run dev`, open `http://localhost:3000`, and confirm the app loads.

## 2. Set up Supabase and the database schema

- **Features:** M6
- **Files:** `supabase/schema.sql`, `lib/supabase/client.ts`, `lib/supabase/server.ts`, `.env.example`
- **Work:**
  - Create Supabase projects only on free-plan resources.
  - Add `recipes` and `ratings` tables with fields needed by M1–M5.
  - Store the image URL, author name, cuisine, category, ingredients, steps, prep time, average/rating metadata, and creation time.
- **Test:** Add a schema/integration test or a small database helper test when database access is first implemented.
- **Check:** Confirm the tables appear in Supabase and read/write operations succeed from the app using environment variables.

## 3. Deploy an early working skeleton

- **Features:** Foundation and M6
- **Files:** `.github/workflows/ci.yml`, `README.md`, app layout/page files
- **Work:**
  - Connect the GitHub repository to Vercel.
  - Add Supabase environment variables to Vercel, never to Git.
  - Deploy an initial page using the hosted database.
- **Test:** Ensure the production build passes and the deployed app returns successfully.
- **Check:** Open the Vercel URL, verify the page loads from the deployed environment, and redeploy once to confirm the setup is repeatable.

## 4. Build recipe cards and the home page

- **Features:** M1
- **Files:** `app/page.tsx`, `app/loading.tsx`, `components/RecipeCard.tsx`, `lib/recipes.ts`
- **Work:**
  - Read recipes from Supabase.
  - Show photo, title, cuisine, category, and average rating for each card.
- **Test:** Add a component or helper test that verifies every card field and average rating are rendered.
- **Check:** Insert a recipe in Supabase and confirm it appears as a complete card on the home page.

## 5. Add recipe details

- **Features:** M2
- **Files:** `app/recipes/[id]/page.tsx`, `components/RecipeDetails.tsx`, `lib/recipes.ts`
- **Work:**
  - Add a dynamic detail route.
  - Render all recipe fields and the author's name.
- **Test:** Add a route test or server helper test for loading a recipe and verifying its detail fields.
- **Check:** Click a home-page card and confirm the detail page shows every saved field and author.

## 6. Add recipe creation and required-field validation

- **Features:** M3
- **Files:** `app/recipes/new/page.tsx`, `components/RecipeForm.tsx`, `lib/validation.ts`, `app/api/recipes/route.ts`
- **Work:**
  - Build fields for author name, title, cuisine, category, ingredients, steps, prep time, and image URL.
  - Use dropdowns for cuisine and category.
  - Reject missing fields and show the exact missing-field feedback; save only valid recipes.
- **Test:** Add tests for required-field validation and Supabase insert behavior.
- **Check:** Submit a complete recipe and confirm it appears on the home page. Submit once with each required field empty and confirm it is not saved.

## 7. Add cuisine and category filtering

- **Features:** M4
- **Files:** `app/page.tsx`, `components/RecipeFilters.tsx`, `lib/recipes.ts`
- **Work:**
  - Add cuisine and category dropdown filters.
  - Combine both filters and support clearing them to show all recipes.
  - Show “No recipes found” when no recipe matches.
- **Test:** Add the first meaningful behavior test covering the Iranian + Main Dish combination and clearing filters.
- **Check:** Select an existing combination, confirm only matches appear, clear the choices, and verify a no-match combination shows “No recipes found.”

## 8. Add recipe ratings

- **Features:** M5
- **Files:** `app/recipes/[id]/page.tsx`, `components/RatingControl.tsx`, `app/api/ratings/route.ts`, `lib/ratings.ts`
- **Work:**
  - Add 1–5 star rating controls.
  - Recalculate and persist the average rating and rating count after each rating.
  - Refresh the card and detail view after a rating.
- **Test:** Add a unit test that verifies average and count calculations, including multiple ratings.
- **Check:** Submit a 5-star and 3-star rating; confirm the average becomes 4.0 with 2 ratings on both detail and card views.

## 9. Verify shared persistence

- **Features:** M6
- **Files:** Supabase schema and migration files, `lib/recipes.ts`, `lib/ratings.ts`
- **Work:**
  - Verify recipes and ratings are stored in Supabase rather than browser memory.
  - Remove remaining mock or local-storage data paths.
- **Test:** Add an integration test that creates a recipe/rating, reads it, and confirms it persists independently of the browser session.
- **Check:** Add a recipe on one browser/computer, open the app in another browser, and confirm it is visible. Redeploy and confirm both data and ratings remain.

## 10. Add sample data

- **Features:** M7
- **Files:** `supabase/seed.sql`, `README.md`
- **Work:**
  - Seed at least two recipes with different cuisines and categories.
  - Document how to run the seed in the README.
- **Test:** Add a seed verification test or integration assertion for at least two distinct sample records.
- **Check:** Open the deployed app and confirm both sample recipes appear and can be used to test cuisine/category filtering.

## 11. Finish deployment and quality checks

- **Features:** M1–M7 and E3–E7
- **Files:** `.github/workflows/ci.yml`, `package.json`, `README.md`, `.env.example`, `AGENTS.md`
- **Work:**
  - Ensure `npm test` and `npm run build` pass together.
  - Configure GitHub Actions to test and build every push.
  - Confirm pushes to `main` deploy through Vercel.
  - Add the live URL and feature checklist to the README.
- **Test:** Run the complete suite and production build at least once locally and once in CI.
- **Check:** Push a commit to `main`, verify CI passes, verify Vercel deploys it, and confirm M1–M7 against the deployed app.
