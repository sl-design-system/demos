import { expect, test } from '@playwright/test';

test.describe('sl-panel', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.startsWith('angular-'), 'Angular panel example');
    await page.goto('/sl-panel');
  });

  test('renders its content and action', async ({ page }) => {
    const panel = page.locator('sl-panel');
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('Collapsible panel content');
    await expect(panel.locator('sl-button[slot="actions"]')).toHaveCount(3);
    await expect(panel.locator('sl-button[slot="actions"]').first()).toBeVisible();
  });

  test('collapses and expands its content', async ({ page }) => {
    const panel = page.locator('sl-panel');
    await panel.getByRole('button', { name: 'Collapse panel' }).click();
    await expect(panel).toHaveAttribute('collapsed', '');
    await panel.getByRole('button', { name: 'Expand panel' }).click();
    await expect(panel).not.toHaveAttribute('collapsed', '');
  });
});
