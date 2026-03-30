import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { navigateToDirective } from './directives/navigateTo';
import './app.css';
import '@sl-design-system/badge/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/breadcrumbs/register.js';
import { setup } from '@sl-design-system/sanoma-learning';
import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';

setup();

const app = createApp(App);
app.use(router);
app.directive('navigateTo', navigateToDirective);
app.mount('#app');
