import { createApp } from 'vue';
import App from './App.vue';

// window.addEventListener('unhandledrejection', event => {
//   const msg = event.reason?.message;
//   if (typeof msg === 'string' && msg.includes('The message port closed before a response was received')) {
//     event.preventDefault();
//   }
// });

createApp(App).mount('#app');
