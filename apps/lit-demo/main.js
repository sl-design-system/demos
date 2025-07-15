import { LitElement, html, css } from 'lit';

class LitDemo extends LitElement {
  static styles = css`
    h1 {
      color: #4f8cff;
    }
  `;

  render() {
    return html`<h1>Hello LitElement Demo!</h1>`;
  }
}

customElements.define('lit-demo', LitDemo);

