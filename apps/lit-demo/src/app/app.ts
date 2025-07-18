import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import { type ScopedElementsMap, ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
// import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { styles } from './app.styles';
// import { Button } from '@sanomalearning/slds-core/button';
import { Button } from '@sl-design-system/button';
// import {ScopedElementsMap} from "@open-wc/scoped-elements/types.js";

export class App extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button
    };
  }

  static styles: CSSResultGroup = styles;

  render(): TemplateResult {
    return html`
      <h1>Hello Lit Demo!</h1>
      <sl-button>Button</sl-button>
    `;
  }
}

customElements.define('demo-app', App);
