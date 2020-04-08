<template>
  <div v-show="visible" class="customize-loading">
    <div class="customize-loading-round"></div>
  </div>
</template>

<script>
export default {
  name: 'customizeLoading',
  data() {
    return {
      visible: false,
    };
  },
};
</script>
<style scoped>
/* 定义动画 */
@keyframes custom-loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.customize-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  overflow: hidden;
}

.customize-loading .customize-loading-round {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #007fff;
  border-left-color: transparent;
  animation: custom-loading-rotate 1s linear infinite;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
