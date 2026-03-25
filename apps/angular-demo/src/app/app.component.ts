import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
} from '@sl-design-system/angular/accordion';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    ButtonComponent,
    ButtonBarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
