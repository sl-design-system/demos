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
    {
      path: '/sl-form',
      component: () => import('./components/sl-form/sl-form.vue'),
    },
    {
      path: '/sl-inline-message',
      component: () =>
        import('./components/sl-inline-message/sl-inline-message.vue'),
    },
    {
      path: '/sl-menu',
      component: () => import('./components/sl-menu/sl-menu.vue'),
    },
    {
      path: '/sl-message-dialog',
      component: () =>
        import('./components/sl-message-dialog/sl-message-dialog.vue'),
    },
    {
      path: '/sl-number-field',
      component: () =>
        import('./components/sl-number-field/sl-number-field.vue'),
    },
    {
      path: '/sl-text-area',
      component: () => import('./components/sl-text-area/sl-text-area.vue'),
    },
    {
      path: '/sl-tab-group',
      component: () => import('./components/sl-tab-group/sl-tab-group.vue'),
    },
    {
      path: '/sl-paginator',
      component: () => import('./components/sl-paginator/sl-paginator.vue'),
    },
    {
      path: '/sl-select',
      component: () => import('./components/sl-select/sl-select.vue'),
    },
    {
      path: '/sl-switch',
      component: () => import('./components/sl-switch/sl-switch.vue'),
    },
    {
      path: '/sl-card',
      component: () => import('./components/sl-card/sl-card.vue'),
    },
    {
      path: '/sl-popover',
      component: () => import('./components/sl-popover/sl-popover.vue'),
    },
    {
      path: '/sl-toggle-button',
      component: () =>
        import('./components/sl-toggle-button/sl-toggle-button.vue'),
    },
    {
      path: '/sl-tooltip',
      component: () => import('./components/sl-tooltip/sl-tooltip.vue'),
    },
    {
      path: '/sl-radio-group',
      component: () => import('./components/sl-radio-group/sl-radio-group.vue'),
    },
  ],
});
