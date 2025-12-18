import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '@sl-design-system/angular';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})
export class NavLinkComponent {
  @Input() label = 'Nav Link';
  @Input() href = '#';
  @Input() isActive = false;
  @Input() ariaDescribedby?: string;
  @Input() slTooltip?: string;

  // TODO: add polyfill import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js'; to get the directive working

  // onFocus(event: FocusEvent) {
  //   console.log('Focus event:', event, event.detail);
  //   const target = event.target as HTMLElement;
  //   target.parentElement?.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
  // }
  //
  // onBlur(event: FocusEvent) {
  //   const target = event.target as HTMLElement;
  //   target.parentElement?.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  // }
}

