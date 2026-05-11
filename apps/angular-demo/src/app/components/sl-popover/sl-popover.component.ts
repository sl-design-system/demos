import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import '@sl-design-system/popover/register.js';

@Component({
  selector: 'app-popover-page',
  templateUrl: './sl-popover.component.html',
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopoverPageComponent {
  @ViewChild('popover', { read: ElementRef }) popover!: ElementRef;

  togglePopover(): void {
    (this.popover.nativeElement as any).togglePopover();
  }
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
