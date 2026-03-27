import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
} from '@sl-design-system/angular/accordion';

@Component({
  selector: 'app-accordion-page',
  template: `
    <sl-accordion single>
      <sl-accordion-item summary="Test 1"
        >Extended content for Test 1</sl-accordion-item
      >
      <sl-accordion-item summary="Test 2" [disabled]="true"
        >Extended content for Test 2</sl-accordion-item
      >
    </sl-accordion>
  `,
  imports: [AccordionComponent, AccordionItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionPageComponent {}
