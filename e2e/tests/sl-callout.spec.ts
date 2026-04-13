import { test, expect } from '@playwright/test';

test.describe('sl-callout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-callout');
  });

  test('should click the sl-callout link and open a new page', async ({
    page,
  }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-callout a').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should click the sl-callout button and open a new page', async ({
    page,
  }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-callout sl-button').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
