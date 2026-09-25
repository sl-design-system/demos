import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { DialogComponent } from '@sl-design-system/angular/dialog';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './sl-dialog.component.html',
  styleUrls: ['./sl-dialog.component.scss'],
  imports: [ButtonComponent, DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogPageComponent {
  onClose(): void {
    const dialog = document.querySelector('sl-dialog');
    dialog?.close();
  }
}
