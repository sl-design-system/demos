import { test, expect } from '@playwright/test';

test.describe('sl-calendar', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-calendar');
  });

  test('should render the month view without any selection', async ({
    page,
  }) => {
    const calendar = page.locator('sl-calendar');

    await expect(calendar.getByRole('grid')).toBeVisible();
    await expect(
      calendar.locator('button[part~="day"][part~="selected"]'),
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

  test('should change selection when a different day is clicked', async ({
    page,
  }) => {
    const day1 = page.getByRole('button', { name: '1, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '2, Friday October 2026' });
    await day1.click();

    await expect(day1).toHaveAttribute('part', 'day selected');
    await expect(day2).toHaveAttribute('part', 'day');

    await day2.click();

    await expect(day1).toHaveAttribute('part', 'day');
    await expect(day2).toHaveAttribute('part', 'day selected');
  });

  test('should change month when day outside current month is clicked', async ({ page }) => {
    const dayPrevious = page.getByRole('button', {
      name: '30, Wednesday September 2026',
    });
    const dayNext = page.getByRole('button', {
      name: '1, Thursday October 2026',
    });
    const octoberMonth = page.getByRole('button', { name: 'October, change month', exact: true });
    const septemberMonth = page.getByRole('button', { name: 'September, change month', exact: true });

    await expect(octoberMonth).toBeVisible();
    await expect(septemberMonth).not.toBeVisible(); 
    await dayPrevious.click();

    await expect(dayPrevious).toHaveAttribute('part', /\bselected\b/);
    await expect(septemberMonth).toBeVisible(); 
    await expect(octoberMonth).not.toBeVisible();

    await dayNext.click();

    await expect(dayNext).toHaveAttribute('part', /\bselected\b/);
    await expect(octoberMonth).toBeVisible(); 
    await expect(septemberMonth).not.toBeVisible(); 
  });

  test('should not allow selecting disabled dates', async ({ page }) => {
    const disabledDay = page.getByRole('button', {
      name: '6, Tuesday October 2026',
    });

    await expect(disabledDay).toHaveAttribute('part', /\bdisabled\b/);
    await disabledDay.click({ force: true });
    await expect(disabledDay).not.toHaveAttribute('part', /\bselected\b/);
  });

  test('should change month when clicking month buttons', async ({ page }) => {
    const currentMonth = page.getByRole('button', { name: 'October, change month', exact: true });
    const previousMonth = page.getByRole('button', { name: 'September, change month', exact: true });
    const selectDay = page.getByRole('grid', { name: 'Days of September 2026', exact: true });
    const selectMonth = page.getByRole('grid', { name: 'Months of 2026', exact: true });
    const septemberButton = page.getByRole('button', { name: 'September', exact: true });

    await currentMonth.click();

    await expect(selectMonth).toBeVisible();
    await expect(septemberButton).toBeVisible();
    await septemberButton.click();

    await expect(selectDay).toBeVisible();
    await expect(previousMonth).toBeVisible();
    await expect(currentMonth).not.toBeVisible();
  });

  test('should add class `selected` to month in month view', async ({ page }) => {
    const currentMonth = page.getByRole('button', { name: 'October, change month', exact: true });
    const octoberButton = page.getByRole('button', { name: 'October', exact: true });
    const selectedDay = page.getByRole('button', { name: '15, Thursday October 2026', exact: true });

    await selectedDay.click();

    await currentMonth.click();

    await expect(octoberButton).toBeVisible();
    await expect(octoberButton).toHaveAttribute('class', /\bselected\b/);
  });

  test('should change year when clicking year buttons', async ({ page }) => {
    const currentYear = page.getByRole('button', { name: '2026, change year', exact: true });
    const nextYear = page.getByRole('button', { name: '2027, change year', exact: true });
    const selectDay = page.getByRole('grid', { name: 'Days of October 2027', exact: true });
    const selectYear = page.getByRole('grid', { name: 'Years from 2021 to 2032', exact: true });
    const yearButton = page.getByRole('button', { name: '2027', exact: true });

    await currentYear.click();

    await expect(selectYear).toBeVisible();
    await expect(yearButton).toBeVisible();
    await yearButton.click();

    await expect(selectDay).toBeVisible();
    await expect(nextYear).toBeVisible();
    await expect(yearButton).not.toBeVisible();
  });

  test('should add class `selected` to year in year view', async ({ page }) => {
    const currentYear = page.getByRole('button', { name: '2026, change year', exact: true });
    const yearButton = page.getByRole('button', { name: '2026', exact: true });
    const selectedDay = page.getByRole('button', { name: '15, Thursday October 2026', exact: true });

    await selectedDay.click();

    await currentYear.click();

    await expect(yearButton).toBeVisible();
    await expect(yearButton).toHaveAttribute('class', /\bselected\b/);
  });

  test('should allow to use arrow buttons to navigate', async ({ page }) => {
    const previousArrow = page.getByRole('button', { name: 'Previous month, September 2026', exact: true });
    const nextArrow = page.getByRole('button', { name: 'Next month, November 2026', exact: true });
    const nextMonthButton = page.getByRole('button', { name: 'Next month, October 2026', exact: true });
    const currentMonth = page.getByRole('button', { name: 'September, change month', exact: true });

    await expect(previousArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();

    await previousArrow.click();
    await expect(currentMonth).toBeVisible();

    await nextMonthButton.click();
    await expect(currentMonth).not.toBeVisible();
  });

  test('should preserve selected date when changing month with arrow buttons', async ({ page }) => {
    const previousArrow = page.getByRole('button', { name: 'Previous month, September 2026', exact: true });
    const nextArrow = page.getByRole('button', { name: 'Next month, October 2026', exact: true });
    const selectedDay = page.getByRole('button', { name: '15, Thursday October 2026', exact: true });

    await selectedDay.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await previousArrow.click();
    await expect(selectedDay).not.toBeVisible();

    await nextArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });

  test('should preserve selected date when changing month with month view', async ({ page }) => {
    const changeMonthOctober = page.getByRole('button', { name: 'October, change month', exact: true });
    const changeMonthNovember = page.getByRole('button', { name: 'November, change month', exact: true });
    const nextMonth = page.getByRole('button', { name: 'November', exact: true });
    const previousMonth = page.getByRole('button', { name: 'October', exact: true });
    const selectedDay = page.getByRole('button', { name: '15, Thursday October 2026', exact: true });

    await selectedDay.click();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await changeMonthOctober.click();

    await nextMonth.click();
    await expect(selectedDay).not.toBeVisible();

    await changeMonthNovember.click();
    await previousMonth.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });

  test('should preserve selected date when changing year with year view', async ({ page }) => {
    const changeYear2026 = page.getByRole('button', { name: '2026, change year', exact: true });
    const changeYear2027 = page.getByRole('button', { name: '2027, change year', exact: true });
    const nextYear = page.getByRole('button', { name: '2027', exact: true });
    const previousArrow = page.getByRole('button', { name: '2026', exact: true }); 
    const selectedDay = page.getByRole('button', { name: '15, Thursday October 2026', exact: true });

    await selectedDay.click();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await changeYear2026.click();

    await nextYear.click();
    await expect(selectedDay).not.toBeVisible();

    await changeYear2027.click();
    await previousArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });
})
