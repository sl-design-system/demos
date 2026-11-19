import { test, expect, type Locator } from '@playwright/test';

type TimeSegment = 'Hour' | 'Minute' ;

const segmentPlaceholders: Record<TimeSegment, string> = {
  Hour: 'HH',
  Minute: 'MM',
};

async function enterSegment(
  timeField: Locator,
  segment: TimeSegment,
  value: string,
) {
  const field = timeField.getByRole('spinbutton', {
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

async function enterTime(
  timeField: Locator,
  hour: string,
  minute: string,
) {
  await enterSegment(timeField, 'Hour', hour);
  await enterSegment(timeField, 'Minute', minute);
}

test.describe('sl-time-field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-time-field');
  });

  test('should allow filling times', async ({ page }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });

    await enterSegment(timeField, 'Hour', '12');
    await expect(hourField).toHaveText('12');

    await enterSegment(timeField, 'Minute', '30');
    await expect(minuteField).toHaveText('30');
  });

  test('should show a typed time as selected in the picker', async ({
    page,
  }) => {
    const timeField = page.locator('#sl-form-field-control-0');

    await enterTime(timeField, '12', '30');
    await expect(timeField).toHaveJSProperty('formValue', '12:30');

    await timeField.getByRole('button', { name: 'Select time' }).click();
    await expect(
      timeField
        .getByRole('listbox', { name: 'Select hours' })
        .getByRole('option', { selected: true }),
    ).toHaveText('12');

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select minutes' })
        .getByRole('option', { selected: true }),
    ).toHaveText('30');
  });

  test('should not allow invalid times', async ({
    page,
  }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });

    await hourField.click();
    await page.keyboard.type('25');
    await expect(hourField).not.toHaveText('25');
    await expect(hourField).toHaveText('05');

    await minuteField.click();
    await page.keyboard.type('61');
    await expect(minuteField).not.toHaveText('61');
    await expect(minuteField).toHaveText('01');
  });

  test('should not allow filling disabled time field', async ({ page }) => {
    const timeField = page.locator('#sl-form-field-control-1');
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });

    await expect(timeField).toHaveAttribute('disabled', '');

    await hourField.click({ force: true });
    await page.keyboard.type('12');
    await expect(hourField).toHaveText('HH');

    await minuteField.click({ force: true });
    await page.keyboard.type('30');
    await expect(minuteField).toHaveText('MM');
  });

  test('should not allow expanding calendar when disabled', async ({
    page,
  }) => {
    const selectTime = page
      .locator('#sl-form-field-control-1')
      .getByRole('button', { name: 'Select time' });

    await expect(selectTime).toHaveAttribute('disabled');

    await selectTime.click({ force: true });

    const timePicker = page.locator('#sl-form-field-control-1').locator('#dialog');

    await expect(timePicker.getByRole('grid')).not.toBeVisible();
  });
});

test.describe('sl-time-field with opened dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-time-field');
    await page
      .locator('#sl-form-field-control-0')
      .getByRole('button', { name: 'Select time' })
      .click();
  });

  test('should render the time picker without any selection', async ({
    page,
  }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const selectTime = timeField.getByRole('button', { name: 'Select time' });

    await selectTime.click();

    const timePicker = page.locator('#sl-form-field-control-0').locator('#dialog');
    await expect(timePicker).toBeVisible();

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select hours' })
        .getByRole('option', { selected: true }),
    ).toHaveCount(0);

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select minutes' })
        .getByRole('option', { selected: true }),
    ).toHaveCount(0);
  });

  test('should select time', async ({ page }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });
    const hourButton = page.getByRole('option', { name: '12 hour' });
    const minuteButton = page.getByRole('option', { name: '30 minute' });

    await expect(hourButton).not.toHaveAttribute('selected', 'true');
    await hourButton.click();
    await expect(hourField).toHaveText('12');

    await expect(minuteButton).not.toHaveAttribute('selected', 'true');
    await minuteButton.click();
    await expect(minuteField).toHaveText('30');  

    await expect(timeField).toHaveJSProperty('formValue', '12:30');
    await expect(timeField).toHaveJSProperty('valid', true);
  });

  test('should not deselect after second click', async ({ page }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const selectTime = timeField.getByRole('button', { name: 'Select time' });
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });
    const hourButton = page.getByRole('option', { name: '12 hour' });
    const minuteButton = page.getByRole('option', { name: '30 minute' });

    await hourButton.click();
    await expect(hourField).toHaveText('12');

    await minuteButton.click();
    await expect(minuteField).toHaveText('30');

    await expect(timeField).toHaveJSProperty('formValue', '12:30');

    await selectTime.click();

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select hours' })
        .getByRole('option', { selected: true }),
    ).toHaveText('12');
    await expect(
      timeField
        .getByRole('listbox', { name: 'Select minutes' })
        .getByRole('option', { selected: true }),
    ).toHaveText('30');

    await hourButton.click();
    await expect(hourField).toHaveText('12');

    await minuteButton.click();
    await expect(minuteField).toHaveText('30');

    await selectTime.click();

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select hours' })
        .getByRole('option', { selected: true }),
    ).toHaveText('12');
    await expect(
      timeField
        .getByRole('listbox', { name: 'Select minutes' })
        .getByRole('option', { selected: true }),
    ).toHaveText('30');
  });

  test('should change selection in picker after new time is typed', async ({
    page,
  }) => {
    const timeField = page.locator('#sl-form-field-control-0');
    const hourField = timeField.getByRole('spinbutton', { name: 'Hour' });
    const minuteField = timeField.getByRole('spinbutton', { name: 'Minute' });
    const selectDate = timeField.getByRole('button', { name: 'Select time' });
    const hour1 = page.getByRole('option', { name: '12 hour' });
    const minute1 = page.getByRole('option', { name: '30 minute' });

    await hour1.click();
    await minute1.click();

    await expect(hourField).toHaveText('12');
    await expect(minuteField).toHaveText('30');

    await enterSegment(timeField, 'Hour', '18');
    await expect(hourField).toHaveText('18');
    await enterSegment(timeField, 'Minute', '20');
    await expect(minuteField).toHaveText('20');

    await selectDate.click();

    const timePicker = page.locator('#sl-form-field-control-0').locator('#dialog');
    await expect(timePicker).toBeVisible();

    await expect(
      timeField
        .getByRole('listbox', { name: 'Select hours' })
        .getByRole('option', { selected: true }),
    ).toHaveText('18');
    await expect(
      timeField
        .getByRole('listbox', { name: 'Select minutes' })
        .getByRole('option', { selected: true }),
    ).toHaveText('20');
  });

  test('should close picker when clicking outside', async ({ page }) => {
    const timePicker = page.locator('#sl-form-field-control-0').locator('#dialog');
    await expect(timePicker).toBeVisible();

    await page.mouse.click(0, 0);
    await expect(timePicker).not.toBeVisible();
  });
});
