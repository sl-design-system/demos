import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/sl-accordion' },
    {
      path: '/sl-accordion',
      component: () => import('./components/sl-accordion/sl-accordion.vue'),
    },
    {
      path: '/sl-breadcrumbs',
      component: () => import('./components/sl-breadcrumbs/sl-breadcrumbs.vue'),
    },
    {
      path: '/sl-button',
      component: () => import('./components/sl-button/sl-button.vue'),
    },
    {
      path: '/sl-button-bar',
      component: () => import('./components/sl-button-bar/sl-button-bar.vue'),
    },
    {
      path: '/sl-callout',
      component: () => import('./components/sl-callout/sl-callout.vue'),
    },
    {
      path: '/sl-checkbox',
      component: () => import('./components/sl-checkbox/sl-checkbox.vue'),
    },
    {
      path: '/sl-combobox',
      component: () => import('./components/sl-combobox/sl-combobox.vue'),
    },
    {
      path: '/sl-dialog',
      component: () => import('./components/sl-dialog/sl-dialog.vue'),
    },
    {
      path: '/sl-form-field',
      component: () => import('./components/sl-form-field/sl-form-field.vue'),
    },
  ],
});
