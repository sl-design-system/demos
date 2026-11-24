import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { TimeField } from '@sl-design-system/time-field';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class TimeFieldDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-time-field': TimeField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Basic',
        html`
          <sl-form-field label="Start time">
            <sl-time-field></sl-time-field>
          </sl-form-field>
        `,
        { hint: 'Type a time or pick hours and minutes from the lists.' },
      )}
      ${demoSection(
        'Quarter hours, school day only',
        html`
          <sl-form-field label="Lesson" hint="Between 08:00 and 17:00.">
            <sl-time-field
              select-only
              minute-step="15"
              min="08:00"
              max="17:00"
            ></sl-time-field>
          </sl-form-field>
        `,
        { hint: 'With select-only no keyboard appears.' },
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-time-field required></sl-time-field>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-time-field disabled value="09:30"></sl-time-field>
          </sl-form-field>
        `,
      )}
    `;
  }
}
