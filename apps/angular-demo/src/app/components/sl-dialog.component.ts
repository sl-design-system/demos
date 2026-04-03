import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { DialogComponent } from '@sl-design-system/angular/dialog';

@Component({
  selector: 'app-dialog-page',
  template: `
    <sl-button #testBtn variant="primary" fill="solid">Test</sl-button>
    <sl-dialog #dialog>
      <h1 slot="title">Test title</h1>
      Test description
      <sl-button slot="primary-actions" sl-dialog-close>Close</sl-button>
    </sl-dialog>
  `,
  imports: [ButtonComponent, DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogPageComponent implements AfterViewInit {
  @ViewChild('testBtn', { read: ElementRef }) testBtn!: ElementRef;
  @ViewChild('dialog', { read: ElementRef }) dialog!: ElementRef;

  ngAfterViewInit(): void {
    this.testBtn.nativeElement.addEventListener('click', () => {
      this.dialog.nativeElement.showModal();
    });
  }
}
