import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'View',
      component: () => import('../views/ViewTable.vue')
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('../views/EditTable.vue')
    }
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('../views/NotFound.vue')
    // }
  ]
});

export default router;
