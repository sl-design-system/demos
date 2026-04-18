import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Form } from '@sl-design-system/form';
import { FormField } from '@sl-design-system/form';
import { TextField } from '@sl-design-system/text-field';
import { Checkbox } from '@sl-design-system/checkbox';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';

export class FormPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-text-field': TextField,
    'sl-checkbox': Checkbox,
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
  };

  private get _form(): Form | null {
    return this.renderRoot.querySelector('sl-form');
  }

  private _onSubmit(): void {
    if (!this._form?.reportValidity()) {
      return;
    }
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field label="Name">
          <sl-text-field name="name" required></sl-text-field>
        </sl-form-field>

        <sl-form-field label="I agree">
          <sl-checkbox name="agree" required></sl-checkbox>
        </sl-form-field>

        <sl-button-bar>
          <sl-button variant="primary" @click=${this._onSubmit}
            >Confirm</sl-button
          >
        </sl-button-bar>
      </sl-form>
    `;
  }
}
