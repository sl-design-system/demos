import { expect, test } from '@playwright/test';

test.describe('sl-avatar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-avatar');
  });

  test('should render avatar content correctly', async ({ page }) => {
    await expect(page.locator('sl-avatar')).toMatchAriaSnapshot(`
      - link /Jan Janssen \\d+ May/:
        - /url: about:blank
      `);
  });

  test('should navigate in same tab when avatar is clicked', async ({
    page,
  }) => {
    await Promise.all([
      page.waitForURL('about:blank'),
      page.getByRole('link', { name: /Jan Janssen/ }).click(),
    ]);
    await expect(page).toHaveURL('about:blank');
  });
});
