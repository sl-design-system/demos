import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Icon } from '@sl-design-system/icon';
import { Tooltip } from '@sl-design-system/tooltip';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class TooltipDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-icon': Icon,
    'sl-tooltip': Tooltip,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Label for an icon button',
        html`
          <sl-button fill="ghost" tooltip="Search">
            <sl-icon name="search"></sl-icon>
          </sl-button>
          <sl-button fill="ghost" tooltip="Add to favourites">
            <sl-icon name="star"></sl-icon>
          </sl-button>
          <sl-button fill="ghost" tooltip="More options">
            <sl-icon name="ellipsis"></sl-icon>
          </sl-button>
        `,
        {
          hint: 'Tooltips appear on hover and keyboard focus. Phones have no hover, so check what happens on a tap or long press. The tooltip text also serves as the accessible name.',
          layout: 'wrap',
        },
      )}
      ${demoSection(
        'Description',
        html`
          <sl-button id="publish" fill="solid" variant="primary">
            Publish
          </sl-button>
          <sl-tooltip for="publish" type="description">
            Students can see the assignment once it is published.
          </sl-tooltip>
        `,
        { layout: 'wrap' },
      )}
    `;
  }
}
