import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Badge } from '@sl-design-system/badge';
import { Icon } from '@sl-design-system/icon';
import { html, LitElement, type TemplateResult } from 'lit';
import { catalog } from '../../catalog.js';
import listStyles from '../../styles/list.css' with { type: 'css' };
import pageStyles from '../../styles/page.css' with { type: 'css' };

/**
 * The component catalog: a grouped list linking to one page per component.
 * Each group title shows how many components the group has.
 */
export class ComponentsPage extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-badge': Badge,
    'sl-icon': Icon,
  };

  static override styles = [pageStyles, listStyles];

  override render(): TemplateResult {
    return html`
      ${catalog.map((group) => {
        // IDs can't contain spaces ("Data display").
        const id = `group-${group.title.toLowerCase().replaceAll(' ', '-')}`;
        return html`
          <section class="group" aria-labelledby=${id}>
            <h2 class="group-title" id=${id}>
              ${group.title}
              <!-- The badge is decoration; the hidden text gives screen readers the count with its meaning. -->
              <sl-badge aria-hidden="true">${group.items.length}</sl-badge>
              <span class="visually-hidden">
                , ${group.items.length} components
              </span>
            </h2>
            <ul class="list">
              ${group.items.map(
                (item) => html`
                  <li>
                    <a class="row" href="/components/${item.slug}">
                      <span class="row-label">${item.name}</span>
                      <sl-icon name="chevron-right"></sl-icon>
                    </a>
                  </li>
                `,
              )}
            </ul>
          </section>
        `;
      })}
    `;
  }
}
