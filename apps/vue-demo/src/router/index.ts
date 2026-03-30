import { createRouter, createWebHistory } from 'vue-router';
import Page1 from '../pages/Page1.vue';
import Page2 from '../pages/Page2.vue';
import Page3 from '../pages/Page3.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/page-1',
    },
    {
      path: '/page-1',
      name: 'page-1',
      component: Page1,
    },
    {
      path: '/page-2',
      name: 'page-2',
      component: Page2,
    },
    {
      path: '/page-3',
      name: 'page-3',
      component: Page3,
    },
  ],
});

export default router;
