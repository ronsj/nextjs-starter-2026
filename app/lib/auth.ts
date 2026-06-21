import { getAuthenticatorName, passkey } from '@better-auth/passkey'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth/minimal'
import { nextCookies } from 'better-auth/next-js'
import { eq } from 'drizzle-orm'

import { db } from '@/app/db'
import * as schema from '@/app/db/schema'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SignUpContext = {
  email: string
  name: string
}

function parseSignUpContext(context?: string | null): SignUpContext {
  if (!context) {
    throw new Error('Registration context is required')
  }

  const parsed = JSON.parse(context) as SignUpContext
  if (!parsed.email || !parsed.name || !emailRegex.test(parsed.email)) {
    throw new Error('Invalid registration context')
  }

  return parsed
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [
    nextCookies(),
    passkey({
      registration: {
        requireSession: false,
        resolveUser: async ({ context }) => {
          const { email, name } = parseSignUpContext(context)

          const [existing] = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.email, email))
            .limit(1)

          if (existing) {
            return {
              id: existing.id,
              name: existing.email,
              displayName: existing.name,
            }
          }

          const id = crypto.randomUUID()
          await db.insert(schema.user).values({
            id,
            name,
            email,
            emailVerified: false,
          })

          return {
            id,
            name: email,
            displayName: name,
          }
        },
        afterVerification: async ({ verification }) => ({
          name: getAuthenticatorName(verification.registrationInfo?.aaguid),
        }),
      },
    }),
  ],
})
