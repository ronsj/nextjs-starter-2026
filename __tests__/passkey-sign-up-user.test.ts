import { APIError } from 'better-auth'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const limitMock = vi.fn()
const insertValuesMock = vi.fn()

vi.mock('@/app/db', () => ({
  db: {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: limitMock,
        }),
      }),
    }),
    insert: () => ({
      values: insertValuesMock,
    }),
  },
}))

describe('resolvePasskeySignUpUser', () => {
  beforeEach(() => {
    limitMock.mockReset()
    insertValuesMock.mockReset()
    insertValuesMock.mockResolvedValue(undefined)
  })

  test('throws when email already belongs to an account', async () => {
    limitMock.mockResolvedValue([
      {
        id: 'existing-user-id',
        email: 'taken@example.com',
        name: 'Existing User',
      },
    ])

    const { resolvePasskeySignUpUser, EXISTING_EMAIL_MESSAGE } =
      await import('@/app/lib/passkey-sign-up-user')

    await expect(
      resolvePasskeySignUpUser(
        JSON.stringify({ email: 'taken@example.com', name: 'Attacker' })
      )
    ).rejects.toMatchObject({
      message: EXISTING_EMAIL_MESSAGE,
    })

    expect(insertValuesMock).not.toHaveBeenCalled()
  })

  test('creates a new user when email is available', async () => {
    limitMock.mockResolvedValue([])

    const { resolvePasskeySignUpUser } =
      await import('@/app/lib/passkey-sign-up-user')

    const result = await resolvePasskeySignUpUser(
      JSON.stringify({ email: 'new@example.com', name: 'New User' })
    )

    expect(result).toMatchObject({
      name: 'new@example.com',
      displayName: 'New User',
    })
    expect(result.id).toBeTruthy()
    expect(insertValuesMock).toHaveBeenCalledWith({
      id: result.id,
      name: 'New User',
      email: 'new@example.com',
      emailVerified: false,
    })
  })

  test('rejects invalid registration context', async () => {
    const { resolvePasskeySignUpUser } =
      await import('@/app/lib/passkey-sign-up-user')

    await expect(
      resolvePasskeySignUpUser(
        JSON.stringify({ email: 'not-an-email', name: '' })
      )
    ).rejects.toThrow('Invalid registration context')
  })

  test('throws APIError type for existing email', async () => {
    limitMock.mockResolvedValue([
      { id: 'existing-user-id', email: 'taken@example.com', name: 'Existing' },
    ])

    const { resolvePasskeySignUpUser } =
      await import('@/app/lib/passkey-sign-up-user')

    await expect(
      resolvePasskeySignUpUser(
        JSON.stringify({ email: 'taken@example.com', name: 'Attacker' })
      )
    ).rejects.toBeInstanceOf(APIError)
  })
})
