import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { NavItemComponent } from './nav-item.component';
import { TooltipDirective } from '@sl-design-system/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ButtonComponent, TooltipComponent, NavItemComponent, TooltipDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
