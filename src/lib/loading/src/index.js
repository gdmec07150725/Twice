/* 使用服务式创建自定义loading组件（参考element ui loding） */
import Vue from 'vue';
import loadingVue from './loading.vue';

let instance = '';
let parent = '';
/* 基于loadingVue组件创建子类 */
const LoadingConstructor = Vue.extend(loadingVue);
LoadingConstructor.prototype.originalPosition = '';

/* 定义close方法，关闭loading */
LoadingConstructor.prototype.close = function() {
  // 从父节点移除loading组件
  parent.removeChild(instance.$el);
  // 将loading组件的visible改为false
  instance.visible = false;
};

const addStyle = (options, parent, instance) => {
  const parentStyle = window.getComputedStyle(parent);
  const position = parentStyle.position;
  instance.originalPosition = position;
};

/* loading方法声明,供外部创建loading时调用 */
const Loading = (options = {}) => {
  if (typeof options.target === 'string') {
    // 获取节点
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  parent = options.target;
  instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: {},
  });

  addStyle(options, parent, instance);
  if (
    instance.originalPosition === 'absolute' ||
    instance.originalPosition === 'relative'
  ) {
    parent.style.position = instance.originalPosition;
  } else {
    parent.style.position = 'relative';
  }
  // 将loading的DOM插入到父节点
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  return instance;
};

export default Loading;
