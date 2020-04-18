<template>
  <div class="commentItem-wrapper">
    <div class="item-container">
      <user-avatar />
      <div class="comment-content-wrapper">
        <div class="comment-header">Tony</div>
        <div class="comment-content">content</div>
        <div class="comment-footer">
          <div class="comment-time">两小时前</div>
          <div class="comment-action">
            <action-icon @onHandleReply="handleReply" />
          </div>
        </div>
        <div class="reply-wrapper">
          <div class="reply-input-box">
            <div
              class="rich-input"
              contenteditable="true"
              spellcheck="fasle"
              placeholder="回复Tony..."
            ></div>
          </div>
          <div class="reply-action">
            <div class="reply-icon">
              <div class="icon"></div>
              <span>表情</span>
            </div>
            <div class="reply-button">
              <button class="submit-btn">评论</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionIcon from '@/businessComponent/actionIcon';
import userAvatar from '@/businessComponent/userAvatar';
export default {
  name: 'commentItem',
  components: {
    actionIcon,
    userAvatar,
  },
  data() {
    return {};
  },
  handleReply() {},
};
</script>
<style lang="less" scoped>
.item-container {
  display: flex;
  .comment-content-wrapper {
    flex: 1;
    .comment-content {
      margin: 5px 0 10px;
    }
    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .reply-wrapper {
      margin-top: 15px;
      padding: 15px;
      background-color: #fafbfc;
      border-radius: 3px;
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
    }
  }
}
</style>
