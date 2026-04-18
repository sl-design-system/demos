import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Accordion, AccordionItem } from '@sl-design-system/accordion';

export class AccordionPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-accordion': Accordion,
    'sl-accordion-item': AccordionItem,
  };

  override render(): TemplateResult {
    return html`
      <sl-accordion single>
        <sl-accordion-item summary="Test 1"
          >Extended content for Test 1</sl-accordion-item
        >
        <sl-accordion-item summary="Test 2" disabled
          >Extended content for Test 2</sl-accordion-item
        >
      </sl-accordion>
    `;
  }
}
