import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItemGroup,
} from '@sl-design-system/menu';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';

export class MenuDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
    'sl-menu': Menu,
    'sl-menu-button': MenuButton,
    'sl-menu-item': MenuItem,
    'sl-menu-item-group': MenuItemGroup,
  };

  @state() private lastAction = 'None yet';

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Actions',
        html`
          <sl-menu-button>
            <span slot="button">Actions</span>
            <sl-menu-item @click=${() => (this.lastAction = 'Edit')}>
              Edit
            </sl-menu-item>
            <sl-menu-item @click=${() => (this.lastAction = 'Duplicate')}>
              Duplicate
            </sl-menu-item>
            <sl-menu-item
              variant="danger"
              @click=${() => (this.lastAction = 'Delete')}
            >
              Delete
            </sl-menu-item>
          </sl-menu-button>
          <p class="demo-output">Last action: ${this.lastAction}</p>
        `,
        {
          hint: 'Check where the menu opens near the screen edges, and that tapping outside closes it.',
        },
      )}
      ${demoSection(
        'Icon-only "more" button',
        html`
          <sl-menu-button fill="ghost" aria-label="More options">
            <sl-icon name="ellipsis-vertical" slot="button"></sl-icon>
            <sl-menu-item>Share</sl-menu-item>
            <sl-menu-item>Rename</sl-menu-item>
            <sl-menu-item>Move to…</sl-menu-item>
          </sl-menu-button>
        `,
        { hint: 'The usual overflow menu in a list row or toolbar.' },
      )}
      ${demoSection(
        'Selectable items and a submenu',
        html`
          <sl-menu-button>
            <span slot="button">View</span>
            <sl-menu-item-group heading="Sort by" selects="single">
              <sl-menu-item selectable selected>Name</sl-menu-item>
              <sl-menu-item selectable>Date</sl-menu-item>
              <sl-menu-item selectable>Size</sl-menu-item>
            </sl-menu-item-group>
            <sl-menu-item>
              Export
              <sl-menu slot="submenu">
                <sl-menu-item>PDF</sl-menu-item>
                <sl-menu-item>Spreadsheet</sl-menu-item>
              </sl-menu>
            </sl-menu-item>
          </sl-menu-button>
        `,
        {
          hint: 'Submenus are a desktop pattern; see how they work with touch.',
        },
      )}
    `;
  }
}
