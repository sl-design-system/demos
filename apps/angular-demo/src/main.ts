

import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { setup } from '@sl-design-system/sanoma-learning';
import '@sl-design-system/button/register.js';
import '@sl-design-system/tooltip/register.js';
import '@sl-design-system/breadcrumbs/register.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
  ],
});

setup();
