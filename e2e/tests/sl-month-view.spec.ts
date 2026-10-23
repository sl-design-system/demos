import { test, expect } from '@playwright/test';

test.describe('sl-month-view', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-month-view');
  });

  test('should render the month view without any selection', async ({ page }) => {
    const monthView = page.locator('sl-month-view');

    await expect(monthView.getByRole('grid')).toBeVisible();
    await expect(
      monthView.locator('button[part~="day"][part~="selected"]'),
    ).toHaveCount(0);
  });

  test('should select day', async ({ page }) => {
    const item = page.getByRole('button', { name: '1, Thursday October 2026' });
    await expect(item).not.toHaveAttribute('part', /\bselected\b/);
    await item.click();

    await expect(item).toHaveAttribute('part', /\bselected\b/);
  });

  test('should not deselect after second click', async ({ page }) => {
    const item = page.getByRole('button', { name: '1, Thursday October 2026' });
    await item.click();

    await expect(item).toHaveAttribute('part', 'day selected');
    await item.click();

    await expect(item).toHaveAttribute('part', 'day selected');
  });

  test('should change selection when a different day is clicked', async ({ page }) => {
    const day1 = page.getByRole('button', { name: '1, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '2, Friday October 2026' });
    await day1.click();

    await expect(day1).toHaveAttribute('part', 'day selected');
    await expect(day2).toHaveAttribute('part', 'day');
    
    await day2.click();

    await expect(day1).toHaveAttribute('part', 'day');
    await expect(day2).toHaveAttribute('part', 'day selected');
  });

  test('should not change month when a day is selected', async ({ page }) => {
    const dayPrevious = page.getByRole('button', { name: '30, Wednesday September 2026' });
    const dayNext = page.getByRole('button', { name: '1, Sunday November 2026' });
    const dayCurrent = page.getByRole('button', { name: '15, Thursday October 2026' });
    
    await dayPrevious.click();

    await expect(dayPrevious).toHaveAttribute('part', /\bselected\b/);

    await expect(dayCurrent).toBeVisible();
    await dayNext.click();

    await expect(dayNext).toHaveAttribute('part', /\bselected\b/);

    await expect(dayCurrent).toBeVisible();
  });

  test('should not allow selecting disabled dates', async ({ page }) => {
    const disabledDay = page.getByRole('button', { name: '6, Tuesday October 2026' });

    await expect(disabledDay).toHaveAttribute('part', /\bdisabled\b/);
    await disabledDay.click({ force: true });
    await expect(disabledDay).not.toHaveAttribute('part', /\bselected\b/);
  });
});
