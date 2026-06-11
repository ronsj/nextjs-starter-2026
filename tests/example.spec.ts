import { test, expect } from '@playwright/test'

test('home page has a heading', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'To get started, edit the page.tsx file.',
    })
  ).toBeVisible()
})

test('documentation link opens Next.js docs', async ({ page }) => {
  await page.goto('/')

  const documentationLink = page.getByRole('link', { name: 'Documentation' })
  await expect(documentationLink).toHaveAttribute(
    'href',
    'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
  )
})
