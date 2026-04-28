import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Form, FormField } from '@sl-design-system/form';
import { Option } from '@sl-design-system/listbox';
import { Select } from '@sl-design-system/select';

export class SelectPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-select': Select,
    'sl-option': Option,
  };

  private get _form(): Form | null {
    return this.renderRoot.querySelector('sl-form');
  }

  private get _select(): Select | null {
    return this.renderRoot.querySelector('#basic-select');
  }

  private _reportValidity(): void {
    const selectedValue = String(this._select?.value ?? '');
    const hasSelectedOption = ['1', '2'].includes(selectedValue);

    this._select?.setCustomValidity(
      hasSelectedOption ? '' : 'Please choose an option from the list.',
    );
    this._form?.reportValidity();
  }

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field>
          <sl-select id="basic-select" required clearable placeholder="Select an option" size="md">
            <sl-option value="1">Option 1</sl-option>
            <sl-option value="2">Option 2</sl-option>
          </sl-select>
        </sl-form-field>

        <sl-button-bar>
          <sl-button @click=${this._reportValidity}>Report validity</sl-button>
        </sl-button-bar>

        <sl-form-field>
          <sl-select disabled placeholder="Disabled select" size="md">
            <sl-option value="1">Disabled option 1</sl-option>
            <sl-option value="2">Disabled option 2</sl-option>
          </sl-select>
        </sl-form-field>
      </sl-form>
    `;
  }
}
