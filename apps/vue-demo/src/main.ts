import '@webcomponents/scoped-custom-element-registry';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './app.css';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';
import '@sl-design-system/accordion/register.js';
import '@sl-design-system/breadcrumbs/register.js';
import '@sl-design-system/callout/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('sl-');
app.use(router).mount('#app');
