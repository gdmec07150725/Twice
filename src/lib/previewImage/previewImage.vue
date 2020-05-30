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
    <template v-if="imageList && imageList.length > 1">
      <div
        v-if="showPrev"
        class="control prev"
        @click.stop="handlePrevImg"
      ></div>
      <div
        v-if="showNext"
        class="control next"
        @click.stop="handleNextImg"
      ></div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'previewImage',
  props: {
    show: {
      // 是否显示
      type: Boolean,
      default: false,
    },
    imageList: {
      // 图片数组
      type: Array,
      default: () => [],
    },
    defaultCurIndex: {
      // 打开的时候默认显示第几张图片
      type: Number,
      default: 0,
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.curIndex = this.defaultCurIndex;
        this.handleTogglePrevAndNext();
        this.handleImageDetail(this.imageList[this.defaultCurIndex]);
        this.handleOpenPreview();
      }
    },
  },
  data() {
    return {
      visible: false,
      imgSrc: '',
      imgWidth: '',
      imgHeight: '',
      innerLeft: '',
      innerTop: '',
      showPrev: false, // 是否可以切换上一张
      showNext: false, // 是否可以切换下一张
      curIndex: 0,
    };
  },
  methods: {
    handleImageDetail(imgSrc) {
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
          if (realWidth >= windowW || realHeight >= windowH) {
            // 判断真实宽度高度和窗口的宽度高度比值
            const widthRatio = realWidth / windowW;
            const heightRatio = realHeight / windowH;
            const finalRatio =
              widthRatio >= heightRatio ? widthRatio : heightRatio;
            imgWidth = realWidth / finalRatio;
            imgHeight = realHeight / finalRatio;
          } else {
            imgWidth = realWidth;
            imgHeight = realHeight;
          }
          that.imgWidth = imgWidth;
          that.imgHeight = imgHeight;
          // // 计算图片与窗口做边距和上边距
          that.innerLeft = `${(windowW - imgWidth) / 2}px`;
          that.innerTop = `${(windowH - imgHeight) / 2}px`;
        };
      }
    },
    handleOpenPreview() {
      this.visible = true;
    },
    handleClosePreview() {
      this.visible = false;
      this.$emit('onHandleClosePreview');
    },
    handlePrevImg() {
      const prevIndex = this.curIndex - 1;
      if (prevIndex >= 0) {
        this.handleImageDetail(this.imageList[prevIndex]);
        this.curIndex = prevIndex;
        this.handleTogglePrevAndNext();
      }
    },
    handleNextImg() {
      const { length } = this.imageList;
      const nextIndex = this.curIndex + 1;
      if (nextIndex <= length) {
        this.handleImageDetail(this.imageList[nextIndex]);
        this.curIndex = nextIndex;
        this.handleTogglePrevAndNext();
      }
    },
    handleTogglePrevAndNext() {
      // 判断左右切换是否显示
      if (this.curIndex - 1 < 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      if (this.curIndex + 1 >= this.imageList.length) {
        this.showNext = false;
      } else {
        this.showNext = true;
      }
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
  z-index: 1000;
  width: 100%;
  height: 100%;
  overflow: auto;
  #inner-div {
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }
  .control {
    position: absolute;
    z-index: 1001;
    width: 30vw;
    height: 100vh;
  }
  .prev {
    left: 0;
    cursor: url(https://b-gold-cdn.xitu.io/v3/static/img/left.906c5c1.cur), auto;
  }
  .next {
    right: 0;
    cursor: url(https://b-gold-cdn.xitu.io/v3/static/img/right.6275260.cur),
      auto;
  }
  img {
    cursor: zoom-out;
  }
}
</style>
