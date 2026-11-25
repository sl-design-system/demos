import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { type TabId, tabs } from '../routes.js';
import styles from './tab-bar.css' with { type: 'css' };

export type TabSelectEvent = CustomEvent<TabId>;

/**
 * Bottom tab bar. SLDS has no bottom navigation component, so this one is
 * built from plain links and SLDS tokens and icons.
 *
 * @fires tab-select - When a tab is tapped, also when it is already active.
 */
export class TabBar extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
  };

  static override styles = styles;

  /** The tab of the current screen. */
  @property() active?: TabId;

  override render(): TemplateResult {
    return html`
      <nav aria-label="Main">
        ${tabs.map(
          (tab) => html`
            <a
              href=${tab.path}
              aria-current=${tab.id === this.active ? 'page' : 'false'}
              @click=${(event: MouseEvent) => this.#onClick(event, tab.id)}
            >
              <span class="indicator"
                ><sl-icon
                  name=${tab.id === this.active ? tab.selectedIcon : tab.icon}
                ></sl-icon
              ></span>
              <span>${tab.label}</span>
            </a>
          `,
        )}
      </nav>
    `;
  }

  #onClick(event: MouseEvent, id: TabId): void {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent<TabId>('tab-select', {
        detail: id,
        bubbles: true,
        composed: true,
      }),
    );
  }
}
