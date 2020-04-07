<template>
  <div class="context-right">
    <aside class="welcome-side">
      <div class="sidebar-block banner-block">
        <div class="banner">
          <a href="#" target="_blank">
            <div
              class="lazy thumb banner-image"
              style="background-image: url('https://user-gold-cdn.xitu.io/15832868269356ea9003efaa4b15e0419e823254708a4.jpg?imageView2/1/q/85/format/webp/interlace/1'); background-size: cover;"
            ></div>
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  name: 'contextRight',
};
</script>
<style lang="less" scoped>
.context-right {
  position: relative;
  width: 240px;
  min-width: 240px;
  margin-left: 20px;
  border: 1px solid hsla(0, 0, 0, 0.05);
  .welcome-side {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    .sidebar-block.banner-block {
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 1.29;
      color: #333;
      .banner {
        position: relative;
        height: 200px;
        // border: 1px solid #ff0000;
        cursor: pointer;
        .banner-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
