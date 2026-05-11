import { test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-checkbox accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-checkbox');
  });

  test('should have no accessibility violations', async ({ page }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page.getByRole('checkbox', { name: 'Test 1' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page.getByRole('checkbox', { name: 'Test 1' });

    await expect(item).not.toBeChecked();
    await item.focus();
    await page.keyboard.press('Enter');
    await expect(item).toBeChecked();
    await page.keyboard.press('Space');
    await expect(item).not.toBeChecked();
  });
});
