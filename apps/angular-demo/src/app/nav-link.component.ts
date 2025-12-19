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

  @Input() tooltipText?: string;
}

