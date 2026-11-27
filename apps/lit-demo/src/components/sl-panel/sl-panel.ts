import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Badge } from '@sl-design-system/badge';
import { Button } from '@sl-design-system/button';
import { Panel } from '@sl-design-system/panel';
import { Icon } from '@sl-design-system/icon';
import styles from './sl-panel.scss.js';

export class PanelPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-badge': Badge,
    'sl-button': Button,
    'sl-panel': Panel,
    'sl-icon': Icon,
  };

  static override styles = styles;

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-panel heading="Panel Title" collapsible>
        <sl-button slot="actions" tooltip="Pinata" fill="ghost"
          ><sl-icon name="pinata"></sl-icon
        ></sl-button>
        <sl-button slot="actions" tooltip="Smile" fill="ghost"
          ><sl-icon name="face-smile"></sl-icon
        ></sl-button>
        <sl-button
          slot="actions"
          tooltip="Warning"
          fill="ghost"
          @click=${this._openBlankPage}
          ><sl-icon name="triangle-exclamation-solid"></sl-icon
        ></sl-button>

        <sl-badge slot="suffix" emphasis="subtle" size="lg" variant="info"
          >suffix</sl-badge
        >
        <span>Collapsible panel content</span>
      </sl-panel>
    `;
  }
}
