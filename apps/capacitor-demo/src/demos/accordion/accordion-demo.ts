import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Accordion, AccordionItem } from '@sl-design-system/accordion';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class AccordionDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-accordion': Accordion,
    'sl-accordion-item': AccordionItem,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'One open at a time',
        html`
          <sl-accordion single>
            <sl-accordion-item summary="How do I hand in an assignment?" open>
              Open the assignment, add your files and tap Hand in.
            </sl-accordion-item>
            <sl-accordion-item summary="Can I change my answers?">
              Yes, until the deadline. After that, ask your teacher.
            </sl-accordion-item>
            <sl-accordion-item summary="Where do I see my grades?">
              Under Results, on the course page.
            </sl-accordion-item>
          </sl-accordion>
        `,
        { hint: 'Opening one item closes the others.' },
      )}
      ${demoSection(
        'Plus and minus icons',
        html`
          <sl-accordion icon-type="plusminus">
            <sl-accordion-item summary="Chapter 1: Numbers">
              5 lessons, 20 exercises.
            </sl-accordion-item>
            <sl-accordion-item summary="Chapter 2: Fractions">
              7 lessons, 28 exercises.
            </sl-accordion-item>
            <sl-accordion-item summary="Chapter 3: Geometry" disabled>
              Not available yet.
            </sl-accordion-item>
          </sl-accordion>
        `,
      )}
    `;
  }
}
