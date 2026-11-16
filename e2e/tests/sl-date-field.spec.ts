import { test, expect, type Locator } from '@playwright/test';

type DateSegment = 'Day' | 'Month' | 'Year';

const segmentPlaceholders: Record<DateSegment, string> = {
  Day: 'DD',
  Month: 'MM',
  Year: 'YYYY',
};

async function enterSegment(
  dateField: Locator,
  segment: DateSegment,
  value: string,
) {
  const field = dateField.getByRole('spinbutton', {
    name: segment,
    exact: true,
  });

  await field.click();
  await field.press('Delete');
  await expect(field).toHaveText(segmentPlaceholders[segment]);

  await field.pressSequentially(value, { delay: 250 });

  const expectedText = value.padStart(segmentPlaceholders[segment].length, '0');
  await expect(field).toHaveText(expectedText);
}

async function enterDate(
  dateField: Locator,
  day: string,
  month: string,
  year: string,
) {
  await enterSegment(dateField, 'Day', day);
  await enterSegment(dateField, 'Month', month);
  await enterSegment(dateField, 'Year', year);
}

test.describe('sl-date-field', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-date-field');
  });

  test('should allow filling dates', async ({ page }) => {
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });

    await enterSegment(dateField, 'Day', '15');
    await expect(dayField).toHaveText('15');

    await enterSegment(dateField, 'Month', '01');
    await expect(monthField).toHaveText('01');

    await enterSegment(dateField, 'Year', '2026');
    await expect(yearField).toHaveText('2026');
  });

  test('should show a typed date as selected in the calendar', async ({
    page,
  }) => {
    const dateField = page.locator('#sl-form-field-control-0');

    await enterDate(dateField, '15', '1', '2026');
    await expect(dateField).toHaveJSProperty('formValue', '2026-01-15');

    await dateField.getByRole('button', { name: 'Select date' }).click();

    await expect(
      page.getByRole('grid', { name: 'Days of January 2026' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: '15, Thursday January 2026' }),
    ).toHaveAttribute('part', /\bselected\b/);
  });

  test('should reject an invalid date and accept it after correction', async ({
    page,
  }) => {
    const dateField = page.locator('#sl-form-field-control-0');

    await enterDate(dateField, '31', '2', '2026');

    await expect(dateField).toHaveJSProperty('formValue', null);
    await expect(dateField).toHaveJSProperty('valid', false);

    await enterDate(dateField, '28', '2', '2026');

    await expect(dateField).toHaveJSProperty('formValue', '2026-02-28');
    await expect(dateField).toHaveJSProperty('valid', true);
  });

  test('should accept leap day only in a leap year', async ({ page }) => {
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });

    await enterDate(dateField, '29', '2', '2024');

    await expect(dateField).toHaveJSProperty('formValue', '2024-02-29');
    await expect(dateField).toHaveJSProperty('valid', true);

    await enterSegment(dateField, 'Year', '2025');

    await expect(dayField).toHaveText('29');
    await expect(monthField).toHaveText('02');
    await expect(yearField).toHaveText('2025');
    await expect(dateField).toHaveJSProperty('formValue', null);
    await expect(dateField).toHaveJSProperty('valid', false);
  });

  test('should not allow filling disabled date field', async ({ page }) => {
    const dateField = page.locator('#sl-form-field-control-1');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });

    await expect(dateField).toHaveAttribute('disabled', '');

    await dayField.click({ force: true });
    await page.keyboard.type('15');
    await expect(dayField).toHaveText('DD');

    await monthField.click({ force: true });
    await page.keyboard.type('1');
    await expect(monthField).toHaveText('MM');

    await yearField.click({ force: true });
    await page.keyboard.type('2026');
    await expect(yearField).toHaveText('YYYY');
  });

  test('should not allow expanding calendar when disabled', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-1')
      .getByRole('button', { name: 'Select date' });

    await expect(selectDate).toHaveAttribute('disabled');

    await selectDate.click({ force: true });

    const calendar = page.locator('sl-calendar');

    await expect(calendar.getByRole('grid')).not.toBeVisible();
  });
});

test.describe('sl-date-field with opened dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-date-field');
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' })
      .click();
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
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });
    const item = page.getByRole('button', { name: '1, Thursday October 2026' });

    await expect(item).not.toHaveAttribute('part', /\bselected\b/);
    await item.click();

    await expect(dayField).toHaveText('01');
    await expect(monthField).toHaveText('10');
    await expect(yearField).toHaveText('2026');

    await expect(dateField).toHaveJSProperty('formValue', '2026-10-01');
    await expect(dateField).toHaveJSProperty('valid', true);

    await dateField.getByRole('button', { name: 'Select date' }).click();

    await expect(item).toHaveAttribute('part', /\bselected\b/);
  });

  test('should not deselect after second click', async ({ page }) => {
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });
    const item = page.getByRole('button', { name: '1, Thursday October 2026' });

    await item.click();

    await expect(dayField).toHaveText('01');
    await expect(monthField).toHaveText('10');
    await expect(yearField).toHaveText('2026');

    await dateField.getByRole('button', { name: 'Select date' }).click();

    await expect(item).toHaveAttribute('part', /\bselected\b/);

    await item.click();

    await expect(item).toHaveAttribute('part', /\bselected\b/);
  });

  test('should change selection when a different day is clicked', async ({
    page,
  }) => {
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });
    const selectDate = dateField.getByRole('button', { name: 'Select date' });
    const day1 = page.getByRole('button', { name: '1, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '2, Friday October 2026' });

    await day1.click();

    await expect(dateField).toHaveJSProperty('formValue', '2026-10-01');
    await expect(dateField).toHaveJSProperty('valid', true);

    await selectDate.click();

    await expect(day1).toHaveAttribute('part', /\bselected\b/);
    await expect(day2).not.toHaveAttribute('part', /\bselected\b/);

    await day2.click();
    await selectDate.click();

    await expect(day1).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day2).toHaveAttribute('part', /\bselected\b/);

    await expect(dayField).toHaveText('02');
    await expect(monthField).toHaveText('10');
    await expect(yearField).toHaveText('2026');

    await expect(dateField).toHaveJSProperty('formValue', '2026-10-02');
    await expect(dateField).toHaveJSProperty('valid', true);
  });

  test('should change month when day outside current month is clicked', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const dayPrevious = page.getByRole('button', {
      name: '30, Wednesday September 2026',
    });
    const dayNext = page.getByRole('button', {
      name: '1, Thursday October 2026',
    });
    const octoberMonth = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const septemberMonth = page.getByRole('button', {
      name: 'September, change month',
      exact: true,
    });

    await expect(octoberMonth).toBeVisible();
    await expect(septemberMonth).not.toBeVisible();
    await dayPrevious.click();

    await selectDate.click();
    await expect(dayPrevious).toHaveAttribute('part', /\bselected\b/);
    await expect(septemberMonth).toBeVisible();
    await expect(octoberMonth).not.toBeVisible();

    await dayNext.click();

    await selectDate.click();
    await expect(dayNext).toHaveAttribute('part', /\bselected\b/);
    await expect(octoberMonth).toBeVisible();
    await expect(septemberMonth).not.toBeVisible();
  });

  test('should change selection in calendar after new date is typed', async ({
    page,
  }) => {
    const dateField = page.locator('#sl-form-field-control-0');
    const dayField = dateField.getByRole('spinbutton', { name: 'Day' });
    const monthField = dateField.getByRole('spinbutton', { name: 'Month' });
    const yearField = dateField.getByRole('spinbutton', { name: 'Year' });
    const selectDate = dateField.getByRole('button', { name: 'Select date' });
    const day1 = page.getByRole('button', { name: '1, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '20, Tuesday October 2026' });

    await day1.click();

    await expect(dayField).toHaveText('01');
    await expect(monthField).toHaveText('10');
    await expect(yearField).toHaveText('2026');

    await enterSegment(dateField, 'Day', '20');
    await expect(dayField).toHaveText('20');

    await selectDate.click();

    await expect(day2).toHaveAttribute('part', /\bselected\b/);
  });

  test('should change month when clicking month buttons', async ({ page }) => {
    const currentMonth = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const previousMonth = page.getByRole('button', {
      name: 'September, change month',
      exact: true,
    });
    const selectDay = page.getByRole('grid', {
      name: 'Days of September 2026',
      exact: true,
    });
    const selectMonth = page.getByRole('grid', {
      name: 'Months of 2026',
      exact: true,
    });
    const septemberButton = page.getByRole('button', {
      name: 'September',
      exact: true,
    });

    await currentMonth.click();

    await expect(selectMonth).toBeVisible();
    await expect(septemberButton).toBeVisible();
    await septemberButton.click();

    await expect(selectDay).toBeVisible();
    await expect(previousMonth).toBeVisible();
    await expect(currentMonth).not.toBeVisible();
  });

  test('should add class `selected` to month in month view', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const currentMonth = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const octoberButton = page.getByRole('button', {
      name: 'October',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectDate.click();

    await currentMonth.click();

    await expect(octoberButton).toBeVisible();
    await expect(octoberButton).toHaveAttribute('class', /\bselected\b/);
  });

  test('should change year when clicking year buttons', async ({ page }) => {
    const currentYear = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const nextYear = page.getByRole('button', {
      name: '2027, change year',
      exact: true,
    });
    const selectDay = page.getByRole('grid', {
      name: 'Days of October 2027',
      exact: true,
    });
    const selectYear = page.getByRole('grid', {
      name: 'Years from 2021 to 2032',
      exact: true,
    });
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
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const currentYear = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const yearButton = page.getByRole('button', { name: '2026', exact: true });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();
    await selectDate.click();
    await currentYear.click();

    await expect(yearButton).toBeVisible();
    await expect(yearButton).toHaveAttribute('class', /\bselected\b/);
  });

  test('should allow to use arrow buttons to navigate', async ({ page }) => {
    const previousArrow = page.getByRole('button', {
      name: 'Previous month, September 2026',
      exact: true,
    });
    const nextArrow = page.getByRole('button', {
      name: 'Next month, November 2026',
      exact: true,
    });
    const nextMonthButton = page.getByRole('button', {
      name: 'Next month, October 2026',
      exact: true,
    });
    const currentMonth = page.getByRole('button', {
      name: 'September, change month',
      exact: true,
    });

    await expect(previousArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();

    await previousArrow.click();
    await expect(currentMonth).toBeVisible();

    await nextMonthButton.click();
    await expect(currentMonth).not.toBeVisible();
  });

  test('should preserve selected date when changing month with arrow buttons', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const previousArrow = page.getByRole('button', {
      name: 'Previous month, September 2026',
      exact: true,
    });
    const nextArrow = page.getByRole('button', {
      name: 'Next month, October 2026',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectDate.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await previousArrow.click();
    await expect(selectedDay).not.toBeVisible();

    await nextArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });

  test('should preserve selected date when changing month with month view', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const changeMonthOctober = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const changeMonthNovember = page.getByRole('button', {
      name: 'November, change month',
      exact: true,
    });
    const nextMonth = page.getByRole('button', {
      name: 'November',
      exact: true,
    });
    const previousMonth = page.getByRole('button', {
      name: 'October',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectDate.click();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await changeMonthOctober.click();

    await nextMonth.click();
    await expect(selectedDay).not.toBeVisible();

    await changeMonthNovember.click();
    await previousMonth.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });

  test('should preserve selected date when changing year with year view', async ({
    page,
  }) => {
    const selectDate = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' });
    const changeYear2026 = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const changeYear2027 = page.getByRole('button', {
      name: '2027, change year',
      exact: true,
    });
    const nextYear = page.getByRole('button', { name: '2027', exact: true });
    const previousArrow = page.getByRole('button', {
      name: '2026',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectDate.click();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);

    await changeYear2026.click();

    await nextYear.click();
    await expect(selectedDay).not.toBeVisible();

    await changeYear2027.click();
    await previousArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('part', /\bselected\b/);
  });

  test('should close calendar when clicking outside', async ({ page }) => {
    await expect(
      page.getByRole('grid', { name: 'Days of October 2026' }),
    ).toBeVisible();

    await page.mouse.click(0, 0);
    await expect(
      page.getByRole('grid', { name: 'Days of October 2026' }),
    ).not.toBeVisible();
  });
});
