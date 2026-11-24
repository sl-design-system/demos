import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { InlineMessage } from '@sl-design-system/inline-message';
import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import pageStyles from '../../styles/page.css' with { type: 'css' };

/**
 * Placeholder for a component's demo page. Each catalog entry gets its own
 * page in the next phase; until then this shows which component was opened.
 */
export class ComponentDetailPage extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-inline-message': InlineMessage,
  };

  static override styles = pageStyles;

  /** Display name of the component. */
  @property() name = '';

  override render(): TemplateResult {
    return html`
      <sl-inline-message variant="info" indismissible>
        The ${this.name} demo is coming soon.
      </sl-inline-message>
    `;
  }
}
