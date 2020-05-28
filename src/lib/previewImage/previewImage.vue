<template>
  <div id="outer-div" v-if="visible" @click="handleClosePreview">
    <div id="inner-div" :style="{ top: innerTop, left: innerLeft }">
      <img
        id="big-img"
        :src="imgSrc"
        ref="imgRef"
        :width="imgWidth"
        :height="imgHeight"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'previewImage',
  data() {
    return {
      visible: false,
      imgSrc: '',
      imgWidth: '',
      imgHeight: '',
      innerLeft: '',
      innerTop: '',
    };
  },
  methods: {
    handleOpenPreview(imgSrc) {
      if (imgSrc) {
        this.imgSrc = imgSrc;
        const that = this;
        let Img = new Image();
        Img.src = imgSrc;
        Img.setAttribute('crossOrigin', 'anonymous'); // 设置图片的跨域问题
        Img.onload = function() {
          // 获取当前窗口的宽高
          const windowW =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
          const windowH =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
          // 获取图片真实宽高
          const realWidth = this.width;
          const realHeight = this.height;
          let imgWidth, imgHeight;
          const scale = 0.8; // 缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
          if (realHeight > windowH * scale) {
            // 判断图片高度
            imgHeight = windowH * scale;
            imgWidth = (imgHeight / realHeight) * realWidth; // 等比例缩放宽度
          } else if (realWidth > windowW * scale) {
            // 判断图片宽度
            imgWidth = windowW * scale;
            imgHeight = (imgWidth / realWidth) * realHeight; // 等比例缩放高度
          } else {
            imgWidth = realWidth;
            imgHeight = realHeight;
          }
          that.imgWidth = imgWidth;
          that.imgHeight = imgHeight;
          // // 计算图片与窗口做边距和上边距
          // that.innerLeft = `${(windowW - imgWidth) / 2}px`;
          // that.innerTop = `${(windowH - imgHeight) / 2}px`;
          // 显示图片预览
          that.visible = true;
        };
      }
    },
    handleClosePreview() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
#outer-div {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow: auto;
  #inner-div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    border: 5px solid #fff;
    border-radius: 5px;
    cursor: zoom-out;
  }
}
</style>
