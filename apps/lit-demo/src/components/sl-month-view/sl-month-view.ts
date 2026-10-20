import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { MonthView } from '@sl-design-system/calendar';

export class MonthViewPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-month-view': MonthView,
  };

  override render(): TemplateResult {
    return html`
      <sl-month-view></sl-month-view>
    `;
  }
}
