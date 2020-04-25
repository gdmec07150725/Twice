import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './router';
import storage from '@/utils/storage';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(Router);

let router = new Router({
  routes: [...routes],
  linkActiveClass: 'active',
});

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  const isLogin = Number(storage.getLogin());
  const refreshToken = storage.getRefreshToken();
  const { name } = to;
  if (isLogin && refreshToken && refreshToken.isValid()) {
    if (!store.state.cmsRouter.hasGetRules) {
      // generate accessible routes map based on roles
      const routers = await store.dispatch('concatRoutes');
      router.addRoutes(routers); // 动态挂载路由
      next({ ...to, replace: true });
    }
    if (name === 'login') {
      next({ name: 'workplace' });
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
  // finish progress bar
  NProgress.done();
  window.scrollTo(0, 0); // 让页面滚动到顶部
});

export default router;
