import Vue from 'vue';
import Cms from './Cms.vue';
import router from './router';
import store from '@/store';
import '@/commonMain';
import EventBus from '@/lib/eventBus.js';
import '@/styles/cmsIndex.less'; // 全局样式
import 'highlight.js/styles/tomorrow.css';
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
import checkPermission from '@/utils/permission';

Vue.use(Loading.directive); // 使用loading

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

/* 按钮权限控制 */
Vue.directive('permission', {
  // 只调用一次，指令第一次绑定到元素时调用
  bind(el, binding) {
    let permissions = Array.isArray(binding.value)
      ? binding.value
      : [binding.value];
    // 如果不传，默认不控制
    if (permissions.length > 0 && !checkPermission(permissions)) {
      // let classList = el.getAttribute('class')
      // if button
      if (el.type === 'button') {
        // el.disabled = true;
        // el.setAttribute('class', classList + ' is-disabled')
        el.style.display = 'none';
      }
    }
  },
});

new Vue({
  router,
  store,
  render: h => h(Cms),
}).$mount('#cms');
