import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-date-field accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-date-field');
  });

  test('should have no accessibility violations', async ({ page }) => {
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

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-date-field'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-date-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name for stepper fields', async ({ page }) => {
    const activeDateField = page.locator('#sl-form-field-control-0');
    const activeDayField = activeDateField.getByRole('spinbutton', { name: 'Day' });
    const activeMonthField = activeDateField.getByRole('spinbutton', { name: 'Month' });
    const activeYearField = activeDateField.getByRole('spinbutton', { name: 'Year' });
    const disabledDateField = page.locator('#sl-form-field-control-1');
    const disabledDayField = disabledDateField.getByRole('spinbutton', { name: 'Day' });
    const disabledMonthField = disabledDateField.getByRole('spinbutton', { name: 'Month' });
    const disabledYearField = disabledDateField.getByRole('spinbutton', { name: 'Year' });
  
    await expect(activeDayField).toHaveAccessibleName('Day');
    await expect(activeMonthField).toHaveAccessibleName('Month');
    await expect(activeYearField).toHaveAccessibleName('Year');
    await expect(disabledDayField).toHaveAccessibleName('Day');
    await expect(disabledMonthField).toHaveAccessibleName('Month');
    await expect(disabledYearField).toHaveAccessibleName('Year');
  });

  test('should have accessible name for field buttons', async ({ page }) => {
    const activeSelectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const disabledSelectButton = page.locator('#sl-form-field-control-1').getByRole('button', { name: 'Select date' });

    await expect(activeSelectButton).toHaveAccessibleName('Select date');
    await expect(disabledSelectButton).toHaveAccessibleName('Select date');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = [
      'Day',
      'Select date',
      'Focus me'
    ] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

    test('should have correct tab order when calendar is opened v2', async ({ page }) => {
    const selectDate = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const selectMonth = page.getByRole('button', { name: 'October, change month' });
    const activeElements = [
      'October, change month',
      '2026, change year',
      'Previous month, September 2026',
      'Next month, November 2026',
      '15, Thursday October 2026',
    ] as const;

    await selectDate.click();
    await selectMonth.focus();

    for (const activeElement of activeElements) {
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
      await page.keyboard.press('Tab');
    }
  });

  test('should have keyboard operable spinbuttons', async ({ page }) => {
    const dayField = page.locator('#sl-form-field-control-0').getByRole('spinbutton', { name: 'Day' });
    const monthField = page.locator('#sl-form-field-control-0').getByRole('spinbutton', { name: 'Month' });
    const yearField = page.locator('#sl-form-field-control-0').getByRole('spinbutton', { name: 'Year' });

    await dayField.focus();
    await page.keyboard.press('ArrowUp');
    await expect(dayField).toHaveText('01');

    await page.keyboard.press('ArrowRight');
    await expect(monthField).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(monthField).toHaveText('12');

    await page.keyboard.press('ArrowRight');
    await expect(yearField).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(yearField).toHaveText('2026');
    });

    test('should have aria-expanded attribute for field button', async ({ page }) => {
    const activeSelectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    
    await expect(activeSelectButton).toHaveAttribute('aria-expanded', 'false');
    await activeSelectButton.click();
    await expect(activeSelectButton).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('sl-date-field accessibility with opened dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-date-field');
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select date' })
      .click();
  });

  test('should have no accessibility violations', async ({ page }) => {
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

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-date-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' }).click();
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
    await page.goto('/sl-date-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name for calendar', async ({ page }) => {
    const calendar = page.getByRole('grid', { name: 'October 2026' });
    await expect(calendar).toHaveAccessibleName('Days of October 2026');
  });

  test('should have accessible name for month view', async ({ page }) => {
    const monthView = page.getByRole('grid', { name: 'Months of 2026' });

    await page
      .getByRole('button', { name: 'October, change month', exact: true })
      .click();
    await expect(monthView).toHaveAccessibleName('Months of 2026');
  });

  test('should have accessible name for year view', async ({ page }) => {
    const yearView = page.getByRole('grid', {
      name: 'Years from 2021 to 2032',
    });

    await page
      .getByRole('button', { name: '2026, change year', exact: true })
      .click();
    await expect(yearView).toHaveAccessibleName('Years from 2021 to 2032');
  });

  test('should have buttons with accessible names in day view', async ({
    page,
  }) => {
    const monthButton = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const yearButton = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const previousButton = page.getByRole('button', {
      name: 'Previous month, September 2026',
    });
    const nextButton = page.getByRole('button', {
      name: 'Next month, November 2026',
    });
    const dayButton = page.getByRole('button', {
      name: '1, Thursday October 2026',
    });

    await expect(monthButton).toHaveAccessibleName('October, change month');
    await expect(yearButton).toHaveAccessibleName('2026, change year');
    await expect(previousButton).toHaveAccessibleName(
      'Previous month, September 2026',
    );
    await expect(nextButton).toHaveAccessibleName('Next month, November 2026');
    await expect(dayButton).toHaveAccessibleName('1, Thursday October 2026');
  });

  test('should have buttons with accessible names in month view', async ({
    page,
  }) => {
    const monthButton = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const yearButton = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const previousButton = page.getByRole('button', {
      name: 'Previous year, 2025',
    });
    const nextButton = page.getByRole('button', { name: 'Next year, 2027' });
    const currentMonthButton = page.getByRole('button', {
      name: 'October',
    });

    await monthButton.click();

    await expect(yearButton).toHaveAccessibleName('2026, change year');
    await expect(previousButton).toHaveAccessibleName('Previous year, 2025');
    await expect(nextButton).toHaveAccessibleName('Next year, 2027');
    await expect(currentMonthButton).toHaveAccessibleName('October');
  });

  test('should have buttons with accessible names in year view', async ({
    page,
  }) => {
    const yearButton = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const previousButton = page.getByRole('button', {
      name: 'Go back 12 years',
    });
    const nextButton = page.getByRole('button', {
      name: 'Go forward 12 years',
    });
    const currentYearButton = page.getByRole('button', {
      name: '2026',
    });

    await yearButton.click();

    await expect(previousButton).toHaveAccessibleName('Go back 12 years');
    await expect(nextButton).toHaveAccessibleName('Go forward 12 years');
    await expect(currentYearButton).toHaveAccessibleName('2026');
  });

  test('should be navigable with arrows in day view', async ({ page }) => {
    const button = page.getByRole('button', {
      name: '15, Thursday October 2026',
    });
    await button.focus();

    await page.keyboard.press('ArrowRight');
    expect(await getFocusedElement(page)).toBe('16, Friday October 2026');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedElement(page)).toBe('23, Friday October 2026');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedElement(page)).toBe('22, Thursday October 2026');

    await page.keyboard.press('ArrowUp');
    expect(await getFocusedElement(page)).toBe('15, Thursday October 2026');
  });

  test('should be navigable with arrows in month view', async ({ page }) => {
    const button = page.getByRole('button', {
      name: 'October, change month',
    });
    const month = page.getByRole('button', { name: 'August' });
    await button.click();

    await month.focus();
    await page.keyboard.press('ArrowRight');
    expect(await getFocusedElement(page)).toBe('September');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedElement(page)).toBe('December');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedElement(page)).toBe('November');

    await page.keyboard.press('ArrowUp');
    expect(await getFocusedElement(page)).toBe('August');
  });

  test('should be navigable with arrows in year view', async ({ page }) => {
    const button = page.getByRole('button', {
      name: '2026, change year',
    });
    const month = page.getByRole('button', { name: '2025' });
    await button.click();

    await month.focus();

    await page.keyboard.press('ArrowRight');
    expect(await getFocusedElement(page)).toBe('2026');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedElement(page)).toBe('2029');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedElement(page)).toBe('2028');

    await page.keyboard.press('ArrowUp');
    expect(await getFocusedElement(page)).toBe('2025');
  });

  test('should not select dates on arrow navigation', async ({ page }) => {
    const day1 = page.getByRole('button', { name: '15, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '16, Friday October 2026' });

    await day1.focus();
    await expect(day1).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day1).not.toHaveAttribute('aria-pressed', 'true');

    await page.keyboard.press('ArrowRight');
    await expect(day2).toBeFocused();
    await expect(day2).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day2).not.toHaveAttribute('aria-pressed', 'true');

    await expect(day1).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day1).not.toHaveAttribute('aria-pressed', 'true');
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key} in day view`, async ({
      page,
    }) => {
      const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
      const button = page.getByRole('button', {
        name: '15, Thursday October 2026',
      });

      await button.focus();

      await page.keyboard.press(key);
      await selectButton.click();

      await expect(button).toHaveAttribute('part', /\bselected\b/);
    });
  }

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key} in month view`, async ({
      page,
    }) => {
      const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
      const button = page.getByRole('button', {
        name: '15, Thursday October 2026',
      });
      const monthButton = page.getByRole('button', {
        name: 'October, change month',
        exact: true,
      });
      const currentMonth = page.getByRole('button', {
        name: 'October',
        exact: true,
      });

      await button.focus();
      await page.keyboard.press(key);

      await selectButton.click();
      await monthButton.focus();
      await page.keyboard.press(key);

      await expect(currentMonth).toHaveAttribute('class', /\bselected\b/);

      await currentMonth.focus();
      await page.keyboard.press(key);

      await expect(button).toHaveAttribute('part', /\bselected\b/);
    });
  }

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key} in year view`, async ({
      page,
    }) => {
      const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
      const button = page.getByRole('button', {
        name: '1, Thursday October 2026',
      });
      const yearButton = page.getByRole('button', {
        name: '2026, change year',
        exact: true,
      });
      const currentYear = page.getByRole('button', {
        name: '2026',
        exact: true,
      });

      await button.focus();
      await page.keyboard.press(key);

      await selectButton.click();
      await yearButton.focus();
      await page.keyboard.press(key);

    
      await expect(currentYear).toHaveAttribute('class', /\bselected\b/);

      await currentYear.focus();
      await page.keyboard.press(key);

      await expect(button).toHaveAttribute('part', /\bselected\b/);
    });
  }

  test('should have aria-pressed attribute', async ({ page }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const button = page.getByRole('button', {
      name: '1, Thursday October 2026',
    });

    await button.focus();
    await page.keyboard.press('Space');

    await selectButton.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('should have aria-pressed attribute for month', async ({ page }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const monthButton = page.getByRole('button', {
      name: 'October, change month',
      exact: true,
    });
    const currentMonth = page.getByRole('button', {
      name: 'October',
      exact: true,
    });
    const button = page.getByRole('button', {
      name: '1, Thursday October 2026',
    });

    await button.focus();
    await page.keyboard.press('Space');

    await selectButton.click();
    await monthButton.focus();
    await page.keyboard.press('Space');

    await expect(currentMonth).toHaveAttribute('aria-pressed', 'true');
  });

  test('should have aria-pressed attribute for year', async ({ page }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const yearButton = page.getByRole('button', {
      name: '2026, change year',
      exact: true,
    });
    const currentYear = page.getByRole('button', { name: '2026', exact: true });
    const button = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await button.focus();
    await page.keyboard.press('Space');

    await selectButton.click();
    await yearButton.focus();
    await page.keyboard.press('Space');

    await expect(currentYear).toHaveAttribute('aria-pressed', 'true');
  });

  test('should preserve `aria-pressed` when month changes with arrow buttons', async ({
    page,
  }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const nextMonth = page.getByRole('button', {
      name: 'Next month, November 2026',
      exact: true,
    });
    const previousMonth = page.getByRole('button', {
      name: 'Previous month, October 2026',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectButton.click();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');

    await nextMonth.click();
    await expect(selectedDay).not.toBeVisible();

    await previousMonth.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');
  });

  test('should preserve `aria-pressed` when month changes with month button', async ({
    page,
  }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
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
    const previousArrow = page.getByRole('button', {
      name: 'October',
      exact: true,
    });
    const selectedDay = page.getByRole('button', {
      name: '15, Thursday October 2026',
      exact: true,
    });

    await selectedDay.click();

    await selectButton.click();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');
    await changeMonthOctober.click();

    await nextMonth.click();
    await expect(selectedDay).not.toBeVisible();

    await changeMonthNovember.click();
    await previousArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');
  });

  test('should preserve `aria-pressed` when year changes with year button', async ({
    page,
  }) => {
    const selectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
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

    await selectButton.click();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');

    await changeYear2026.click();

    await nextYear.click();
    await expect(selectedDay).not.toBeVisible();

    await changeYear2027.click();
    await previousArrow.click();
    await expect(selectedDay).toBeVisible();
    await expect(selectedDay).toHaveAttribute('aria-pressed', 'true');
  });

  test('should close calendar with Esc key', async ({
    page,
  }) => {
    const activeSelectButton = page.locator('#sl-form-field-control-0').getByRole('button', { name: 'Select date' });
    const calendar = page.getByRole('grid', { name: 'October 2026' });

    await expect(calendar).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(calendar).not.toBeVisible();
    await expect(activeSelectButton).toHaveAttribute('aria-expanded', 'false');
  });
});