import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import '@sl-design-system/popover/register.js';

@Component({
  selector: 'app-popover-page',
  templateUrl: './sl-popover.component.html',
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopoverPageComponent {
  togglePopover(): void {
    const popover = document.querySelector('sl-popover') as HTMLElement | null;
    (popover as any)?.togglePopover();
  }
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
