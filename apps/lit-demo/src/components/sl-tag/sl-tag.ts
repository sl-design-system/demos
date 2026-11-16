import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Tag } from '@sl-design-system/tag';
import { TagList } from '@sl-design-system/tag';
import styles from './sl-tag.scss.js';

export class TagPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tag': Tag,
    'sl-tag-list': TagList,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <sl-tag-list class="tags" aria-label="Subjects">
        <sl-tag removable>Mathematics</sl-tag>
        <sl-tag removable>Physics</sl-tag>
        <sl-tag ?disabled=${true} removable>Chemistry</sl-tag>
      </sl-tag-list>
    `;
  }
}
