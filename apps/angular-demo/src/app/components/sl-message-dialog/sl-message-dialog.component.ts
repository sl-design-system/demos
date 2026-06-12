import { Component } from '@angular/core';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-message-dialog-page',
  templateUrl: './sl-message-dialog.component.html',
  styleUrls: ['./sl-message-dialog.component.scss'],
  imports: [ButtonComponent],
})
export class MessageDialogPageComponent {
  showAlert(): void {
    void MessageDialog.alert('Test description', 'Test');
  }
}
