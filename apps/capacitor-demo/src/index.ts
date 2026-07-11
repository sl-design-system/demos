import '@webcomponents/scoped-custom-element-registry';
import './app/app.ts';
import { setup } from '@sl-design-system/sanoma-learning';
import { themeManager } from './theme.js';

setup();

// Determine the persisted (or system) theme before the app renders, so
// there is no flash of the wrong theme on startup.
void themeManager.init();
