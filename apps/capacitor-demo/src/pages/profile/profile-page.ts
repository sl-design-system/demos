import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Form, FormField } from '@sl-design-system/form';
import { Option } from '@sl-design-system/listbox';
import { MessageDialog } from '@sl-design-system/message-dialog';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { Select } from '@sl-design-system/select';
import { Switch } from '@sl-design-system/switch';
import { TextField } from '@sl-design-system/text-field';
import '@sl-design-system/message-dialog/register.js';
import styles from './profile-page.scss.js';

export class ProfilePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-option': Option,
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
    'sl-select': Select,
    'sl-switch': Switch,
    'sl-text-field': TextField,
  };

  static override styles = styles;

  private get _form(): Form | null {
    return this.renderRoot.querySelector('sl-form');
  }

  private async _onSave(): Promise<void> {
    if (!this._form?.reportValidity()) {
      return;
    }

    await MessageDialog.alert(
      'Your profile has been updated.',
      'Profile saved',
    );
  }

  override render(): TemplateResult {
    return html`
      <h2>Your profile</h2>
      <sl-form>
        <sl-form-field label="Full name">
          <sl-text-field
            name="name"
            value="Jan Janssen"
            required
          ></sl-text-field>
        </sl-form-field>

        <sl-form-field label="Email address">
          <sl-text-field
            name="email"
            type="email"
            value="jan.janssen@example.com"
            required
          ></sl-text-field>
        </sl-form-field>

        <sl-form-field label="School year">
          <sl-select name="year" value="year-3">
            <sl-option value="year-1">Year 1</sl-option>
            <sl-option value="year-2">Year 2</sl-option>
            <sl-option value="year-3">Year 3</sl-option>
            <sl-option value="year-4">Year 4</sl-option>
          </sl-select>
        </sl-form-field>

        <sl-form-field label="Preferred study moment">
          <sl-radio-group name="moment" value="afternoon">
            <sl-radio value="morning">Morning</sl-radio>
            <sl-radio value="afternoon">Afternoon</sl-radio>
            <sl-radio value="evening">Evening</sl-radio>
          </sl-radio-group>
        </sl-form-field>

        <sl-form-field label="Notifications">
          <sl-switch name="notifications" checked>
            Remind me about upcoming deadlines
          </sl-switch>
        </sl-form-field>

        <sl-button-bar align="end">
          <sl-button variant="primary" @click=${this._onSave}>Save</sl-button>
        </sl-button-bar>
      </sl-form>
    `;
  }
}
