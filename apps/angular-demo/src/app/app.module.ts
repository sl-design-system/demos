import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TooltipComponent } from '@sl-design-system/angular/tooltip';
import { TooltipDirective } from '@sl-design-system/angular';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, ButtonComponent, TooltipComponent, TooltipDirective],
})
export class AppModule {}
