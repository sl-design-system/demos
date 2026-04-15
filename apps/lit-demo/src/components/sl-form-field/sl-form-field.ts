import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { TextField } from '@sl-design-system/text-field';

export class FormFieldPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-text-field': TextField,
  };

  override render(): TemplateResult {
    return html`
      <div class="states">
        <sl-form-field label="Enabled">
          <sl-text-field></sl-text-field>
        </sl-form-field>

        <sl-form-field label="Disabled">
          <sl-text-field disabled></sl-text-field>
        </sl-form-field>
      </div>
    `;
  }
}
