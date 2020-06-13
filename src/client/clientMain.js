import Vue from 'vue';
import Client from './Client.vue';
import router from './router';
import store from '@/store';
import '@/commonMain';
import '@/styles/clientIndex.less'; // 全局样式
import customizeLoading from '@/lib/loading/index.js';
import PreviewImage from '@/lib/previewImage';

Vue.prototype.$loading = customizeLoading.service;
Vue.prototype.$ELEMENT = { size: 'medium' }; // client端后面后面写了自己的组件之后可以去掉对elementUI的依赖
Vue.config.productionTip = false;

/* 全局注册图片预览组件 */
Vue.use(PreviewImage);

new Vue({
  router,
  store,
  render: h => h(Client),
}).$mount('#client');
