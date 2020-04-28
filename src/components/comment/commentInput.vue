<template>
  <div>
    <div class="reply-input-box">
      <div
        class="rich-input"
        :class="{ empty: !replyContent }"
        contenteditable="true"
        spellcheck="fasle"
        :placeholder="isReplyArticle ? '输入评论...' : `回复${replyName}...`"
        @focus="handleFocus"
        @input="handleInput($event)"
      ></div>
    </div>
    <action :show="showReplyAction" @onHandleSubmit="handleSubmit" />
  </div>
</template>
<script>
import action from './action.vue';
export default {
  name: 'commentInput',
  components: {
    action,
  },
  props: {
    isReplyArticle: {
      // 是否为回复文章
      type: Boolean,
      default: false,
    },
    replyName: {
      // 被回复人名称
      type: String,
      default: '',
    },
  },
  data() {
    return {
      replyContent: '',
      showReplyAction: !this.isReplyArticle,
    };
  },
  methods: {
    handleInput(e) {
      this.replyContent = e.target.innerHTML;
    },
    handleFocus() {
      if (this.isReplyArticle) {
        this.showReplyAction = true;
      }
    },
    handleSubmit() {
      if (this.isReplyArticle) {
        this.$emit('onReplyArticle', this.replyContent);
      } else {
        this.$emit('onReplyComment', this.replyContent);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.reply-input-box {
  display: flex;
  width: 100%;
  border-color: #007fff;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  .rich-input {
    position: relative;
    flex: 1;
    padding: 8px 16px;
    line-height: 1.7;
    color: #17181a;
    outline: none;
    min-height: 18px;
  }
  .rich-input::before {
    content: attr(placeholder);
    position: absolute;
    opacity: 0.4;
    pointer-events: none;
    user-select: none;
  }
  .rich-input:not(.empty)::before {
    display: none;
  }
}
</style>
