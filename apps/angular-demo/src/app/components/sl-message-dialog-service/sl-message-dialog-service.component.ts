import { Component, Inject } from '@angular/core';
import { MessageDialogService } from '@sl-design-system/angular';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  standalone: true,
  template: `<p>Custom component data: {{ data }}</p>`,
})
export class ExampleMessageDialogComponent {
  constructor(@Inject('MESSAGE_DIALOG_DATA') public data: string) {}
}

@Component({
  selector: 'app-message-dialog-service-page',
  templateUrl: './sl-message-dialog-service.component.html',
  imports: [ButtonComponent],
})
export class MessageDialogServicePageComponent {
  constructor(private messageDialogService: MessageDialogService) {}

  async showAlert(): Promise<void> {
    await this.messageDialogService.alert('Test description', 'Test');
  }

  showModal(): void {
    const dialogRef = this.messageDialogService.showModal<
      ExampleMessageDialogComponent,
      string
    >({
      component: ExampleMessageDialogComponent,
      data: 'Hello from MessageDialogService!',
      title: 'Test',
      buttons: [
        { text: 'Cancel', fill: 'ghost', value: 'cancel' },
        { text: 'OK', variant: 'primary', autofocus: true, value: 'ok' },
      ],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
