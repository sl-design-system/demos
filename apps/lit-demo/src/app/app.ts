import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Breadcrumbs } from '@sl-design-system/breadcrumbs';
import { Accordion, AccordionItem } from '@sl-design-system/accordion';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Callout } from '@sl-design-system/callout';
import styles from './app.styles.scss.js';

export class App extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-breadcrumbs': Breadcrumbs,
      'sl-accordion': Accordion,
      'sl-accordion-item': AccordionItem,
      'sl-button': Button,
      'sl-button-bar': ButtonBar,
      'sl-callout': Callout,
    };
  }

  static styles = styles;

  openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  render(): TemplateResult {
    return html`
      <h1>Hello Lit Demo!</h1>
      <h2>sl-accordion</h2>
      <sl-accordion single>
        <sl-accordion-item summary="Test 1">
          Extended content for Test 1
        </sl-accordion-item>
        <sl-accordion-item summary="Test 2" disabled>
          Extended content for Test 2
        </sl-accordion-item>
      </sl-accordion>
      <h2>sl-breadcrumbs</h2>
      <sl-breadcrumbs>
        <a href="about:blank" target="_blank" rel="noopener noreferrer"
          >Test 1</a
        >
      </sl-breadcrumbs>
      <h2>sl-button</h2>
      <sl-button variant="info" size="lg" @click=${this.openBlankPage}
        >Button</sl-button
      >
      <h2>sl-button-bar</h2>
      <sl-button-bar align="start">
        <sl-button variant="primary" fill="solid" disabled>Test 1</sl-button>
        <sl-button variant="primary" fill="solid" @click=${this.openBlankPage}
          >Test 2</sl-button
        >
      </sl-button-bar>
      <h2>sl-callout</h2>
      <sl-callout variant="info">
        <h2 slot="title">Test title</h2>
        Test description.
        <a href="about:blank" target="_blank" rel="noopener noreferrer"
          >Open link</a
        >
        <sl-button fill="outline" variant="info" @click=${this.openBlankPage}
          >Open page</sl-button
        >
      </sl-callout>
    `;
  }
}

customElements.define('demo-app', App);
