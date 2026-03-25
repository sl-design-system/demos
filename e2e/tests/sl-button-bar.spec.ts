import { test, expect, Page } from '@playwright/test';

test.describe('sl-button-bar', () => {
  let newPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async () => {
    await newPage?.close();
  });

  test('should click the enabled sl-button and open a new page', async ({
    page,
  }) => {
    [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button', { hasText: 'Test 2' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should not click the disabled sl-button', async ({ page }) => {
    const disabledButton = page.locator('sl-button', { hasText: 'Test 1' });
    await expect(disabledButton).toHaveAttribute('disabled', '');

    const pagesBefore = page.context().pages().length;
    await disabledButton.click({ force: true });
    const pagesAfter = page.context().pages().length;
    expect(pagesAfter).toEqual(pagesBefore);
  });
});
