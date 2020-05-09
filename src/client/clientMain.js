import Vue from 'vue';
import Client from './Client.vue';
import router from './router';
import store from '@/store';
import '@/styles/clientIndex.less'; // 全局样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'highlight.js/styles/tomorrow.css'; // highlight.js style
import '@/assets/font/iconfont.css';
import IconFont from '@/components/icon-font';
import customizeLoading from '@/lib/loading/index.js';
import * as customFilters from '@/utils/filter';

Vue.component('icon-font', IconFont); // 全局注册icon组件

Vue.prototype.$loading = customizeLoading.service;
Vue.prototype.$ELEMENT = { size: 'medium' }; // client端后面后面写了自己的组件之后可以去掉对elementUI的依赖
Vue.config.productionTip = false;

// 全局注册指令
Vue.use(Vue => {
  (requireContext => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach(directive => {
      directive =
        directive.__esModule && directive.default
          ? directive.default
          : directive;
      Object.keys(directive).forEach(key => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('@/directives', false, /^\.\/.*\.js$/));
});

// 全局注册过滤器
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key]);
});

new Vue({
  router,
  store,
  render: h => h(Client),
}).$mount('#client');
