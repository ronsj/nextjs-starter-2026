This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- [Node.js](https://nodejs.org/) 25.9.0 (see `.nvmrc`)
- [npm](https://www.npmjs.com/) (comes with Node)

```bash
nvm use   # if using nvm
npm ci
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tooling

| Tool | Purpose | Command |
|------|---------|---------|
| [Next.js](https://nextjs.org/) 16 | React framework (App Router) | `npm run dev` / `npm run build` |
| [React](https://react.dev/) 19 | UI library | — |
| [TypeScript](https://www.typescriptlang.org/) 5 | Static typing | `tsc` (via Next.js build) |
| [Tailwind CSS](https://tailwindcss.com/) 4 | Utility-first styling | — |
| [ESLint](https://eslint.org/) 9 | Linting (`eslint-config-next`) | `npm run lint` |
| [Prettier](https://prettier.io/) 3 | Code formatting | `npm run format` / `npm run format:check` |
| [Vitest](https://vitest.dev/) 4 | Unit/component tests | `npm run test` / `npm run test:run` |
| [Testing Library](https://testing-library.com/) | React testing utilities | — |
| [Playwright](https://playwright.dev/) | End-to-end browser tests | `npm run test:e2e` / `npm run test:e2e:ui` |
| [GitHub Actions](https://github.com/features/actions) | CI (lint, format, tests, build, e2e) | runs on push/PR to `main` |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting (used in CI) |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once (used in CI) |
| `npm run test:e2e` | Run Playwright e2e tests |
| `npm run test:e2e:ui` | Run Playwright with UI mode |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
