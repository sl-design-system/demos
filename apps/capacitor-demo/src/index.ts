import '@webcomponents/scoped-custom-element-registry';
import { setup } from '@sl-design-system/sanoma-learning';
// Theme and app-wide styles are imported WITHOUT `type: 'css'`, so Vite injects
// them into the document and emits the theme fonts as assets.
import '@sl-design-system/sanoma-learning/fonts.css';
import '@sl-design-system/sanoma-learning/theme.css';
import '@sl-design-system/sanoma-learning/global.css';
import '@sl-design-system/sanoma-learning/typography.css';
import './styles/global.css';
import { App } from './app/app.js';
import { initAppearance } from './app/appearance.js';
import { registerAppIcons } from './app/icons.js';
import { initUserGroup } from './app/user-group.js';
import { preventInputZoomOnIOS } from './native/native.js';

preventInputZoomOnIOS();
setup();
registerAppIcons();
initAppearance();
initUserGroup();

customElements.define('demo-app', App);
