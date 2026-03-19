import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import styles from './app.styles.scss.js';

export class App extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return { 'sl-button': Button };
  }

  static styles = styles;

  openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  render(): TemplateResult {
    return html`
      <h1>Hello Lit Demo!</h1>
      <h2>sl-button</h2>
      <sl-button variant="info" size="lg" @click=${this.openBlankPage}>Button</sl-button>
    `;
  }
}

customElements.define('demo-app', App);
