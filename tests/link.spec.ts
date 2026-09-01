import { test, expect } from '@playwright/test'

test.describe('Link component', () => {
  test('renders homepage links with the c-link class', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('a.c-link')
    await expect(links).toHaveCount(2)
  })

  test('enabled link navigates to its href', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a.c-link:not([aria-disabled="true"])')
    await expect(link).toHaveAttribute('href', '/docs')
    await link.click()
    await expect(page).toHaveURL(/\/docs$/)
  })

  test('disabled link does not navigate and clicks do not escape the component', async ({
    page,
  }) => {
    await page.goto('/')
    const disabled = page.locator('a.c-link[aria-disabled="true"]')

    // The component drops `href` when disabled, so there is no navigation to
    // prevent — assert the disabled attributes directly instead.
    await expect(disabled).toBeVisible()
    await expect(disabled).toHaveAttribute('aria-disabled', 'true')
    await expect(disabled).not.toHaveAttribute('href')

    // Observe clicks on the link's parent: a disabled link must not let its
    // interaction escape the component (no bubbling to parent handlers).
    await page.evaluate(() => {
      ;(window as unknown as { __parentLinkClicks: number }).__parentLinkClicks = 0
      document.querySelector('.links')?.addEventListener('click', () => {
        ;(window as unknown as { __parentLinkClicks: number }).__parentLinkClicks += 1
      })
    })
    await disabled.click()

    const parentClicks = await page.evaluate(
      () => (window as unknown as { __parentLinkClicks: number }).__parentLinkClicks,
    )
    expect(parentClicks).toBe(0)
    await expect(page).toHaveURL(/\/$/)
  })
})
