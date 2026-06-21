import { getAuthenticatorName, passkey } from '@better-auth/passkey'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth/minimal'
import { nextCookies } from 'better-auth/next-js'

import { db } from '@/app/db'
import * as schema from '@/app/db/schema'
import { resolvePasskeySignUpUser } from '@/app/lib/passkey-sign-up-user'

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
        resolveUser: async ({ context }) => resolvePasskeySignUpUser(context),
        afterVerification: async ({ verification }) => ({
          name: getAuthenticatorName(verification.registrationInfo?.aaguid),
        }),
      },
    }),
  ],
})
