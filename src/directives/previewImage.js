/* 单张图片的预览 */
export default {
  previewImage: {
    bind: function(el) {
      function clickHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        console.log(e);
      }
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
