import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('sl-accordion accessibility', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-accordion');
  });
  
  test('should have no accessibility violations', async ({ page }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']); 
    const results = await axe.analyze(); 
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
      'Test 1',
    ] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab'); 
      const focusedOn = await page.evaluate(() => {
        function deepActive(root = document) {
          let el = root.activeElement;
          while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
          return el;
        }
        const el = deepActive();
        if (!el) return null;
        const tag = el.tagName ? el.tagName.toLowerCase() : null;
        // Custom elements (e.g. sl-accordion) contain all child text — return tag name instead
        if (tag && tag.includes('-')) return tag;
        // For regular elements return only the first non-empty line of own text content
        const text = (el.textContent || '').trim().split('\n').map(l => l.trim()).find(l => l.length > 0) || null;
        return text || tag;
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