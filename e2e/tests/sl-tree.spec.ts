import { test, expect } from '@playwright/test';

test.describe('sl-tree', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tree');
  });

  test('should render the tree component', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', {
      hasText: 'Analytics',
    });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const profileLeaf = tree.locator('sl-tree-node', { hasText: 'Profile' });
    const membersLeaf = tree.locator('sl-tree-node', { hasText: 'Members' });
    const usersLeaf = tree.locator('sl-tree-node', { hasText: 'Users' });
    const rolesLeaf = tree.locator('sl-tree-node', { hasText: 'Roles' });

    await expect(tree).toBeVisible();
    await expect(productsNode).toBeVisible();
    await expect(analyticsLeaf).not.toBeVisible();
    await expect(reportsLeaf).not.toBeVisible();
    await expect(settingsNode).toBeVisible();
    await expect(profileLeaf).not.toBeVisible();
    await expect(membersLeaf).not.toBeVisible();
    await expect(adminNode).toBeVisible();
    await expect(usersLeaf).not.toBeVisible();
    await expect(rolesLeaf).not.toBeVisible();
  });

  test('should have "expandable" and "selectable" attributes', async ({
    page,
  }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', {
      hasText: 'Analytics',
    });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const profileLeaf = tree.locator('sl-tree-node', { hasText: 'Profile' });
    const membersLeaf = tree.locator('sl-tree-node', { hasText: 'Members' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });
    const usersLeaf = tree.locator('sl-tree-node', { hasText: 'Users' });
    const rolesLeaf = tree.locator('sl-tree-node', { hasText: 'Roles' });

    await expect(productsNode).toHaveAttribute('expandable');
    await expect(productsNode).toHaveAttribute('selectable');
    await expect(settingsNode).toHaveAttribute('selectable');
    await expect(settingsNode).toHaveAttribute('expandable');
    await expect(adminNode).not.toHaveAttribute('selectable');
    await expect(adminNode).toHaveAttribute('expandable');

    await productsNode.locator('.expander-inner').click();

    await expect(analyticsLeaf).toHaveAttribute('selectable');
    await expect(analyticsLeaf).not.toHaveAttribute('expandable');
    await expect(reportsLeaf).toHaveAttribute('selectable');
    await expect(reportsLeaf).not.toHaveAttribute('expandable');

    await settingsNode.locator('.expander-inner').click();

    await expect(profileLeaf).toHaveAttribute('selectable');
    await expect(profileLeaf).not.toHaveAttribute('expandable');
    await expect(membersLeaf).not.toHaveAttribute('selectable');
    await expect(membersLeaf).not.toHaveAttribute('expandable');

    await adminNode.locator('.expander-inner').click();

    await expect(usersLeaf).toHaveAttribute('selectable');
    await expect(usersLeaf).not.toHaveAttribute('expandable');
    await expect(rolesLeaf).toHaveAttribute('selectable');
    await expect(rolesLeaf).not.toHaveAttribute('expandable');
  });

  test('should have expandable nodes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', {
      hasText: 'Analytics',
    });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });

    await expect(productsNode).toBeVisible();
    await expect(productsNode).not.toHaveAttribute('expanded');

    await productsNode.locator('.expander-inner').click();
    await expect(productsNode).toHaveAttribute('expanded');
    await expect(analyticsLeaf).toBeVisible();
    await expect(reportsLeaf).toBeVisible();

    await productsNode.locator('.expander-inner').click();
    await expect(productsNode).not.toHaveAttribute('expanded');
    await expect(analyticsLeaf).not.toBeVisible();
    await expect(reportsLeaf).not.toBeVisible();
  });

  test('should have independently expandable nodes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });

    await expect(productsNode).toBeVisible();
    await expect(productsNode).not.toHaveAttribute('expanded');

    await productsNode.locator('.expander-inner').click();
    await expect(productsNode).toHaveAttribute('expanded');
    await expect(settingsNode).not.toHaveAttribute('expanded');
    await expect(adminNode).not.toHaveAttribute('expanded');

    await settingsNode.locator('.expander-inner').click();
    await expect(settingsNode).toHaveAttribute('expanded');
    await expect(adminNode).not.toHaveAttribute('expanded');

    await productsNode.locator('.expander-inner').click();
    await expect(productsNode).not.toHaveAttribute('expanded');
    await expect(settingsNode).toHaveAttribute('expanded');

    await settingsNode.locator('.expander-inner').click();
    await expect(settingsNode).not.toHaveAttribute('expanded');
  });

  test('should have selectable nodes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });

    await expect(productsNode).toBeVisible();
    await expect(settingsNode).toBeVisible();
    await expect(productsNode).not.toHaveAttribute('selected');
    await expect(settingsNode).not.toHaveAttribute('selected');

    await productsNode.click();
    await expect(productsNode).toHaveAttribute('selected');
    await expect(settingsNode).not.toHaveAttribute('selected');

    await settingsNode.click();
    await expect(productsNode).not.toHaveAttribute('selected');
    await expect(settingsNode).toHaveAttribute('selected');
  });

  test('should have selectable leaves', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const productsNode = tree.locator('sl-tree-node', { hasText: 'Products' });
    const analyticsLeaf = tree.locator('sl-tree-node', {
      hasText: 'Analytics',
    });
    const reportsLeaf = tree.locator('sl-tree-node', { hasText: 'Reports' });

    await productsNode.locator('.expander-inner').click();
    await expect(analyticsLeaf).toBeVisible();
    await expect(reportsLeaf).toBeVisible();

    await analyticsLeaf.click();
    await expect(analyticsLeaf).toHaveAttribute('selected');
    await expect(productsNode).not.toHaveAttribute('selected');
    await expect(reportsLeaf).not.toHaveAttribute('selected');

    await reportsLeaf.click();
    await expect(reportsLeaf).toHaveAttribute('selected');
    await expect(analyticsLeaf).not.toHaveAttribute('selected');
    await expect(productsNode).not.toHaveAttribute('selected');
  });

  test('should have non-selectable nodes', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const adminNode = tree.locator('sl-tree-node', { hasText: 'Admin' });
    const usersLeaf = tree.locator('sl-tree-node', { hasText: 'Users' });
    const rolesLeaf = tree.locator('sl-tree-node', { hasText: 'Roles' });

    await expect(adminNode).toBeVisible();
    await adminNode.click();
    await expect(adminNode).not.toHaveAttribute('selected');
    await expect(adminNode).toHaveAttribute('expanded');
    await expect(usersLeaf).toBeVisible();
    await expect(rolesLeaf).toBeVisible();
  });

  test('should have non-selectable leaves', async ({ page }) => {
    const tree = page.locator('sl-tree');
    const settingsNode = tree.locator('sl-tree-node', { hasText: 'Settings' });
    const membersLeaf = tree.locator('sl-tree-node', { hasText: 'Members' });

    await settingsNode.locator('.expander-inner').click();
    await expect(settingsNode).toHaveAttribute('expanded');

    await membersLeaf.click();
    await expect(membersLeaf).not.toHaveAttribute('selected');
  });
});
