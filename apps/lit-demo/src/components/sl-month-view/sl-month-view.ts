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
      <sl-month-view disabled-dates="2026-10-06T00:00:00.000"></sl-month-view>
    `;
  }
}
