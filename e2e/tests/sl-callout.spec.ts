import { test, expect, Page } from '@playwright/test';

test.describe('sl-callout', () => {
  let newPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-callout');
  });

  test.afterEach(async () => {
    await newPage?.close();
  });

  test('should click the sl-callout link and open a new page', async ({
    page,
  }) => {
    [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-callout a').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should click the sl-callout button and open a new page', async ({
    page,
  }) => {
    [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-callout sl-button').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
