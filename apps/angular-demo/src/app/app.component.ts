import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { NavItemComponent } from './nav-item.component';
import { NavLinkComponent } from './nav-link.component';
import { TooltipDirective } from '@sl-design-system/angular';
import { SelectComponent } from '@sl-design-system/angular/select';
import { OptionComponent } from '@sl-design-system/angular/listbox';
import { IconComponent } from '@sl-design-system/angular/icon';
import { faCircle, faHexagonNodes, faTriangleExclamation, faSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@sl-design-system/icon';
import { MatButtonModule } from '@angular/material/button';
import { PopoverComponent } from '@sl-design-system/angular/popover';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    ButtonComponent,
    IconComponent,
    TooltipComponent,
    NavItemComponent,
    NavLinkComponent,
    SelectComponent,
    TooltipDirective,
    OptionComponent,
    MatButtonModule,
    PopoverComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  tooltipText = 'I am a tooltip added via directive';
  link = signal('/home');
  label = signal('Go Back');

  @ViewChild('linkEl', { read: ElementRef, static: true })
  private linkEl!: ElementRef;

  @ViewChild('examplePopover', { read: ElementRef, static: true })
  private examplePopover!: ElementRef;

  @ViewChild('popoverEl', { read: ElementRef, static: false })
  private popoverEl!: ElementRef;

  ngOnInit() {
    Icon.register(
      faCircle,
      faHexagonNodes,
      faTriangleExclamation,
      faSquare,
      faArrowLeft,
    );
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.examplePopover.nativeElement.showPopover();
      this.popoverEl.nativeElement.showPopover();
    })
  }

  onPointerover() {
    this.linkEl.nativeElement.focus();
  }

  onPointerout() {
    this.linkEl.nativeElement.blur();
  }

  handleButtonClicked() {
    this.popoverEl.nativeElement.showPopover();
  }

  handleCloseOnboardingPopover() {
    this.popoverEl.nativeElement.hidePopover();
  }
}
