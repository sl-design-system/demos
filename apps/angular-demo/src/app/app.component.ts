import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
} from '@sl-design-system/angular/accordion';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AccordionComponent, AccordionItemComponent, ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
