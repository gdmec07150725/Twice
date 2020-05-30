<template>
  <div>
    <div
      :class="[!isZoomIn ? 'zoomIn' : 'zoomOut', 'content-image']"
      v-if="imageList.length === 1"
      @click="handleSingleImageClick"
    >
      <div class="action-bar" v-if="isZoomIn">
        <div class="action-item" @click.stop="handleOpenPreview(0)">
          <icon-font icon="icon-fangdajing" class="icon" />
          <span class="action-name">查看大图</span>
        </div>
      </div>
      <img
        :src="imageList[0].url"
        width="100%"
        height="auto"
        style="border-radius: 3px;"
      />
    </div>
    <div class="content-image-multiple" v-if="imageList.length > 1">
      <ul class="big-image-multiple" v-if="!isZoomIn">
        <li
          class="image-item"
          v-for="(item, index) in imageList"
          :key="item.url"
          @click="handleBigImageListClick(item.url, index)"
        >
          <img :src="item.url" width="100%" height="100%" />
        </li>
      </ul>
      <div v-else>
        <div class="action-bar">
          <div
            class="action-item"
            @click.stop="handleOpenPreview(bigImageIndex)"
          >
            <icon-font icon="icon-fangdajing" class="icon" />
            <span class="action-name">查看大图</span>
          </div>
        </div>
        <div class="currentBigImage" @click="handleSingleImageClick">
          <img :src="currentBigImage" width="100%" height="auto" />
        </div>
        <div class="small-image-multiple">
          <li
            v-for="(item, index) in imageList"
            :class="[
              item.url === currentBigImage ? 'active' : '',
              'image-item',
            ]"
            :key="item.url"
            @click="handleSmallImageList(item.url, index)"
          >
            <img :src="item.url" width="100%" height="100%" />
          </li>
        </div>
      </div>
    </div>
    <!-- 图片预览组件 -->
    <preview-image
      :show="showPreview"
      :imageList="imageList.map(item => item.url)"
      :defaultCurIndex="currentIndex"
      @onHandleClosePreview="handleClosePreview"
    />
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
      bigImageIndex: 0,
      currentBigImage: '', // 大图图片地址
      currentIndex: 0, // 点前点击图片的下标
      showPreview: false, // 是否显示图片预览组件
    };
  },
  methods: {
    handleSingleImageClick() {
      this.isZoomIn = !this.isZoomIn;
    },
    handleBigImageListClick(url, index) {
      this.isZoomIn = !this.isZoomIn;
      this.currentBigImage = url;
      this.bigImageIndex = index;
    },
    handleSmallImageList(url, index) {
      this.currentBigImage = url;
      this.bigImageIndex = index;
    },
    handleOpenPreview(index) {
      this.currentIndex = index;
      this.showPreview = true;
    },
    handleClosePreview() {
      this.showPreview = false;
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
.action-bar {
  height: 32px;
  background-color: #f4f5f7;
  margin-bottom: 5px;
  .action-item {
    padding: 0 12px;
    display: inline-block;
    font-size: 13px;
    color: #76797e;
    cursor: pointer;
    line-height: 32px;
    .icon {
      margin-right: 6px;
    }
  }
}
</style>
