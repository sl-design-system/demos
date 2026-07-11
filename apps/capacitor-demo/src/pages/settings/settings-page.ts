import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Callout } from '@sl-design-system/callout';
import { FormField } from '@sl-design-system/form';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { themeManager } from '../../theme.js';
import styles from './settings-page.scss.js';

export class SettingsPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-callout': Callout,
    'sl-form-field': FormField,
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
  };

  static override styles = styles;

  private _onThemeChange = (): void => {
    this.requestUpdate();
  };

  override connectedCallback(): void {
    super.connectedCallback();

    themeManager.addEventListener('theme-change', this._onThemeChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    themeManager.removeEventListener('theme-change', this._onThemeChange);
  }

  private _onModeChange(event: Event): void {
    const value = (event.target as RadioGroup).value;

    if (value === 'light' || value === 'dark' || value === 'system') {
      void themeManager.setMode(value);
    }
  }

  override render(): TemplateResult {
    return html`
      <h2>Appearance</h2>
      <sl-form-field label="Theme">
        <sl-radio-group
          value=${themeManager.mode}
          @sl-change=${this._onModeChange}
        >
          <sl-radio value="light">Light</sl-radio>
          <sl-radio value="dark">Dark</sl-radio>
          <sl-radio value="system">Follow system setting</sl-radio>
        </sl-radio-group>
      </sl-form-field>

      <h2>About</h2>
      <sl-callout variant="info">
        <h2 slot="title">SLDS Capacitor demo</h2>
        This app demonstrates how to build a native mobile application with
        <a
          href="https://capacitorjs.com"
          target="_blank"
          rel="noopener noreferrer"
          >Capacitor</a
        >
        and the Sanoma Learning design system. The exact same web code runs in
        the browser and inside the iOS app shell.
      </sl-callout>
    `;
  }
}
