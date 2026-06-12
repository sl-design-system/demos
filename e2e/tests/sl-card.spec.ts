import { expect, test } from '@playwright/test';

test.describe('sl-card', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-card');
  });

  test('should render card content correctly', async ({ page }) => {
    await expect(page.locator('sl-card')).toMatchAriaSnapshot(`
    - figure:
      - img "Illustration for digital learning"
    - heading "Captivating Nyhavn Moments" [level=2]
    - text: new
    - paragraph: Immerse yourself in the vibrant hues of Nyhavn, Copenhagen's iconic waterfront. This picturesque scene, adorned with colorful facades and historic ships, invites you to explore the charm of Danish culture against the backdrop of serene canals.
    - button "Download"
    `);
  });

  test('should open new page when button is clicked', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button', { hasText: 'Download' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
