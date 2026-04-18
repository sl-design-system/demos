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
    const angularNav = (await page.title()) === "Angular Demo" ? true : false;
    const activeElements = angularNav ? [
      'Skip to main content',
      'sl-accordion',
      'sl-breadcrumbs',
      'sl-button',
      'sl-button-bar',
      'sl-callout',
      'sl-checkbox',
      'sl-combobox',
      'sl-dialog',
      'sl-dialog-service',
      'sl-form-field',
      'sl-form (reactive)',
      'sl-form (template)',
      'sl-inline-message',
      'Test 1',
    ] : ['Skip to main content',
      'sl-accordion',
      'sl-breadcrumbs',
      'sl-button',
      'sl-button-bar',
      'sl-callout',
      'sl-checkbox',
      'sl-combobox',
      'sl-dialog',
      'sl-form-field',
      'sl-form',
      'sl-inline-message',
      'Test 1',] as const;

    for (const activeElement of activeElements) {
      await page.keyboard.press('Alt+Tab'); // Alt is added for Webkit as option Press Tab to highlight can't be turned on
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