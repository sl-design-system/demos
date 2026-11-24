import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { InlineMessage } from '@sl-design-system/inline-message';
import { Switch } from '@sl-design-system/switch';
import { TextField } from '@sl-design-system/text-field';
import { html, LitElement, type TemplateResult } from 'lit';
import styles from './app.css' with { type: 'css' };

/**
 * Root of the mobile demo. For now this is a single placeholder screen; the
 * tab bar, stack navigation and component catalog follow in later phases.
 */
export class App extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-inline-message': InlineMessage,
    'sl-switch': Switch,
    'sl-text-field': TextField,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <header class="app-header">
        <h1>SL Design System</h1>
      </header>
      <main id="main">
        <sl-inline-message variant="info">
          This app showcases SL Design System components on iOS and Android.
        </sl-inline-message>
        <sl-text-field
          aria-label="Your name"
          placeholder="Your name"
        ></sl-text-field>
        <sl-switch>Notifications</sl-switch>
        <sl-button variant="primary" fill="solid">Get started</sl-button>
      </main>
    `;
  }
}
