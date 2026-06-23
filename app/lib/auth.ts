import { APIError } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth/minimal'
import { nextCookies } from 'better-auth/next-js'

import { db } from '@/app/db'
import * as schema from '@/app/db/schema'
import { sendDevEmail } from '@/app/lib/email'

const authSecret = process.env.BETTER_AUTH_SECRET
const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  if (!authSecret || authSecret.length < 32) {
    throw new Error(
      'BETTER_AUTH_SECRET must be set and at least 32 characters in production. Generate one with: openssl rand -base64 32'
    )
  }
} else if (!authSecret) {
  console.warn(
    '[auth] BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32'
  )
}

const baseURL = process.env.BETTER_AUTH_URL

const trustedOrigins: string[] = process.env.BETTER_AUTH_TRUSTED_ORIGINS
  ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter((origin): origin is string => origin.length > 0)
  : baseURL
    ? [baseURL]
    : []

export const auth = betterAuth({
  secret: authSecret,
  baseURL,
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendDevEmail({
        to: user.email,
        subject: 'Verify your email',
        text: `Verify: ${url}`,
      })
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      void sendDevEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Reset: ${url}`,
      })
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session, ctx) => {
          if (!ctx) {
            return
          }

          const user = await ctx.context.internalAdapter.findUserById(
            session.userId
          )

          if (user && !user.emailVerified) {
            throw new APIError('FORBIDDEN', {
              message: 'Please verify your email before signing in.',
            })
          }
        },
      },
    },
  },
  rateLimit: {
    enabled: true,
    storage: 'database',
    customRules: {
      '/sign-in/email': { window: 10, max: 3 },
      '/sign-up/email': { window: 10, max: 3 },
      '/request-password-reset': { window: 60, max: 3 },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 60,
  },
  advanced: {
    useSecureCookies: isProduction,
  },
  plugins: [nextCookies()],
})
