import { cleanup } from '@testing-library/react'
import * as React from 'react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}))

vi.mock('@/app/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue(null),
    },
  },
}))

vi.mock('next/image', () => ({
  default: ({
    priority,
    ...rest
  }: React.ComponentProps<'img'> & { priority?: boolean }) => {
    void priority
    return React.createElement('img', rest)
  },
}))
