import { beforeEach, describe, expect, test, vi } from 'vitest'

import { sendDevEmail } from '@/app/lib/email'

describe('sendDevEmail', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
  })

  test('logs email details in non-production', async () => {
    await sendDevEmail({
      to: 'user@example.com',
      subject: 'Verify your email',
      text: 'Verify: http://localhost:3000/api/auth/verify-email?token=abc',
    })

    expect(console.info).toHaveBeenCalledWith('[dev email]', {
      to: 'user@example.com',
      subject: 'Verify your email',
      text: 'Verify: http://localhost:3000/api/auth/verify-email?token=abc',
    })
  })

  test('throws in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    await expect(
      sendDevEmail({
        to: 'user@example.com',
        subject: 'Verify your email',
        text: 'Verify: https://example.com',
      })
    ).rejects.toThrow('Configure a production email provider before deploying')

    vi.unstubAllEnvs()
  })
})
