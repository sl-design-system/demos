import { test, expect } from '@playwright/test';

test.describe('sl-tab-group', () => {

  const PANELS = {
    general: 'This is the General tab content. It contains basic information about the component.',
    settings: 'This is the Settings tab content. Here you can configure various options.',
    disabled: 'Disabled tab content',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tab-group');
  });

  test('should display content of first tab after clicking first tab', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'General' }).click();
    await expect(page.getByRole('tab', { name: 'General' })).toHaveAttribute('selected');
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.general) })).toBeVisible();
    await expect(page.locator('sl-button', { hasText: 'Action' })).toBeVisible();
  });

  test('should allow to click button in first tab panel after clicking first tab', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'General' }).click();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('button', { name: 'Action' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should change content in tab panel after clicking active tabs', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'General' }).click();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.general) })).toBeVisible();

    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.settings) })).toBeVisible();
  });

  test('should display only the content of the selected tab', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'General' }).click();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.general) })).toBeVisible();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.settings) })).not.toBeVisible();

    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.general) })).not.toBeVisible();
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.settings) })).toBeVisible();
  });

  test('should add selected attribute only for the active tab after clicking tabs', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'General' }).click();
    await expect(page.getByRole('tab', { name: 'General' })).toHaveAttribute('selected');
    await expect(page.getByRole('tab', { name: 'Settings' })).not.toHaveAttribute('selected');

    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByRole('tab', { name: 'Settings' })).toHaveAttribute('selected');
    await expect(page.getByRole('tab', { name: 'General' })).not.toHaveAttribute('selected');
  });

  test('should not display content of disabled tab after clicking disabled tab', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'Disabled' }).click({ force: true });
    await expect(page.getByRole('tab', { name: 'Disabled' })).not.toHaveAttribute('selected');
    await expect(page.getByRole('tabpanel').filter({ has: page.getByText(PANELS.disabled) })).toBeHidden();
  });
});
