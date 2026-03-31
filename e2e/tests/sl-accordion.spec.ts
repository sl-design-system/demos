import { test, expect } from '@playwright/test';

test.describe('sl-accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-accordion');
  });

  test('should expand sl-accordion item', async ({ page }) => {
    const item = page.locator('sl-accordion-item', { hasText: 'Test 1' });
    const collapsedHeight = await item.evaluate(
      (el) => el.getBoundingClientRect().height,
    );

    await item.click();
    await expect(item).toHaveAttribute('open', '');

    const currentHeight = await item.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    expect(currentHeight).toBeGreaterThan(collapsedHeight);
  });

  test('should not expand disabled sl-accordion item', async ({ page }) => {
    const item = page.locator('sl-accordion-item', { hasText: 'Test 2' });
    const collapsedHeight = await item.evaluate(
      (el) => el.getBoundingClientRect().height,
    );

    await expect(item).toHaveAttribute('disabled', '');
    await item.click({ force: true });
    await expect(item).not.toHaveAttribute('open', '');

    const currentHeight = await item.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    expect(currentHeight).toEqual(collapsedHeight);
  });
});
