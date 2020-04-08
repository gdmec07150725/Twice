import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './router';
import storage from '@/utils/storage';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const isLogin = Number(storage.getLogin());
  const { name } = to;
  if (isLogin) {
    // 现在暂时用cms的后面需要改成client的
    if (!store.state.cmsRouter.hasGetRules) {
      // generate accessible routes map based on roles
      const routers = await store.dispatch('concatRoutes');
      router.addRoutes(routers); // 动态挂载路由
      next({ ...to, replace: true });
    }
    if (name === 'login') {
      next({ name: 'home' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (name === 'login') {
      next();
      NProgress.done();
    } else {
      if (to.path !== '/') {
        if (!Object.keys(to.query) > 0) {
          next({ name: 'login', query: { redirect: to.path } });
          NProgress.done();
        } else {
          next({ name: 'login', query: { redirect: to.path, ...to.query } });
          NProgress.done();
        }
      } else {
        next({ name: 'login' });
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
