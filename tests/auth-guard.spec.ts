import { expect, test } from '@playwright/test'

test('unauthenticated visit to /account redirects to sign-in', async ({
  page,
}) => {
  await page.goto('/account')

  await expect(page).toHaveURL('/sign-in')
})
