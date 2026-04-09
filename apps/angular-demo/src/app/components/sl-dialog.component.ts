import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { DialogComponent } from '@sl-design-system/angular/dialog';

@Component({
  selector: 'app-dialog-page',
  template: `
    <sl-button variant="primary" fill="solid" (click)="dialog.elRef.nativeElement.showModal()">Test</sl-button>
    <sl-dialog #dialog>
      <h1 slot="title">Test title</h1>
      Test description
      <sl-button slot="primary-actions" sl-dialog-close>Close</sl-button>
    </sl-dialog>
  `,
  imports: [ButtonComponent, DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogPageComponent {}
