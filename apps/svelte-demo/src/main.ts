import { mount } from "svelte";
import App from './App.svelte';
import '@sl-design-system/button/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

// const app = new App({
//   target: document.body,
// });
//
// export default app;

export default mount(App, {
  target: document.body,
});
