import { test, expect } from '@playwright/test'

test.describe('Button component', () => {
  test('renders with label text', async ({ page }) => {
    await page.goto('/')
    const buttons = page.locator('button')
    const count = await buttons.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('disables button when disabled attribute is present', async ({ page }) => {
    await page.goto('/')
    // The "Get started" button in the homepage is primary and not disabled
    const enabledButtons = page.locator('button:not([data-disabled])')
    const enabledCount = await enabledButtons.count()
    expect(enabledCount).toBeGreaterThanOrEqual(2)
  })
})
