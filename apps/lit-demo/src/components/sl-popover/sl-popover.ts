import { html, LitElement, TemplateResult } from 'lit';
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

  private _togglePopover(): void {
    this.shadowRoot?.querySelector('sl-popover')?.togglePopover();
  }

  override render(): TemplateResult {
    return html`
      <sl-button id="popover-trigger" @click=${this._togglePopover} variant="primary">Toggle Popover</sl-button>
      <sl-popover anchor="popover-trigger" position="bottom">I'm a popover example</sl-popover>
    `;
  }
}
