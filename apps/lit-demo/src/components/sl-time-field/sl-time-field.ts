import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { TimeField } from '@sl-design-system/time-field';
import styles from './sl-time-field.scss.js';

export class TimeFieldPage extends ScopedElementsMixin(LitElement) {
  static override styles = styles;

  static scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-time-field': TimeField,
  };

  override render(): TemplateResult {
    return html`
      <sl-form-field label="Appointment time">
        <sl-time-field max="18:20" min="08:40"></sl-time-field>
      </sl-form-field>

      <sl-form-field label="Concert time">
        <sl-time-field max="18:20" min="08:40" disabled></sl-time-field>
      </sl-form-field>
    `;
  }
}
