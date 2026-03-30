import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { BreadcrumbsComponent } from '@sl-design-system/angular/breadcrumbs';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, AppRoutingModule, ButtonComponent, BreadcrumbsComponent],
})
export class AppModule {}
