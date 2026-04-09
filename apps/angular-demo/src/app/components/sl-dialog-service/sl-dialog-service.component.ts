import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { DialogRef, DialogService } from '@sl-design-system/angular';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <h1 slot="title">{{ data.title }}</h1>
    <p>{{ data.message }}</p>
    <sl-button slot="primary-actions" (click)="dialogRef.close('cancelled')"
      >Cancel</sl-button
    >
    <sl-button
      slot="primary-actions"
      variant="primary"
      fill="solid"
      (click)="dialogRef.close('confirmed')"
      >Confirm</sl-button
    >
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExampleDialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject('DIALOG_DATA') public data: { title: string; message: string },
  ) {}
}

@Component({
  selector: 'app-dialog-service-page',
  templateUrl: './sl-dialog-service.component.html',
  imports: [ButtonComponent],
})
export class DialogServicePageComponent {
  constructor(private dialogService: DialogService) {}

  openBasicDialog(): void {
    this.dialogService.showModal<ExampleDialogComponent, string>({
      component: ExampleDialogComponent,
      data: { title: 'Dialog', message: 'Dialog message' },
      closeButton: true,
    });
  }

  openNonCancellableDialog(): void {
    this.dialogService.showModal<ExampleDialogComponent, string>({
      component: ExampleDialogComponent,
      data: {
        title: 'Non-cancellable dialog',
        message: 'Non-cancellable dialog message',
      },
      disableCancel: true,
      closeButton: false,
    });
  }
}
