<template>
  <div class="reply-action" v-if="show">
    <div class="replay-icon-wrapper">
      <div class="reply-icon">
        <div
          class="icon"
          style="background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/emoji.5594dbb.svg)"
        ></div>
        <span>表情</span>
      </div>
      <div class="reply-icon" v-if="showImageIcon" @click="handleImageClick">
        <div
          class="icon"
          style="background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/active_file.d265f4e.svg)"
        ></div>
        <span>图片</span>
      </div>
    </div>
    <div class="reply-button">
      <button class="submit-btn" @click="handleSubmit">评论</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'action',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showImageIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('onHandleSubmit');
    },
    handleImageClick() {
      this.$emit('onHandleImageClick');
    },
  },
};
</script>
<style lang="less" scoped>
.reply-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .replay-icon-wrapper {
    display: flex;
    flex: 1;
    .reply-icon {
      display: flex;
      color: #027fff;
      margin-right: 20px;
      cursor: pointer;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        background-repeat: no-repeat;
        background-size: cover;
      }
      span {
        font-size: 13px;
      }
    }
  }
  .reply-button {
    .submit-btn {
      padding: 8px 16px;
      color: #fff;
      background-color: #027fff;
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
