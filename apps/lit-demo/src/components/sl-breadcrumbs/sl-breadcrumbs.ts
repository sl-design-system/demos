import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Breadcrumbs } from '@sl-design-system/breadcrumbs';

export class BreadcrumbsPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-breadcrumbs': Breadcrumbs,
  };

  override render(): TemplateResult {
    return html`
      <sl-breadcrumbs>
        <a href="about:blank" target="_blank" rel="noopener noreferrer"
          >Test 1</a
        >
      </sl-breadcrumbs>
    `;
  }
}
