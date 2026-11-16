import { test, expect } from '@playwright/test';

test.describe('sl-infotip', () => {
  const infotipText = 'This is the infotip message';
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-infotip');
  });

  test('should not display tooltip initially', async ({ page }) => {
    await expect(page.getByText(infotipText)).toBeHidden();
  });

  test('should display infotip after clicking the trigger button', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'More information' }).click();
    await expect(page.getByText(infotipText)).toBeVisible();
  });

  test('should hide infotip after clicking the trigger button again', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'More information' }).click();
    await expect(page.getByText(infotipText)).toBeVisible();
    await page.getByRole('button', { name: 'More information' }).click();
    await expect(page.getByText(infotipText)).not.toBeVisible();
  });

  test('should close the tooltip when clicking outside', async ({ page }) => {
    await page.getByRole('button', { name: 'More information' }).click();
    await expect(page.getByText(infotipText)).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(page.getByText(infotipText)).not.toBeVisible();
  });

  test('should close the tooltip with Esc key', async ({ page }) => {
    await page.getByRole('button', { name: 'More information' }).click();
    await expect(page.getByText(infotipText)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText(infotipText)).not.toBeVisible();
  });
});
