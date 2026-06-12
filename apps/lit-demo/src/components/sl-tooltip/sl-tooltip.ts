import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Tooltip } from '@sl-design-system/tooltip';

export class TooltipPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-tooltip': Tooltip,
  };

  override render(): TemplateResult {
    return html`
      <div class="tooltip-example">
        <sl-button aria-describedby="tooltip" variant="primary"
          >Button</sl-button
        >
        <sl-tooltip id="tooltip" position="top">
          This is the tooltip message
        </sl-tooltip>
      </div>
    `;
  }
}
