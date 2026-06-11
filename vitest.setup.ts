import { cleanup } from '@testing-library/react'
import * as React from 'react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

vi.mock('next/image', () => ({
  default: (props: React.ComponentProps<'img'>) => {
    const { priority, ...rest } = props
    return React.createElement('img', rest)
  },
}))
