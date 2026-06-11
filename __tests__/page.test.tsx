import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('home page renders heading', () => {
  render(<Page />)

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'To get started, edit the page.tsx file.',
    })
  ).toBeDefined()
})

test('home page renders documentation link', () => {
  render(<Page />)

  expect(screen.getByRole('link', { name: 'Documentation' })).toBeDefined()
})
