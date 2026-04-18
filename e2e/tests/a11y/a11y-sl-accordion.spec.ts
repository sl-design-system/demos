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

  test('should have correct tab order', async ({ page }) => {

    const activeElements = [
      'Skip to main content',
      'sl-accordion',
      'sl-breadcrumbs',
      'sl-button',
      'sl-button-bar',
      'sl-callout',
      'sl-checkbox',
      'sl-combobox',
      'Extended content for Test 1',
    ] as const;
    
    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await page.evaluate(() => {
        const selector = document.activeElement;
        return selector ? selector.innerHTML : null;
      });
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should be keyboard operable`, async ({ page }) => {

    const item = page.locator('summary').filter({ hasText: 'Test 1' });
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await item.focus();
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
})
});