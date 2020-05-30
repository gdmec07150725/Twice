/* 图片预览组件 */
import PreviewImage from './previewImage.vue';

PreviewImage.install = function(Vue) {
  Vue.component(PreviewImage.name, PreviewImage);
};

export default PreviewImage;
