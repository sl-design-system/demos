import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { DateField } from '@sl-design-system/date-field';
import { FormField } from '@sl-design-system/form';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

function addDays(days: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

export class DateFieldDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-date-field': DateField,
    'sl-form-field': FormField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Basic',
        html`
          <sl-form-field label="Due date">
            <sl-date-field></sl-date-field>
          </sl-form-field>
        `,
        {
          hint: 'You can type a date or open the calendar. Check that the calendar fits and is easy to tap.',
        },
      )}
      ${demoSection(
        'Calendar only',
        html`
          <sl-form-field label="Appointment" hint="Within the next 30 days.">
            <sl-date-field
              select-only
              .min=${addDays(0)}
              .max=${addDays(30)}
            ></sl-date-field>
          </sl-form-field>
        `,
        {
          hint: 'With select-only, tapping opens the calendar and no keyboard appears.',
        },
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-date-field required></sl-date-field>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-date-field disabled .value=${addDays(0)}></sl-date-field>
          </sl-form-field>
        `,
      )}
    `;
  }
}
