import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { NumberField } from '@sl-design-system/number-field';

export class NumberFieldPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-number-field': NumberField,
  };

  override render(): TemplateResult {
    return html`
      <sl-number-field
        aria-label="Number field"
        value="1"
        step-buttons="end"
      ></sl-number-field>
    `;
  }
}
