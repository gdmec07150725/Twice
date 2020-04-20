<template>
  <div>
    <div class="reply-input-box">
      <div
        class="rich-input"
        :class="{ empty: !replyContent }"
        contenteditable="true"
        spellcheck="fasle"
        :placeholder="isReplyArticle ? '输入评论...' : '回复Tony...'"
        @focus="handleFocus"
        @input="handleInput($event)"
      ></div>
    </div>
    <div class="reply-action" v-if="showReplyAction">
      <div class="reply-icon">
        <div class="icon"></div>
        <span>表情</span>
      </div>
      <div class="reply-button">
        <button class="submit-btn">评论</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'commentInput',
  props: {
    isReplyArticle: {
      // 是否为回复文章
      type: Boolean,
      default: false,
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
.reply-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .reply-icon {
    display: flex;
    color: #027fff;
    .icon {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      background-image: url('https://b-gold-cdn.xitu.io/v3/static/img/emoji.5594dbb.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }
    span {
      font-size: 13px;
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
