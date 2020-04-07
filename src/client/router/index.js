import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
