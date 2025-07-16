import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';

export class App extends LitElement {
  static styles: CSSResultGroup = css`
    h1 {
      color: #1976d2;
    }
  `;

  render(): TemplateResult {
    return html`
      <h1>Hello Lit Demo!</h1>
    `;
  }
}

customElements.define('demo-app', App);

