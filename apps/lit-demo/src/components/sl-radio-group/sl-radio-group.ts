import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Form, FormField } from '@sl-design-system/form';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';

export class RadioGroupPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
  };

  private get _form(): Form | null {
    return this.renderRoot.querySelector('sl-form');
  }

  private _onValidate(event: Event): void {
    const radioGroup = event.target as RadioGroup<string>;
    radioGroup.setCustomValidity(
      radioGroup.value === '2' ? '' : 'Pick the middle option',
    );
  }

  private _reportValidity(): void {
    this._form?.reportValidity();
  }

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field
          label="Radio group"
          hint="This story has both builtin validation (required) and custom validation. You need to cThis story has both builtin validation (required) and custom validation. You need to check the second option to make the field valid."
        >
          <sl-radio-group @sl-validate=${this._onValidate} required>
            <sl-radio value="1">One</sl-radio>
            <sl-radio value="2">Two</sl-radio>
          </sl-radio-group>
        </sl-form-field>

        <sl-button-bar>
          <sl-button variant="primary" @click=${this._reportValidity}
            >Report validity</sl-button
          >
        </sl-button-bar>

        <sl-form-field
          label="Disabled radio group"
          hint="This radio group is disabled; no interaction is possible."
        >
          <sl-radio-group disabled>
            <sl-radio value="4">Four</sl-radio>
            <sl-radio value="5">Five</sl-radio>
          </sl-radio-group>
        </sl-form-field>
      </sl-form>
    `;
  }
}
