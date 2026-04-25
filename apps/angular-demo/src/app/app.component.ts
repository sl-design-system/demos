import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  navItems = [
    { path: 'sl-accordion', label: 'sl-accordion' },
    { path: 'sl-breadcrumbs', label: 'sl-breadcrumbs' },
    { path: 'sl-button', label: 'sl-button' },
    { path: 'sl-button-bar', label: 'sl-button-bar' },
    { path: 'sl-callout', label: 'sl-callout' },
    { path: 'sl-checkbox', label: 'sl-checkbox' },
    { path: 'sl-combobox', label: 'sl-combobox' },
    { path: 'sl-dialog', label: 'sl-dialog' },
    { path: 'sl-dialog-service', label: 'sl-dialog-service' },
    { path: 'sl-form-field', label: 'sl-form-field' },
    { path: 'sl-form-reactive', label: 'sl-form (reactive)' },
    { path: 'sl-form-template', label: 'sl-form (template)' },
    { path: 'sl-inline-message', label: 'sl-inline-message' },
    { path: 'sl-menu', label: 'sl-menu' },
    { path: 'sl-popover', label: 'sl-popover' },
  ];
}
