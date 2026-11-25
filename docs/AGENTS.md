# AGENTS.md

## Purpose

Build RecipeShare, a public recipe-sharing website. Follow `docs/spec.md` as the source of truth for product requirements, acceptance criteria, feature priority, and engineering constraints.

Build the Must features before the Should features. Keep the app deployable on Vercel's free plan.

## Chosen stack

- Next.js with the App Router
- TypeScript
- Prisma with PostgreSQL
- Vercel for hosting and deployment

Use a clean, mobile-friendly UI. Keep the implementation simple and avoid unnecessary dependencies.

## Commands

Before the project has dependencies installed:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

Set up the following scripts in `package.json`:

- `dev`: start the Next.js development server
- `test`: run the complete test suite with one command
- `build`: create the production build

## Coding conventions

- Use TypeScript for application code.
- Use the Next.js App Router conventions and server/client components appropriately.
- Prefer small, self-contained components and functions.
- Keep UI text clear and accessible.
- Use the fixed cuisine and category lists defined in `docs/spec.md`; never allow free-text values for those fields.
- Validate required fields in both the form flow and server-side database operations.
- Use Prisma for parameterized database operations; never construct SQL from unsanitized input.
- Keep environment-variable names documented in `.env.example` without adding values.
- Add or update tests for behavior when implementing a feature. Do not leave a feature working without test coverage.
- Keep all code in this public repository and make small, frequent commits with clear messages.

## Required rules

- Treat `docs/spec.md` as the source of truth. If code or another document conflicts with it, follow the specification and update the relevant documentation if needed.
- Never commit secrets, credentials, private keys, database passwords, or service-role keys.
- Read secrets and environment-specific configuration from environment variables.
- Add a test for each feature once it works. The test suite must eventually include at least three passing tests and run with one command.
- Do not add Should or Could features until the Must features pass their acceptance criteria.
