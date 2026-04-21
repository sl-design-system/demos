import '@webcomponents/scoped-custom-element-registry';
import { mount } from 'svelte';
import App from './App.svelte';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';
import '@sl-design-system/accordion/register.js';
import '@sl-design-system/breadcrumbs/register.js';
import '@sl-design-system/callout/register.js';
import '@sl-design-system/checkbox/register.js';
import '@sl-design-system/combobox/register.js';
import '@sl-design-system/dialog/register.js';
import '@sl-design-system/listbox/register.js';
import '@sl-design-system/menu/register.js';
import { setup } from '@sl-design-system/sanoma-learning';

setup();

export default mount(App, {
  target: document.body,
});
