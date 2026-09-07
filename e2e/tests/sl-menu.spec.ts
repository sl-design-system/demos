import { test, expect } from '@playwright/test';

test.describe('sl-menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-menu');
  });

  test('should open a blank page after clicking first button', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Test 1' })).toBeVisible();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('menuitem', { name: 'Test 1' }).click(),
    ]);

    await expect(newPage).toHaveURL('about:blank');
  });

  test('should open a blank page after clicking button inside submenu', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Test 2' })).toBeVisible();

    await page.getByRole('menuitem', { name: 'Test 2' }).hover();
    await expect(page.getByRole('menuitem', { name: 'Test 3' })).toBeVisible();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('menuitem', { name: 'Test 3' }).click(),
    ]);

    await expect(newPage).toHaveURL('about:blank');
  });

  test('should close the menu when clicking outside', async ({ page }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Test 1' })).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(
      page.getByRole('menuitem', { name: 'Test 1' }),
    ).not.toBeVisible();
  });

  test('should not activate disabled menu item', async ({ page }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    const disabledItem = page.getByRole('menuitem', { name: 'Test 4' });
    await expect(disabledItem).toBeVisible();

    const pagesBefore = page.context().pages().length;
    await disabledItem.click({ force: true });
    expect(page.context().pages().length).toEqual(pagesBefore);
    await expect(page).toHaveURL('/sl-menu');
  });
});
