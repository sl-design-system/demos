import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Menu, MenuButton, MenuItem } from '@sl-design-system/menu';

export class MenuPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-menu': Menu,
    'sl-menu-button': MenuButton,
    'sl-menu-item': MenuItem,
  };

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-menu-button>
        <span slot="button">Menu</span>
        <sl-menu-item @click=${this._openBlankPage}>Test 1</sl-menu-item>
        <sl-menu-item>
          Test 2
          <sl-menu slot="submenu">
            <sl-menu-item @click=${this._openBlankPage}>Test 3</sl-menu-item>
          </sl-menu>
        </sl-menu-item>
      </sl-menu-button>
    `;
  }
}
