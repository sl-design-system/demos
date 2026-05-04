import '@webcomponents/scoped-custom-element-registry';
import './app/app.ts';
import { setup } from '@sl-design-system/sanoma-learning';
import appStyles from './app/app.styles.scss.js';

setup();

// Make theme CSS vars available on :root so elements appended to document.body
// (e.g. sl-message-dialog opened via MessageDialog.alert()) can access them.
// app.styles.scss.js contains the same vars as light.css but scoped to :host.
const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(appStyles.cssText.replace(/:host\b/g, ':root'));
document.adoptedStyleSheets = [...document.adoptedStyleSheets, globalSheet];
