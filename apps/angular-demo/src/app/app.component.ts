import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { NavItemComponent } from './nav-item.component';
import { NavLinkComponent } from './nav-link.component';
import { TooltipDirective } from '@sl-design-system/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ButtonComponent, TooltipComponent, NavItemComponent, NavLinkComponent, TooltipDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tooltipText = 'I am a tooltip added via directive';
}
