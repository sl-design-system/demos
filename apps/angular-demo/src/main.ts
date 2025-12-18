import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { setup } from '@sl-design-system/sanoma-learning';
import '@sl-design-system/button/register.js';

setup();

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));

