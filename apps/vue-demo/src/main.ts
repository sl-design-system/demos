import { createApp } from 'vue';
import App from './App.vue';
import './App.css';
import '@sl-design-system/button/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

// window.addEventListener('unhandledrejection', event => {
//   const msg = event.reason?.message;
//   if (typeof msg === 'string' && msg.includes('The message port closed before a response was received')) {
//     event.preventDefault();
//   }
// });

createApp(App).mount('#app');
