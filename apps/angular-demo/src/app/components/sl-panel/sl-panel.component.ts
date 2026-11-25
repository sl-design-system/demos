import { Component } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { BadgeComponent } from '@sl-design-system/angular/badge';
import { IconComponent } from '@sl-design-system/angular/icon';
import { PanelComponent } from '@sl-design-system/angular/panel';

@Component({
  selector: 'app-panel-page',
  templateUrl: './sl-panel.component.html',
  styleUrls: ['./sl-panel.component.scss'],
  imports: [PanelComponent, ButtonComponent, BadgeComponent, IconComponent],
})
export class PanelPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
