import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TextAreaComponent } from '@sl-design-system/angular/text-area';

@Component({
  selector: 'app-text-area-page',
  templateUrl: './sl-text-area.component.html',
  styleUrls: ['./sl-text-area.component.scss'],
  imports: [TextAreaComponent],
})
export class TextAreaPageComponent {}
