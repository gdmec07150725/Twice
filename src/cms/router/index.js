import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './router';
import { getCookie } from '@/utils/utils';
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

  const isLogin = getCookie('isLogin');
  const { name } = to;
  if (isLogin) {
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
      next({ name: 'login' });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
  window.scrollTo(0, 0); // 让页面滚动到顶部
});

export default router;
