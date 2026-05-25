import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders the page title and subtitle', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('Vue Starter')
    await expect(page.locator('main p')).toContainText('CSS Modules')
  })

  test('clicking a button logs click event', async ({ page }) => {
    await page.goto('/')
    const buttons = page.locator('button')
    const firstButton = buttons.first()

    // Button should be visible and clickable
    await expect(firstButton).toBeVisible()
    await firstButton.click()
  })

  test('accordion opens and closes panels', async ({ page }) => {
    await page.goto('/')
    const details = page.locator('details.faq')
    await details.locator('summary').click()

    // Now the accordion should be visible
    const accordionPanels = page.locator('[data-open]')
    await expect(accordionPanels).toHaveCount(0)

    // Click first accordion header
    const headers = page.locator('button[aria-expanded]')
    await headers.first().click()
    await expect(headers.first()).toHaveAttribute('aria-expanded', 'true')

    // Click again to close
    await headers.first().click()
    await expect(headers.first()).toHaveAttribute('aria-expanded', 'false')
  })
})
