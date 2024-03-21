/*
 * @Author: aFei
 * @Date: 2024-03-21 11:35:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-03-21 13:26:26
*/
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('view/index.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      }
    }
  }
});
export default router;