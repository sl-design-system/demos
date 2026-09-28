import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-tree accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tree');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const axe = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22a',
      'wcag22aa',
    ]);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tree'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22a',
      'wcag22aa',
    ]);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tree'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('nodes should have correct aria-expanded attributes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });

    await expect(productsNode).toHaveAttribute('aria-expanded', 'false');
    await expect(adminNode).toHaveAttribute('aria-expanded', 'false');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'false');

    await productsNode.locator('.expander-inner').click();
    await expect(productsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(adminNode).toHaveAttribute('aria-expanded', 'false');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'false');

    await settingsNode.locator('.expander-inner').click();
    await expect(productsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(adminNode).toHaveAttribute('aria-expanded', 'false');

    await adminNode.click();
    await expect(productsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(adminNode).toHaveAttribute('aria-expanded', 'true');
  });

  test('nodes should have correct aria-selected attributes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });

    await expect(productsNode).toHaveAttribute('aria-selected', 'false');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'false');

    await productsNode.click();
    await expect(productsNode).toHaveAttribute('aria-selected', 'true');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'false');

    await settingsNode.click();
    await expect(productsNode).toHaveAttribute('aria-selected', 'false');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'true');
  });

  test('leaves should have correct aria-expanded attributes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', { hasText: 'Analytics' });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const profileLeaf = tree.locator('sl-tree-node', { hasText: 'Profile' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });
    const usersLeaf = tree.locator('sl-tree-node', { hasText: 'Users' });
    const rolesLeaf = tree.locator('sl-tree-node', { hasText: 'Roles' });

    await productsNode.locator('.expander-inner').click();
    await expect(analyticsLeaf).toHaveAttribute('aria-selected', 'false');
    await expect(reportsLeaf).toHaveAttribute('aria-selected', 'false');

    await analyticsLeaf.click();
    await expect(analyticsLeaf).toHaveAttribute('aria-selected', 'true');

    await settingsNode.locator('.expander-inner').click();
    await expect(profileLeaf).toHaveAttribute('aria-selected', 'false');

    await profileLeaf.click();
    await expect(profileLeaf).toHaveAttribute('aria-selected', 'true');
    await expect(analyticsLeaf).toHaveAttribute('aria-selected', 'false');

    await adminNode.click();
    await expect(usersLeaf).toHaveAttribute('aria-selected', 'false');
    await expect(rolesLeaf).toHaveAttribute('aria-selected', 'false');

    await rolesLeaf.click();
    await expect(rolesLeaf).toHaveAttribute('aria-selected', 'true');
    await expect(profileLeaf).toHaveAttribute('aria-selected', 'false');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Products', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should move roving tabindex with arrow keys', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });

    await expect(productsNode).toHaveAttribute('tabindex', '0');
    await expect(settingsNode).toHaveAttribute('tabindex', '-1');
    await expect(adminNode).toHaveAttribute('tabindex', '-1');

    await productsNode.focus();
    await page.keyboard.press('ArrowDown');

    await expect(productsNode).toHaveAttribute('tabindex', '-1');
    await expect(settingsNode).toHaveAttribute('tabindex', '0');
    await expect(adminNode).toHaveAttribute('tabindex', '-1');

    await page.keyboard.press('ArrowDown');

    await expect(productsNode).toHaveAttribute('tabindex', '-1');
    await expect(settingsNode).toHaveAttribute('tabindex', '-1');
    await expect(adminNode).toHaveAttribute('tabindex', '0');
  });

  test(`should be expandable with arrow keys`, async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', { hasText: 'Analytics' });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const profileLeaf = tree.locator('sl-tree-node', { hasText: 'Profile' });
    const membersLeaf = tree.locator('sl-tree-node', { hasText: 'Members' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });
    const usersLeaf = tree.locator('sl-tree-node', { hasText: 'Users' });
    const rolesLeaf = tree.locator('sl-tree-node', { hasText: 'Roles' });

    await productsNode.focus();
    await page.keyboard.press('ArrowRight');
    await expect(productsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(analyticsLeaf).toBeVisible();
    await expect(reportsLeaf).toBeVisible();

    await page.keyboard.press('ArrowLeft');
    await expect(productsNode).toHaveAttribute('aria-expanded', 'false');

    await settingsNode.focus();
    await page.keyboard.press('ArrowRight');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'true');
    await expect(profileLeaf).toBeVisible();
    await expect(membersLeaf).toBeVisible();

    await page.keyboard.press('ArrowLeft');
    await expect(settingsNode).toHaveAttribute('aria-expanded', 'false');

    await adminNode.focus();
    await page.keyboard.press('ArrowRight');
    await expect(adminNode).toHaveAttribute('aria-expanded', 'true');
    await expect(usersLeaf).toBeVisible();
    await expect(rolesLeaf).toBeVisible();
  });

  test(`should be selectable via keyboard`, async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });

    await expect(productsNode).toHaveAttribute('aria-selected', 'false');

    await productsNode.focus();
    await page.keyboard.press('Enter');
    await expect(productsNode).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Enter');
    await expect(productsNode).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('Space');
    await expect(productsNode).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Space');
    await expect(productsNode).toHaveAttribute('aria-selected', 'false');

    await settingsNode.focus();
    await page.keyboard.press('Enter');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Enter');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('Space');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Space');
    await expect(settingsNode).toHaveAttribute('aria-selected', 'false');
  });
});
