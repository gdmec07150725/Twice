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
            <action-icon @onHandleReply="handleOpenReply" />
          </div>
        </div>
        <div
          class="reply-wrapper"
          v-if="openReply"
          v-click-out="handleCloseReply"
        >
          <comment-input :isReplyArticle="false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionIcon from '@/components/actionIcon';
import userAvatar from '@/businessComponent/userAvatar';
import commentInput from './commentInput';
export default {
  name: 'commentItem',
  components: {
    actionIcon,
    userAvatar,
    commentInput,
  },
  data() {
    return {
      toggleReply: false,
      openReply: false,
    };
  },
  methods: {
    handleOpenReply() {
      this.openReply = !this.openReply;
    },
    handleCloseReply() {
      this.openReply = false;
    },
    handleReply() {},
  },
};
</script>
<style lang="less" scoped>
.commentItem-wrapper {
  margin-bottom: 10px;
  border-bottom: 1px solid #f1f1f1;
}
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
      margin-bottom: 10px;
    }
    .reply-wrapper {
      margin-top: 15px;
      padding: 15px;
      background-color: #fafbfc;
      border-radius: 3px;
    }
  }
}
</style>
