import { APIError } from 'better-auth'
import { eq } from 'drizzle-orm'

import { db } from '@/app/db'
import * as schema from '@/app/db/schema'
import { EXISTING_EMAIL_MESSAGE } from '@/app/lib/passkey-sign-up-messages'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SignUpContext = {
  email: string
  name: string
}

export { EXISTING_EMAIL_MESSAGE } from '@/app/lib/passkey-sign-up-messages'

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

export async function resolvePasskeySignUpUser(context?: string | null) {
  const { email, name } = parseSignUpContext(context)

  const [existing] = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1)

  if (existing) {
    throw new APIError('BAD_REQUEST', {
      message: EXISTING_EMAIL_MESSAGE,
    })
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
}
