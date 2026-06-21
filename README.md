This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- [Node.js](https://nodejs.org/) (see `.nvmrc` for version)
- [npm](https://www.npmjs.com/) (comes with Node)
- [PostgreSQL](https://www.postgresql.org/) (local, Docker, or a hosted provider such as Railway, Neon, or Supabase)

```bash
nvm use # if using nvm
```

## Getting Started

Install dependencies:

```bash
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Generate an auth secret:

```bash
openssl rand -base64 32
```

Set `DATABASE_URL` to your Postgres connection string and paste the generated value into `BETTER_AUTH_SECRET`.

### Database SSL

For **local Postgres**, no SSL configuration is needed.

For **hosted providers** (Railway, Neon, Supabase), enable TLS in `.env`:

```env
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true
```

SSL is also enabled automatically when `DATABASE_URL` contains `sslmode=require`.

If certificate validation fails, do not disable `DATABASE_SSL_REJECT_UNAUTHORIZED`. Instead, add your provider's CA certificate or use their documented connection string with proper SSL parameters.

Create the database schema (empty tables, no seed data):

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Email verification (development)

New accounts must verify their email before they can sign in. In development, verification emails are not sent over SMTP — they are logged to the server console instead.

1. Sign up at `/sign-up` with your name, email, and a passkey.
2. You are redirected to `/verify-email`. Check the terminal running `npm run dev` for a log line starting with `[dev email]`.
3. Open the verification URL from that log (Better Auth serves it at `/api/auth/verify-email`).
4. After verifying, sign in at `/sign-in` with your passkey.

Unverified users cannot receive a session. Passkey sign-in is blocked until `emailVerified` is true.

For production, replace the dev stub in `app/lib/email.ts` with a real email provider before deploying.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database

This starter kit uses [Drizzle ORM](https://orm.drizzle.team/) with a **push-based** workflow. There are no committed SQL migrations — each install syncs `app/db/schema.ts` to its own database.

| Script                  | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `npm run db:push`       | Sync the schema to your database (first-time setup or after schema changes)           |
| `npm run db:reset`      | Drop all auth tables and re-sync the schema (wipes all users, sessions, and passkeys) |
| `npm run auth:generate` | Regenerate `app/db/schema.ts` from Better Auth config (after adding plugins)          |

### First-time setup

Point `DATABASE_URL` at an empty Postgres database, then run:

```bash
npm run db:push
```

### Reset the database

To wipe all auth data and recreate empty tables:

```bash
npm run db:reset
```

This drops the `user`, `session`, `account`, `verification`, `passkey`, and `rate_limit` tables, then runs `db:push` to recreate them.

### Schema changes

After changing auth plugins in `app/lib/auth.ts`:

```bash
npm run auth:generate
npm run db:push
```

If you need a full wipe instead of an incremental sync, use `npm run db:reset`.

## Tooling

| Tool                                                      | Purpose                              |
| --------------------------------------------------------- | ------------------------------------ |
| [Next.js](https://nextjs.org/)                            | React framework                      |
| [React](https://react.dev/)                               | UI library                           |
| [TypeScript](https://www.typescriptlang.org/)             | Static typing                        |
| [Tailwind CSS](https://tailwindcss.com/)                  | Utility-first styling                |
| [ESLint](https://eslint.org/)                             | Linting                              |
| [Prettier](https://prettier.io/)                          | Code formatting                      |
| [Husky](https://typicode.github.io/husky/)                | Git hooks                            |
| [lint-staged](https://github.com/lint-staged/lint-staged) | Run linters on staged files          |
| [Vitest](https://vitest.dev/)                             | Unit/component tests                 |
| [Testing Library](https://testing-library.com/)           | React testing utilities              |
| [Playwright](https://playwright.dev/)                     | End-to-end browser tests             |
| [GitHub Actions](https://github.com/features/actions)     | CI (lint, format, tests, build, e2e) |
| [Better Auth](https://www.better-auth.com/)               | Authentication (passkeys)            |
| [Drizzle ORM](https://orm.drizzle.team/)                  | Database schema and queries          |
| [PostgreSQL](https://www.postgresql.org/)                 | Database                             |

## Scripts

| Script                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the development server                        |
| `npm run build`         | Create a production build                           |
| `npm run start`         | Serve the production build                          |
| `npm run lint`          | Run ESLint                                          |
| `npm run lint:fix`      | Run ESLint with auto-fix                            |
| `npm run format`        | Format with Prettier (incl. Tailwind class sorting) |
| `npm run format:check`  | Check formatting with Prettier (used in CI)         |
| `npm run test`          | Run Vitest in watch mode                            |
| `npm run test:run`      | Run Vitest once (used in CI)                        |
| `npm run test:e2e`      | Run Playwright e2e tests                            |
| `npm run test:e2e:ui`   | Run Playwright with UI mode                         |
| `npm run db:push`       | Sync database schema to Postgres                    |
| `npm run db:reset`      | Drop auth tables and re-sync schema                 |
| `npm run auth:generate` | Regenerate Drizzle schema from Better Auth config   |

## Git hooks

Git hooks are installed automatically when you run `npm install` (via the `prepare` script).

On every commit, a pre-commit hook runs [lint-staged](https://github.com/lint-staged/lint-staged) with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on staged files:

- Applies ESLint fixes (including import sorting)
- Formats code with Prettier and sorts Tailwind CSS classes via `prettier-plugin-tailwindcss`

Fixed files are re-staged before the commit completes. If ESLint reports errors it cannot fix, the commit is blocked.

To skip hooks for a single commit:

```bash
HUSKY=0 git commit -m "your message"
```

CI runs `eslint` and `prettier --check` as read-only safety nets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Production checklist

Before deploying, configure auth and database env vars in your hosting provider (never commit `.env`):

1. **Generate a secret** — `openssl rand -base64 32` and set `BETTER_AUTH_SECRET` (minimum 32 characters; the app throws on startup in production if missing or too short).
2. **Set the public URL** — `BETTER_AUTH_URL` must be your HTTPS origin (e.g. `https://your-app.example.com`).
3. **Trusted origins** — Set `BETTER_AUTH_TRUSTED_ORIGINS` to a comma-separated list of allowed frontend origins if they differ from `BETTER_AUTH_URL` (preview domains, mobile deep links, etc.). Defaults to `BETTER_AUTH_URL` when unset.
4. **Database** — Set `DATABASE_URL` and enable SSL for hosted Postgres (`DATABASE_SSL=true`; see [Database SSL](#database-ssl)).
5. **Schema** — Run `npm run db:push` after deploy or in your release pipeline so tables (including `rate_limit` for persistent rate limiting) exist.

6. **Email** — Replace `sendDevEmail` in `app/lib/auth.ts` with a production email provider (e.g. Resend) before deploying.

Rate limiting uses the database in all environments so limits survive serverless cold starts.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
