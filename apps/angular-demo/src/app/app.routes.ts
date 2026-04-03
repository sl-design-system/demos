import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sl-accordion', pathMatch: 'full' },
  {
    path: 'sl-accordion',
    loadComponent: () =>
      import('./components/sl-accordion.component').then(
        (m) => m.AccordionPageComponent,
      ),
  },
  {
    path: 'sl-breadcrumbs',
    loadComponent: () =>
      import('./components/sl-breadcrumbs.component').then(
        (m) => m.BreadcrumbsPageComponent,
      ),
  },
  {
    path: 'sl-button',
    loadComponent: () =>
      import('./components/sl-button.component').then(
        (m) => m.ButtonPageComponent,
      ),
  },
  {
    path: 'sl-button-bar',
    loadComponent: () =>
      import('./components/sl-button-bar.component').then(
        (m) => m.ButtonBarPageComponent,
      ),
  },
  {
    path: 'sl-callout',
    loadComponent: () =>
      import('./components/sl-callout.component').then(
        (m) => m.CalloutPageComponent,
      ),
  },
  {
    path: 'sl-checkbox',
    loadComponent: () =>
      import('./components/sl-checkbox.component').then(
        (m) => m.CheckboxPageComponent,
      ),
  },
  {
    path: 'sl-combobox',
    loadComponent: () =>
      import('./components/sl-combobox.component').then(
        (m) => m.ComboboxPageComponent,
      ),
  },
  {
    path: 'sl-dialog',
    loadComponent: () =>
      import('./components/sl-dialog.component').then(
        (m) => m.DialogPageComponent,
      ),
  },
];
