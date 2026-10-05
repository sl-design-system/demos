import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { MenuButton, MenuItem } from '@sl-design-system/menu';
import { ToolBar, ToolBarDivider } from '@sl-design-system/tool-bar';

export class ToolBarPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tool-bar': ToolBar,
    'sl-tool-bar-divider': ToolBarDivider,
    'sl-button': Button,
    'sl-menu-button': MenuButton,
    'sl-menu-item': MenuItem,
  };

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-tool-bar>
        <sl-button>Cut</sl-button>
        <sl-button @click=${this._openBlankPage}>Copy</sl-button>
        <sl-button disabled>Paste</sl-button>

        <sl-tool-bar-divider></sl-tool-bar-divider>

        <sl-menu-button>
          <div slot="button">Edit</div>
          <sl-menu-item>Rename...</sl-menu-item>
          <sl-menu-item @click=${this._openBlankPage}>Delete...</sl-menu-item>
        </sl-menu-button>
      </sl-tool-bar>
    `;
  }
}