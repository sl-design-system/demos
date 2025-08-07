import { createApp } from 'vue';
import App from './App.vue';
import './app.css';
import '@sl-design-system/button/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

createApp(App).mount('#app');
