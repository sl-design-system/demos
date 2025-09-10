import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { PaginatorComponent } from '@sl-design-system/angular/paginator';


@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, ButtonComponent, PaginatorComponent],
})
export class AppModule {}
