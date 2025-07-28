import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ButtonComponent} from "@sl-design-system/angular/button";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        ButtonComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrls: ['./app.component.css']
})
export class AppComponent {}
