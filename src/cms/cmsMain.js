import Vue from 'vue';
import Cms from './Cms.vue';
import router from './router';
import store from '@/store';
import EventBus from '@/lib/eventBus.js';
import '@/styles/cmsIndex.less'; // 全局样式
import '@/assets/font/iconfont.css';
import 'highlight.js/styles/tomorrow.css';
import * as customFilters from '@/utils/filter';
import IconFont from '_c/icon-font';
import editButton from '_c/Button/editButton.vue';
import deleteButton from '_c/Button/deleteButton.vue';
import primaryButton from '_c/Button/primaryButton.vue';
import successButton from '_c/Button/successButton.vue';
import {
  Loading,
  MessageBox,
  Message,
  Notification,
  Popover,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
} from 'element-ui';

Vue.use(Loading.directive); // 使用loading

Vue.component('icon-font', IconFont); // 全局注册icon组件
Vue.component('edit-button', editButton);
Vue.component('delete-button', deleteButton);
Vue.component('primary-button', primaryButton);
Vue.component('success-button', successButton);
Vue.component('Popover', Popover); // for jsx
Vue.component('customeInput', Input); // for jsx
Vue.component('customeCheckbox', Checkbox); // for jsx
Vue.component('customeCheckboxGroup', CheckboxGroup); // for jsx
Vue.component('customeButton', Button); // for jsx

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$bus = EventBus;
Vue.prototype.$ELEMENT = { size: 'medium' }; // 全局element-ui配置

Vue.config.productionTip = false;

// 全局注册过滤器
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key]);
});

new Vue({
  router,
  store,
  render: h => h(Cms),
}).$mount('#cms');
