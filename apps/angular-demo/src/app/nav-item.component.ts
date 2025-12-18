import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TooltipDirective } from '@sl-design-system/angular';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule/*, TooltipDirective*/],
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {
  @Input() label = 'Nav Item';
  @Input() href = '#';
  @Input() isActive = false;
  @Input() ariaDescribedby?: string;
  // @Input() slTooltip?: string;

  onFocus(event: FocusEvent) {
    console.log('Focus event:', event, event.detail);
    const target = event.target as HTMLElement;
    target.parentElement?.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
  }

  onBlur(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.parentElement?.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  }
}

