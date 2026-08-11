import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Link } from '@sl-design-system/link';

export class LinkPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-link': Link,
  };

  private _navigate(path: string): void {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  override render(): TemplateResult {
    return html`
      <section>
        <h2>Native anchor</h2>
        <sl-link>
          <a
            href="https://sanomalearning.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Sanoma Learning Design
          </a>
        </sl-link>

        <h2>Lit SPA navigation</h2>
        <sl-link>
          <a
            href="/sl-button"
            @click=${(event: Event) => {
              event.preventDefault();
              this._navigate('/sl-button');
            }}
          >
            Go to sl-button demo
          </a>
        </sl-link>
      </section>
    `;
  }
}
