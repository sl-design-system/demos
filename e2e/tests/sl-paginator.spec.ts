import { test, expect } from '@playwright/test';

test.describe('sl-paginator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-paginator');
  });

  test('should show first page by default with 5 items, left arrow disabled and right arrow enabled', async ({
    page,
  }) => {
    const items = page.locator('main ul li');
    await expect(items).toHaveCount(5);
    await expect(items.nth(0)).toHaveText('Item 1');

    const paginator = page.locator('sl-paginator');
    await expect(
      paginator.getByRole('button', { name: /previous page/i }),
    ).toBeDisabled();
    await expect(
      paginator.getByRole('button', { name: /next page/i }),
    ).toBeEnabled();

    await expect(
      paginator.getByRole('button', { name: '1', exact: true }),
    ).toBeVisible();
    await expect(
      paginator.getByRole('button', { name: '2', exact: true }),
    ).toBeVisible();

    await expect(page.locator('sl-paginator-page-size')).toContainText('5');
  });

  test('should navigate to second page when clicking the next arrow', async ({
    page,
  }) => {
    const paginator = page.locator('sl-paginator');
    await paginator.getByRole('button', { name: /next page/i }).click();

    const items = page.locator('main ul li');
    await expect(items).toHaveCount(5);
    await expect(items.nth(0)).toHaveText('Item 6');

    await expect(
      paginator.getByRole('button', { name: /previous page/i }),
    ).toBeEnabled();
    await expect(
      paginator.getByRole('button', { name: /next page/i }),
    ).toBeDisabled();
  });

  test('should navigate to second page when clicking page 2 button', async ({
    page,
  }) => {
    const paginator = page.locator('sl-paginator');
    await paginator.getByRole('button', { name: '2', exact: true }).click();

    const items = page.locator('main ul li');
    await expect(items).toHaveCount(5);
    await expect(items.nth(0)).toHaveText('Item 6');

    await expect(
      paginator.getByRole('button', { name: /previous page/i }),
    ).toBeEnabled();
    await expect(
      paginator.getByRole('button', { name: /next page/i }),
    ).toBeDisabled();
  });

  test('should navigate back to first page when clicking the prev arrow from second page', async ({
    page,
  }) => {
    const paginator = page.locator('sl-paginator');
    await paginator.getByRole('button', { name: /next page/i }).click();
    await paginator.getByRole('button', { name: /previous page/i }).click();

    const items = page.locator('main ul li');
    await expect(items).toHaveCount(5);
    await expect(items.nth(0)).toHaveText('Item 1');

    await expect(
      paginator.getByRole('button', { name: /previous page/i }),
    ).toBeDisabled();
    await expect(
      paginator.getByRole('button', { name: /next page/i }),
    ).toBeEnabled();
  });

  test('should navigate back to first page when clicking page 1 button from second page', async ({
    page,
  }) => {
    const paginator = page.locator('sl-paginator');
    await paginator.getByRole('button', { name: /next page/i }).click();
    await paginator.getByRole('button', { name: '1', exact: true }).click();

    const items = page.locator('main ul li');
    await expect(items).toHaveCount(5);
    await expect(items.nth(0)).toHaveText('Item 1');

    await expect(
      paginator.getByRole('button', { name: /previous page/i }),
    ).toBeDisabled();
    await expect(
      paginator.getByRole('button', { name: /next page/i }),
    ).toBeEnabled();
  });
});
