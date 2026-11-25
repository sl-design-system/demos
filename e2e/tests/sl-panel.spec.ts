import { expect, test } from '@playwright/test';

test.describe('sl-panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-panel');
  });

  test('should render panel content correctly', async ({ page }) => {
    await expect(page.locator('sl-panel')).toMatchAriaSnapshot(`
      - button "Collapse panel" [expanded]
      - text: Panel Title suffix
      - toolbar:
        - button
        - button
        - button
      - region "Panel Title": Collapsible panel content
    `);
  });

  test('should collapse and expand its content', async ({ page }) => {
    const panel = page.locator('sl-panel');
    await panel.getByRole('button', { name: 'Collapse panel' }).click();
    await expect(panel).toHaveAttribute('collapsed', '');
    await panel.getByRole('button', { name: 'Expand panel' }).click();
    await expect(panel).not.toHaveAttribute('collapsed', '');
  });

  test('should open new page when button is clicked', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button').filter({ hasText: 'Warning' }).locator('#button').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should allow to use actions in menu when screen is narrow', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 640 });
    const panel = page.locator('sl-panel');
    await expect(panel.getByRole('button', { name: 'Show more' })).toBeVisible();
    await expect(panel.getByRole('menuitem', { name: 'Warning' })).not.toBeVisible();

    await panel.getByRole('button', { name: 'Show more' }).click();
    
    await expect(panel.getByRole('menuitem', { name: 'Warning' })).toBeVisible();
    
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      panel.getByRole('menuitem', { name: 'Warning' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
