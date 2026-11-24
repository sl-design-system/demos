import { Component } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { BadgeComponent } from '@sl-design-system/angular/badge';
import { IconComponent } from '@sl-design-system/angular/icon';
import { PanelComponent } from '@sl-design-system/angular/panel';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { ToolBarComponent } from '@sl-design-system/angular/tool-bar';

@Component({
  selector: 'app-panel-page',
  templateUrl: './sl-panel.component.html',
  styleUrls: ['./sl-panel.component.scss'],
  imports: [PanelComponent, ButtonComponent, BadgeComponent, IconComponent, TooltipComponent, ToolBarComponent],
})
export class PanelPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
