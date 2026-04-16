import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InlineMessageComponent } from '@sl-design-system/angular/inline-message';

@Component({
  selector: 'app-inline-message-page',
  templateUrl: './sl-inline-message.component.html',
  imports: [InlineMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InlineMessagePageComponent {}
