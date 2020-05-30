/* 单张图片的预览 */
import Vue from 'vue';
import previewImageVue from '@/lib/previewImage/previewImage.vue';

const PreviewImageConstructor = Vue.extend(previewImageVue);

function clickHandler(e) {
  // 这里判断点击的元素是否是本身，是本身，则返回
  console.log('e', e);
  if (e.target.tagName === 'IMG') {
    // 获取图片URL
    const imgSrc = e.target.src;
    let instance = new PreviewImageConstructor({
      el: document.createElement('div'),
      data: {},
    });
    console.log('instance', instance);
    instance.handleImageDetail(imgSrc);
    instance.handleOpenPreview();
    window.document.body.appendChild(instance.$el);
  }
}
export default {
  previewImage: {
    bind: function(el) {
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickToView__ = clickHandler;
      el.addEventListener('click', clickHandler);
    },
    unbind: function(el) {
      // 解除事件监听
      el.removeEventListener('click', el.__vueClickToView__);
      delete el.__vueClickToView__;
    },
  },
};
