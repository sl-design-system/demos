import { test, expect } from '@playwright/test';

test.describe('sl-form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-form');
  });

  test('should not click the confirm button when nothing is filled in', async ({ page }) => {
    const button = page.locator('sl-button', { hasText: 'Confirm' });
    await expect(button).toHaveAttribute('disabled', '');

    const pagesBefore = page.context().pages().length;
    await button.click({ force: true });
    const pagesAfter = page.context().pages().length;
    expect(pagesAfter).toEqual(pagesBefore);
  });

  test('should not click the confirm button when only name is filled', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Name' });
    const button = page.locator('sl-button', { hasText: 'Confirm' });

    await input.fill('Test');
    await expect(button).toHaveAttribute('disabled', '');

    const pagesBefore = page.context().pages().length;
    await button.click({ force: true });
    const pagesAfter = page.context().pages().length;
    expect(pagesAfter).toEqual(pagesBefore);
  });

  test('should not click the confirm button when only checkbox is checked', async ({ page }) => {
    const checkbox = page.locator('sl-checkbox[name="agree"]');
    const button = page.locator('sl-button', { hasText: 'Confirm' });

    await checkbox.click();
    await expect(button).toHaveAttribute('disabled', '');

    const pagesBefore = page.context().pages().length;
    await button.click({ force: true });
    const pagesAfter = page.context().pages().length;
    expect(pagesAfter).toEqual(pagesBefore);
  });

  test('should click the confirm button when form is filled', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Name' });
    const checkbox = page.locator('sl-checkbox[name="agree"]');
    const button = page.locator('sl-button', { hasText: 'Confirm' });

    await input.fill('Test');
    await checkbox.click();

    await expect(button).not.toHaveAttribute('disabled', '');

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      button.click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
