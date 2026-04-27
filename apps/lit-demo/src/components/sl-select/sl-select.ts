import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Form, FormField } from '@sl-design-system/form';
import { Option } from '@sl-design-system/listbox';
import { Select } from '@sl-design-system/select';

export class SelectPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-select': Select,
    'sl-option': Option,
  };

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field>
          <sl-select placeholder="Select an option" size="md">
            <sl-option value="1">Option 1</sl-option>
            <sl-option value="2">Option 2</sl-option>
            <sl-option value="3">Option 3</sl-option>
          </sl-select>
        </sl-form-field>
      </sl-form>
    `;
  }
}
