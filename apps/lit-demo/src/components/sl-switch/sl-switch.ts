import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Switch } from '@sl-design-system/switch';
import styles from './sl-switch.scss.js';

export class SwitchPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-switch': Switch,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <div class="switch-container">
        <sl-switch value="12345">Text inside the switch</sl-switch>
        <sl-switch value="12345" disabled>Disabled switch</sl-switch>
      </div>
    `;
  }
}
