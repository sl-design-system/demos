import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Tag } from '@sl-design-system/tag';
import { Button } from '@sl-design-system/button';

export class TagPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tag': Tag,
    'sl-button': Button,
  };

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-tag-group>
        <sl-tag removable>Mathematics</sl-tag>
        <sl-tag removable>Physics</sl-tag>
        <sl-tag ?disabled=${true} removable>Chemistry</sl-tag>
      </sl-tag-group>
    `;
  }
}
