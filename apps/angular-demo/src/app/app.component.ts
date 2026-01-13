import {
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tooltipText = 'I am a tooltip added via directive';
  link = signal('/home');
  label = signal('Go Back');

  @ViewChild('linkEl' , {read: ElementRef, static: true}) private linkEl! : ElementRef;

  ngOnInit() {
    Icon.register(faCircle, faHexagonNodes, faTriangleExclamation, faSquare, faArrowLeft);
  }

  onPointerover() {
    this.linkEl.nativeElement.focus();
  }

  onPointerout() {
    this.linkEl.nativeElement.blur();
  }
}
