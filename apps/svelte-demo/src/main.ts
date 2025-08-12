import { mount } from 'svelte';
import App from './App.svelte';
import '@sl-design-system/button/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

export default mount(App, {
  target: document.body,
});
