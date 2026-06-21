import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import Page from '../app/page'

test('home page renders guest heading', async () => {
  render(await Page())

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'To get started, edit the page.tsx file.',
    })
  ).toBeDefined()
})

test('home page renders sign-in and sign-up links', async () => {
  render(await Page())

  expect(
    screen.getByRole('link', { name: 'Sign in' }).getAttribute('href')
  ).toBe('/sign-in')
  expect(
    screen.getByRole('link', { name: 'Sign up' }).getAttribute('href')
  ).toBe('/sign-up')
})
