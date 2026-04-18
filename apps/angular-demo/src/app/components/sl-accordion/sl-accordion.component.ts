import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
} from '@sl-design-system/angular/accordion';

@Component({
  selector: 'app-accordion-page',
  templateUrl: './sl-accordion.component.html',
  imports: [AccordionComponent, AccordionItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionPageComponent {}
