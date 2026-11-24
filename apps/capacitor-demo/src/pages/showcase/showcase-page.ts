import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import { html, LitElement, type TemplateResult } from 'lit';
import { showcaseScreens } from '../../showcase/screens.js';
import listStyles from '../../styles/list.css' with { type: 'css' };
import pageStyles from '../../styles/page.css' with { type: 'css' };
import styles from './showcase-page.css' with { type: 'css' };

/** Lists the showcase screens. */
export class ShowcasePage extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
  };

  static override styles = [pageStyles, listStyles, styles];

  override render(): TemplateResult {
    return html`
      <p class="intro">
        Complete screens that combine SL Design System components the way a real
        app would.
      </p>
      <ul class="list">
        ${showcaseScreens.map(
          (screen) => html`
            <li>
              <a class="row" href="/showcase/${screen.slug}">
                <span class="row-label">
                  <span class="name">${screen.name}</span>
                  <span class="description">${screen.description}</span>
                </span>
                <sl-icon name="chevron-right"></sl-icon>
              </a>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
