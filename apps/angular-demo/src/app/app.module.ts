import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { TooltipDirective } from '@sl-design-system/angular';
import { SelectComponent } from '@sl-design-system/angular/select';
import { OptionComponent } from '@sl-design-system/angular/listbox';
import { IconComponent } from '@sl-design-system/angular/icon';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, ButtonComponent, IconComponent, SelectComponent, OptionComponent, TooltipComponent, TooltipDirective],
})
export class AppModule {}
