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
  ];
}
