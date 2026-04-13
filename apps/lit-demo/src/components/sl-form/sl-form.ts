import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
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
  static override get scopedElements(): ScopedElementsMap {
    return {
      'sl-form': Form,
      'sl-form-field': FormField,
      'sl-text-field': TextField,
      'sl-checkbox': Checkbox,
      'sl-button': Button,
      'sl-button-bar': ButtonBar,
    };
  }

  @state() private _name = '';
  @state() private _agreed = false;

  private _onNameChange(event: Event): void {
    this._name = ((event.target as HTMLElement & { value: string }).value ?? '').trim();
  }

  private _onAgreeChange(event: Event): void {
    this._agreed = (event.target as HTMLElement & { checked: boolean }).checked;
  }

  private _onSubmit(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field label="Name">
          <sl-text-field name="name" required @sl-change=${this._onNameChange}></sl-text-field>
        </sl-form-field>

        <sl-form-field label="I agree">
          <sl-checkbox name="agree" @sl-change=${this._onAgreeChange}></sl-checkbox>
        </sl-form-field>

        <sl-button-bar>
          <sl-button variant="primary" ?disabled=${!this._name || !this._agreed} @click=${this._onSubmit}>Confirm</sl-button>
        </sl-button-bar>
      </sl-form>
    `;
  }
}
