import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-time-field accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-time-field');
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
    await page.goto('/sl-time-field'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-time-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name for stepper fields', async ({ page }) => {
    const activeDateField = page.locator('#sl-form-field-control-0');
    const activeDayField = activeDateField.getByRole('spinbutton', {
      name: 'Hour',
    });
    const activeMonthField = activeDateField.getByRole('spinbutton', {
      name: 'Minute',
    });
    const disabledDateField = page.locator('#sl-form-field-control-1');
    const disabledDayField = disabledDateField.getByRole('spinbutton', {
      name: 'Hour',
    });
    const disabledMonthField = disabledDateField.getByRole('spinbutton', {
      name: 'Minute',
    });

    await expect(activeDayField).toHaveAccessibleName('Hour');
    await expect(activeMonthField).toHaveAccessibleName('Minute');
    await expect(disabledDayField).toHaveAccessibleName('Hour');
    await expect(disabledMonthField).toHaveAccessibleName('Minute');
  });

  test('should have accessible name for field buttons', async ({ page }) => {
    const activeSelectButton = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' });
    const disabledSelectButton = page
      .locator('#sl-form-field-control-1')
      .getByRole('button', { name: 'Select time' });

    await expect(activeSelectButton).toHaveAccessibleName('Select time');
    await expect(disabledSelectButton).toHaveAccessibleName('Select time');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Hour', 'Select time', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should move focus to dialog when time picker is opened', async ({
    page,
  }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const selectTime = timeField
      .getByRole('button', { name: 'Select time' });
    const activeElement = '12 Hour';
    const button = 'Focus me';

    await selectTime.click();

    const focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe(activeElement);
    await page.keyboard.press('Tab');
    await expect(getFocusedElement(page)).resolves.toBe(button);
    }
  );

  test('should have keyboard operable spinbuttons', async ({ page }) => {
    const hourField = page
      .locator('#sl-form-field-control-0')
      .getByRole('spinbutton', { name: 'Hour' });
    const minuteField = page
      .locator('#sl-form-field-control-0')
      .getByRole('spinbutton', { name: 'Minute' });

    await hourField.focus();
    await page.keyboard.press('ArrowUp');
    await expect(hourField).toHaveText('13');

    await page.keyboard.press('ArrowRight');
    await expect(minuteField).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(minuteField).toHaveText('55');

    await page.keyboard.press('ArrowLeft');
    await expect(hourField).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(hourField).toHaveText('14');
  });

  test('should have aria-expanded attribute for field button', async ({
    page,
  }) => {
    const selectButton = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' });

    await expect(selectButton).toHaveAttribute('aria-expanded', 'false');
    await selectButton.click();
    await expect(selectButton).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('sl-time-field accessibility with opened dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-time-field');
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' })
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
    ]).disableRules(['color-contrast', 'scrollable-region-focusable']); // disable rules that are design choice that are not accessibility issues
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-time-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' })
      .click();
    const axe = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22a',
      'wcag22aa',
    ]).disableRules(['color-contrast', 'scrollable-region-focusable']); // disable rules that are design choice that are not accessibility issues;
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 408, height: 667 }); // 320px width + 32px padding + 56px collapsed navigation
    await page.goto('/sl-time-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' })
      .click();

    const timePicker = page.locator('#sl-form-field-control-0').locator('#dialog');
    await expect(timePicker).toBeVisible();
    await expect(timePicker).toBeInViewport({ ratio: 1 });

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name for lists in time picker', async ({ page }) => {
    const timePicker = page.locator('#sl-form-field-control-0').locator('#dialog');
    const hours = timePicker.getByRole('listbox', { name: 'Hours' });
    const minutes = timePicker.getByRole('listbox', { name: 'Minutes' });

    await expect(hours).toHaveAccessibleName('Select hours');
    await expect(minutes).toHaveAccessibleName('Select minutes');
  });

  test('should have hour and minute buttons with accessible names', async ({
    page,
  }) => {
    const hour = page.getByRole('option', {
      name: '12'
    });
    const minute = page.getByRole('option', {
      name: '30'
    });

    await expect(hour).toHaveAccessibleName('12 Hour');
    await expect(minute).toHaveAccessibleName('30 Minute');
  });

  test('should be navigable with arrows in day view', async ({ page }) => {
    const hourStart = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '12 Hour', exact: true
    });
    const hourPrevious = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '11 Hour', exact: true
    });
    const minuteStart = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '0 Minute', exact: true
    });
    const minutePrevious = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '55 Minute'
    });
    const picker = page
  .locator('#sl-form-field-control-0')
  .locator('#dialog');

    await expect(picker).toBeVisible();

    await hourStart.focus();
    await page.keyboard.press('ArrowUp');
    await expect(hourPrevious).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(hourStart).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(minuteStart).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(minutePrevious).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(minuteStart).toBeFocused();
  });

  test('should not select hours and minutes on arrow navigation', async ({ page }) => {
    const hourStart = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '12 Hour', exact: true
    });
    const hourPrevious = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '11 Hour', exact: true
    });
    const minuteStart = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '0 Minute', exact: true
    });
    const minutePrevious = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '55 Minute'
    });
    const picker = page
  .locator('#sl-form-field-control-0')
  .locator('#dialog');

    await expect(picker).toBeVisible();

    await hourStart.focus();
    await expect(hourStart).toHaveAttribute('aria-selected', 'false');
    await page.keyboard.press('ArrowUp');
    await expect(hourPrevious).toHaveAttribute('aria-selected', 'false');
    await page.keyboard.press('ArrowDown');
    await expect(hourStart).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(minuteStart).toHaveAttribute('aria-selected', 'false');
    await page.keyboard.press('ArrowUp');
    await expect(minutePrevious).toHaveAttribute('aria-selected', 'false');
    await page.keyboard.press('ArrowDown');
    await expect(minuteStart).toHaveAttribute('aria-selected', 'false');
  });

  test('should have not focusable disabled minutes', async ({ page }) => {
    const hour = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '8 Hour', exact: true
    });
    const minuteStart = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '40 Minute', exact: true
    });
    const minuteNext = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '55 Minute'
    });
    const minuteDisabled = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '35 Minute'
    });
    
    await hour.click();
    await minuteStart.focus();

    await expect(minuteStart).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(minuteDisabled).not.toBeFocused();
    await expect(minuteNext).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(minuteStart).toBeFocused();
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key}`, async ({
      page,
    }) => {
      const selectButton = page
        .locator('#sl-form-field-control-0')
        .getByRole('button', { name: 'Select time' });
      const hour = page.getByRole('option', {
        name: '12',
      });
      const minute = page.getByRole('option', {
        name: '30',
      });
      const picker = page
      .locator('#sl-form-field-control-0').locator('#dialog');

      await hour.focus();
      await page.keyboard.press(key);

      await minute.focus();
      await page.keyboard.press(key);

      await selectButton.click();
      await expect(picker).toBeVisible();
      await expect(hour).toHaveAttribute('aria-selected', 'true');
      await expect(minute).toHaveAttribute('aria-selected', 'true');
    });
  }

  test('should close picker with Esc key', async ({ page }) => {
    const selectButton = page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' });
    const picker = page
      .locator('#sl-form-field-control-0').locator('#dialog');

    await expect(picker).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(picker).not.toBeVisible();
    await expect(selectButton).toHaveAttribute('aria-expanded', 'false');
    await expect(selectButton).toBeFocused();
  });

  test('should have aria-disabled attribute for disabled minutes', async ({ page }) => {
    const hour = page.getByRole('listbox', { name: 'Hours' }).getByRole('option', {
      name: '8 Hour', exact: true
    });
    const minuteDisabled = page.getByRole('listbox', { name: 'Minutes' }).getByRole('option', {
      name: '35 Minute'
    });
    
    await hour.click();
    await expect(minuteDisabled).toHaveAttribute('disabled', '');
  });
});
