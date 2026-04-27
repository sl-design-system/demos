import { test, expect } from '@playwright/test';

test.describe('sl-popover', () => {

  const popoverText = "I'm a popover example with ";
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-popover');
  });

  test('should not display popover initially', async ({
    page,
  }) => {
    await expect(page.getByText(popoverText)).toBeHidden();
  });

  test('should open a blank page after clicking Action button inside popover', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeVisible();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('button', { name: 'Action' }).click(),
    ]);

    await expect(newPage).toHaveURL('about:blank');
  });

  test('should still display popover after clicking action', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeVisible();
    await page.getByText('Action').click();
    await expect(page.getByText(popoverText)).toBeVisible();
  });

  test('should close the popover when clicking trigger button again', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeHidden();
  });

  test('should close the popover when clicking outside', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(
      page.getByText(popoverText),
    ).not.toBeVisible();
  });

  test('should close the popover with Esc key', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle Popover' }).click();
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(
      page.getByText(popoverText),
    ).not.toBeVisible();
  });
});
