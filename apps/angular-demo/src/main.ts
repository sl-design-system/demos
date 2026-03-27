import '@webcomponents/scoped-custom-element-registry';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { setup } from '@sl-design-system/sanoma-learning';
import '@sl-design-system/breadcrumbs/register.js';
import '@sl-design-system/callout/register.js';

setup();

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
