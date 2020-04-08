<template>
  <nav class="view-nav">
    <ul class="nav-list left">
      <slot name="list" />
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'secondNav', // 二级导航
};
</script>
<style lang="less" scoped>
.view-nav {
  position: fixed;
  left: 0;
  top: 61px;
  width: 100%;
  height: 46px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  z-index: 1;
  .nav-list {
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-content: center;
    line-height: 1;
    .nav-item {
      height: 100%;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #71777c;
    }
    .nav-item:first-child {
      padding: 0 12px 0 0;
    }
    .nav-item-active {
      color: #007fff;
    }
  }
}
</style>
