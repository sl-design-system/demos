import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { NumberField } from '@sl-design-system/number-field';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

const EURO: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR' };

export class NumberFieldDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-number-field': NumberField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Step buttons',
        html`
          <sl-form-field label="Quantity (buttons at the end)">
            <sl-number-field
              value="1"
              min="0"
              max="10"
              step-buttons="end"
            ></sl-number-field>
          </sl-form-field>
          <sl-form-field label="Quantity (buttons on both sides)">
            <sl-number-field
              value="1"
              min="0"
              max="10"
              step-buttons="edges"
            ></sl-number-field>
          </sl-form-field>
        `,
        {
          hint: 'On a phone, step buttons are often easier than typing. Check that they are big enough to tap.',
        },
      )}
      ${demoSection(
        'Formatted',
        html`
          <sl-form-field label="Price">
            <sl-number-field
              value="12.5"
              step="0.5"
              .formatOptions=${EURO}
            ></sl-number-field>
          </sl-form-field>
        `,
        { hint: 'Check which keyboard appears: it should allow decimals.' },
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-number-field required></sl-number-field>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-number-field disabled value="3"></sl-number-field>
          </sl-form-field>
        `,
      )}
    `;
  }
}
