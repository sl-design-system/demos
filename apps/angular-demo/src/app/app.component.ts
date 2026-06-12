import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navItems = [
    { path: 'sl-accordion', label: 'sl-accordion' },
    { path: 'sl-breadcrumbs', label: 'sl-breadcrumbs' },
    { path: 'sl-button', label: 'sl-button' },
    { path: 'sl-button-bar', label: 'sl-button-bar' },
    { path: 'sl-callout', label: 'sl-callout' },
    { path: 'sl-card', label: 'sl-card' },
    { path: 'sl-checkbox', label: 'sl-checkbox' },
    { path: 'sl-combobox', label: 'sl-combobox' },
    { path: 'sl-dialog', label: 'sl-dialog' },
    { path: 'sl-dialog-service', label: 'sl-dialog-service' },
    { path: 'sl-form-field', label: 'sl-form-field' },
    { path: 'sl-form-reactive', label: 'sl-form (reactive)' },
    { path: 'sl-form-template', label: 'sl-form (template)' },
    { path: 'sl-inline-message', label: 'sl-inline-message' },
    { path: 'sl-menu', label: 'sl-menu' },
    { path: 'sl-message-dialog', label: 'sl-message-dialog' },
    { path: 'sl-message-dialog-service', label: 'sl-message-dialog-service' },
    { path: 'sl-number-field', label: 'sl-number-field' },
    { path: 'sl-text-area', label: 'sl-text-area' },
    { path: 'sl-tab-group', label: 'sl-tab-group' },
    { path: 'sl-paginator', label: 'sl-paginator' },
    { path: 'sl-select', label: 'sl-select' },
    { path: 'sl-switch', label: 'sl-switch' },
    { path: 'sl-popover', label: 'sl-popover' },
    { path: 'sl-tooltip', label: 'sl-tooltip' },
    { path: 'sl-radio-group-reactive', label: 'sl-radio-group (reactive)' },
    { path: 'sl-radio-group-template', label: 'sl-radio-group (template)' },
  ];

  // simple collapsed state for nav toggle in template
  navCollapsed = false;
}
