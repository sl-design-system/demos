import { Component } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './sl-tooltip.component.html',
  styleUrls: ['./sl-tooltip.component.scss'],
  imports: [ButtonComponent, TooltipComponent],
})
export class TooltipPageComponent {}
