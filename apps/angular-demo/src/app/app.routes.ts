import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sl-accordion', pathMatch: 'full' },
  {
    path: 'sl-accordion',
    loadComponent: () =>
      import('./components/sl-accordion/sl-accordion.component').then(
        (m) => m.AccordionPageComponent,
      ),
  },
  {
    path: 'sl-breadcrumbs',
    loadComponent: () =>
      import('./components/sl-breadcrumbs/sl-breadcrumbs.component').then(
        (m) => m.BreadcrumbsPageComponent,
      ),
  },
  {
    path: 'sl-button',
    loadComponent: () =>
      import('./components/sl-button/sl-button.component').then(
        (m) => m.ButtonPageComponent,
      ),
  },
  {
    path: 'sl-button-bar',
    loadComponent: () =>
      import('./components/sl-button-bar/sl-button-bar.component').then(
        (m) => m.ButtonBarPageComponent,
      ),
  },
  {
    path: 'sl-callout',
    loadComponent: () =>
      import('./components/sl-callout/sl-callout.component').then(
        (m) => m.CalloutPageComponent,
      ),
  },
  {
    path: 'sl-checkbox',
    loadComponent: () =>
      import('./components/sl-checkbox/sl-checkbox.component').then(
        (m) => m.CheckboxPageComponent,
      ),
  },
  {
    path: 'sl-combobox',
    loadComponent: () =>
      import('./components/sl-combobox/sl-combobox.component').then(
        (m) => m.ComboboxPageComponent,
      ),
  },
  {
    path: 'sl-dialog',
    loadComponent: () =>
      import('./components/sl-dialog/sl-dialog.component').then(
        (m) => m.DialogPageComponent,
      ),
  },
  {
    path: 'sl-dialog-service',
    loadComponent: () =>
      import('./components/sl-dialog-service/sl-dialog-service.component').then(
        (m) => m.DialogServicePageComponent,
      ),
  },
  {
    path: 'sl-form-field',
    loadComponent: () =>
      import('./components/sl-form-field/sl-form-field.component').then(
        (m) => m.FormFieldPageComponent,
      ),
  },
  {
    path: 'sl-form-reactive',
    loadComponent: () =>
      import('./components/sl-form-reactive/sl-form-reactive.component').then(
        (m) => m.FormReactivePageComponent,
      ),
  },
  {
    path: 'sl-form-template',
    loadComponent: () =>
      import('./components/sl-form-template/sl-form-template.component').then(
        (m) => m.FormTemplatePageComponent,
      ),
  },
  {
    path: 'sl-inline-message',
    loadComponent: () =>
      import('./components/sl-inline-message/sl-inline-message.component').then(
        (m) => m.InlineMessagePageComponent,
      ),
  },
  {
    path: 'sl-menu',
    loadComponent: () =>
      import('./components/sl-menu/sl-menu.component').then(
        (m) => m.MenuPageComponent,
      ),
  },
  {
    path: 'sl-select',
    loadComponent: () =>
      import('./components/sl-select/sl-select.component').then(
        (m) => m.SelectPageComponent,
      ),
  },
];
