import { html, LitElement, type PropertyValues, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Popover } from '@sl-design-system/popover';

export class PopoverPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-popover': Popover,
  };

  private _popover?: Popover;

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._popover = this.renderRoot.querySelector('sl-popover') as Popover;
  }

  private _togglePopover(): void {
    this._popover?.togglePopover();
  }

  override render(): TemplateResult {
    return html`
      <sl-button id="popover-anchor" @click=${() => this._togglePopover()}>Show more information</sl-button>
      <sl-popover anchor="popover-anchor" aria-label="test title">
        <h2>test title</h2>
        <p>test description</p>
      </sl-popover>
    `;
  }
}
