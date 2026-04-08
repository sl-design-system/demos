import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('sl-accordion accessibility', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-accordion');
  });
  
  test('should have no accessibility violations', async ({ page }) => {
    const axe = new AxeBuilder({ page });
    const results = await axe.include('main').analyze(); // Test only the main content area, exclude navigation
    expect(results.violations).toEqual([]);
  });
  
  test('should have correct aria-expanded attributes', async ({page}) => {
    const item = page.locator('summary').filter({ hasText: 'Test 1' })
    expect(item).toHaveAttribute('aria-expanded', 'false');

    await item.click();
    expect(item).toHaveAttribute('aria-expanded', 'true');
  });
});