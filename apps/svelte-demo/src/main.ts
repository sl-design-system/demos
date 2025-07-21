import App from './App.svelte';
import '@sl-design-system/button/register.js';
import { setup } from '@sl-design-system/sanoma-learning';
// @import 'slds-sanoma-learning/light.css';
import '@sl-design-system/sanoma-learning'; // TODO: path needs to be fixed????
//import "../../../../node_modules/@sl-design-system/sanoma-learning/light.css";

setup();

const app = new App({
    target: document.body
});

export default app;
