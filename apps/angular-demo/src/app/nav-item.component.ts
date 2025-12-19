import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {
  @Input() label = 'Nav Item';

  @Input() href = '#';

  @Input() isActive = false;

  @Input() ariaDescribedby?: string;

  onFocus(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.parentElement?.focus();
  }

  onBlur(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.parentElement?.blur();
  }
}

