<template>
  <div>
    <div
      :class="[!isZoomIn ? 'zoomIn' : 'zoomOut', 'content-image']"
      v-if="imageList.length === 1"
      @click="handleSingleImageClick"
    >
      <img :src="imageList[0].url" width="100%" height="auto" />
    </div>
    <div class="content-image-multiple" v-if="imageList.length > 1">
      <ul class="big-image-multiple" v-if="!isZoomIn">
        <li
          class="image-item"
          v-for="item in imageList"
          :key="item.url"
          @click="handleBigImageListClick(item.url)"
        >
          <img :src="item.url" width="100%" height="100%" />
        </li>
      </ul>
      <div v-else>
        <div class="currentBigImage" @click="handleSingleImageClick">
          <img :src="currentBigImage" width="100%" height="auto" />
        </div>
        <div class="small-image-multiple">
          <li
            v-for="item in imageList"
            :class="[
              item.url === currentBigImage ? 'active' : '',
              'image-item',
            ]"
            :key="item.url"
            @click="handleSmallImageList(item.url)"
          >
            <img :src="item.url" width="100%" height="100%" />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'trendImageView', // 动态图片预览组件(支持多图，单图，放大，全屏显示)
  props: {
    imageList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isZoomIn: false,
      currentBigImage: '', // 大图图片地址
    };
  },
  methods: {
    handleSingleImageClick() {
      this.isZoomIn = !this.isZoomIn;
    },
    handleBigImageListClick(url) {
      this.isZoomIn = !this.isZoomIn;
      this.currentBigImage = url;
    },
    handleSmallImageList(url) {
      this.currentBigImage = url;
    },
  },
};
</script>
<style lang="less" scoped>
.content-image,
.content-image-multiple {
  margin-top: 10px;
}
.big-image-multiple {
  display: flex;
  flex-wrap: wrap;
  .image-item {
    width: 105px;
    height: 105px;
    margin-top: 5px;
    cursor: zoom-in;
    &:not(:nth-child(4n)) {
      margin-right: 4px;
    }
  }
}
.currentBigImage {
  cursor: zoom-out;
}
.small-image-multiple {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  .image-item {
    width: 45px;
    height: 45px;
    margin-top: 5px;
    border: 2px solid transparent;
    opacity: 0.6;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    &:not(:nth-child(10n)) {
      margin-right: 4px;
    }
    &:hover {
      border-color: #027fff;
    }
  }
  .active {
    border-color: #027fff;
    opacity: 1;
  }
}
.zoomIn {
  width: 200px;
  max-height: 600px;
  cursor: zoom-in;
}
.zoomOut {
  width: 100%;
  cursor: zoom-out;
}
</style>
