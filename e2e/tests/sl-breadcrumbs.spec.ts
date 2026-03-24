import { test, expect, Page } from '@playwright/test';

test.describe('sl-breadcrumbs', () => {
  let newPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async () => {
    await newPage?.close();
  });

  test('should click the sl-breadcrumbs child item and open a new page', async ({ page }) => {
    [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-breadcrumbs>a', {hasText: 'Test 1'}).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should click the sl-breadcrumbs home button and navigate to base url', async ({ page }) => {
    const baseUrl = "/";
    const fakeUrl = "/?from=test";

    await page.goto(fakeUrl);
    await expect(page).toHaveURL(fakeUrl);

    await Promise.all([
      page.waitForURL(baseUrl),
      page.locator('.home').click(),
    ]);
    await expect(page).toHaveURL(baseUrl);
  });
});
