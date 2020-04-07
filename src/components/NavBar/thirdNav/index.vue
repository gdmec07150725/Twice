<template>
  <div class="tag-navigator">
    <nav class="tag-nav">
      <ul class="nav-list tag-list">
        <slot name="list"></slot>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'thirdNav',
};
</script>
<style lang="less" scoped>
.tag-navigator {
  .tag-list {
    display: flex;
    flex-wrap: wrap; // 如果一行显示不下，则换行显示
    height: auto;
    .nav-item.tag.active {
      background-color: #007fff;
      color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05),
        0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .nav-item.tag {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      background-color: #fff;
      color: #8a9aa9;
      border-radius: 12px;
      font-size: 13px;
      margin-right: 12px;
      margin-bottom: 12px;
    }
    .nav-item.tag.active {
      background-color: #007fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05),
        0 1px 2px 0 rgba(0, 0, 0, 0.05);
      a {
        color: #fff;
      }
    }
  }
}
</style>
