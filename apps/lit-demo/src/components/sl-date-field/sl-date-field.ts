import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { DateField } from '@sl-design-system/date-field';
import styles from './sl-date-field.scss.js';

export class DateFieldPage extends ScopedElementsMixin(LitElement) {
  static override styles = styles;

  static scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-date-field': DateField,
  };

  override render(): TemplateResult {
    return html`
        <sl-form-field label="Appointment date">
          <sl-date-field locale="en-GB"></sl-date-field>
        </sl-form-field>

        <sl-form-field label="Concert date">
          <sl-date-field locale="en-GB" disabled></sl-date-field>
        </sl-form-field>
    `;
  }
}
