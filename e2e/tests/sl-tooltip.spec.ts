import { test, expect } from '@playwright/test';

test.describe('sl-tooltip', () => {
  const tooltipText = "This is the tooltip message";
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tooltip');
  });

  test('should not display tooltip initially', async ({ page }) => {
    await expect(page.getByText(tooltipText)).toBeHidden();
  });

  test('should still display tooltip after clicking action', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Button' }).hover();
    await expect(page.getByText(tooltipText)).toBeVisible();
    await page.getByRole('button', { name: 'Button' }).click();
    await expect(page.getByText(tooltipText)).not.toBeVisible();
  });

  test('should close the tooltip when clicking outside', async ({ page }) => {
    await page.getByRole('button', { name: 'Button' }).hover();
    await expect(page.getByText(tooltipText)).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(page.getByText(tooltipText)).not.toBeVisible();
  });

  test('should close the tooltip with Esc key', async ({ page }) => {
    await page.getByRole('button', { name: 'Button' }).hover();
    await expect(page.getByText(tooltipText)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText(tooltipText)).not.toBeVisible();
  });
});
