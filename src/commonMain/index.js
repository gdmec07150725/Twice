/* 公共main */
import Vue from 'vue';
import IconFont from '@/components/icon-font';
import * as customFilters from '@/utils/filter';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'highlight.js/styles/tomorrow.css'; // highlight.js style
import '@/assets/font/iconfont.css';

Vue.component('icon-font', IconFont); // 全局注册icon组件

// 全局注册过滤器
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key]);
});

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
