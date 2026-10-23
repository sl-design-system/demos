import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MonthViewComponent } from '@sl-design-system/angular/calendar';

@Component({
  selector: 'app-month-view-page',
  templateUrl: './sl-month-view.component.html',
  styleUrls: ['./sl-month-view.component.scss'],
  imports: [MonthViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonthViewPageComponent {}
