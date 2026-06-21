import { expect, test } from '@playwright/test'

test('home page has a heading', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'To get started, edit the page.tsx file.',
    })
  ).toBeVisible()
})

test('guest sees sign-in and sign-up links', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
    'href',
    '/sign-in'
  )
  await expect(page.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
    'href',
    '/sign-up'
  )
})
