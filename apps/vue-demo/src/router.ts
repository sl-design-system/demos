import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/sl-accordion' },
    {
      path: '/sl-accordion',
      component: () => import('./components/sl-accordion.vue'),
    },
    {
      path: '/sl-breadcrumbs',
      component: () => import('./components/sl-breadcrumbs.vue'),
    },
    {
      path: '/sl-button',
      component: () => import('./components/sl-button.vue'),
    },
    {
      path: '/sl-button-bar',
      component: () => import('./components/sl-button-bar.vue'),
    },
    {
      path: '/sl-callout',
      component: () => import('./components/sl-callout.vue'),
    },
  ],
});
