import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Calendar } from '@sl-design-system/calendar';

export class CalendarPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-calendar': Calendar,
  };

  override render(): TemplateResult {
    return html`
      <sl-calendar disabled-dates="2026-10-06T00:00:00.000"></sl-calendar>
    `;
  }
}
