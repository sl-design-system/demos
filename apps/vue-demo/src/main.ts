import '@webcomponents/scoped-custom-element-registry';
import { createApp } from 'vue';
import App from './App.vue';
import './app.css';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';
import '@sl-design-system/accordion/register.js';
import '@sl-design-system/breadcrumbs/register.js';
import '@sl-design-system/callout/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

createApp(App).mount('#app');
