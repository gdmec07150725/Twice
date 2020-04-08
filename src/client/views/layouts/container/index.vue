<template>
  <main class="main-container">
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>
<script>
export default {
  name: 'container',
};
</script>
<style lang="less" scoped>
.main-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}
.main-container > .view {
  margin-top: 62px;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
