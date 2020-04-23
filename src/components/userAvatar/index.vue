<template>
  <div class="avatar">
    <img :src="url" width="100%" height="100%" />
  </div>
</template>
<script>
export default {
  name: 'userAvatar',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="less" scoped>
.avatar {
  flex: 0 0 auto;
  margin-right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  // background-image: url(https://mirror-gold-cdn.xitu.io/168e0858b6ccfd57fe5?imageView2/1/w/100/h/100/q/85/format/webp/in);
}
</style>
