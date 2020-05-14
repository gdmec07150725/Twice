<template>
  <div class="context-left">
    <slot name="leftContent" />
  </div>
</template>
<script>
export default {
  name: 'contextLeft',
};
</script>
<style lang="less" scoped>
.context-left {
  flex-grow: 1;
}
</style>
