import { Component, ElementRef, signal, ViewChild } from '@angular/core';
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
  @ViewChild('panel', { read: ElementRef })
  panel!: ElementRef<HTMLElement & { hasActions: boolean; updateComplete: Promise<boolean> }>;

  readonly actionsReady = signal(false);

  async ngAfterViewInit(): Promise<void> {
    this.panel.nativeElement.hasActions = true;
    await this.panel.nativeElement.updateComplete;
    this.actionsReady.set(true);
  }

  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
