<template>
  <div class="commentItem-wrapper">
    <div class="item-container">
      <user-avatar :url="item.avatar" />
      <div class="comment-content-wrapper">
        <div class="comment-header">{{ item.username }}</div>
        <div
          class="comment-content"
          v-if="item.replyId"
          v-html="`回复 ${item.replyName} : ${item.content}`"
        ></div>
        <div class="comment-content" v-else v-html="item.content"></div>
        <div class="comment-footer">
          <div class="comment-time">两小时前</div>
          <div class="comment-action">
            <action-icon @onHandleReply="handleOpenReply(item.username)" />
          </div>
        </div>
        <div
          class="reply-wrapper"
          v-if="openReply"
          v-click-out="handleCloseReply"
        >
          <comment-input
            :replyName="replyName"
            :isReplyArticle="false"
            @onReplyComment="handleReplyComment"
          />
        </div>
        <div
          class="children-item-container"
          v-if="item.childComment && item.childComment.length > 0"
        >
          <comment-item
            v-for="childItem in item.childComment"
            :key="childItem.id"
            :item="childItem"
            @onReplyComment="handleReplyComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionIcon from '@/components/actionIcon';
import userAvatar from '@/components/userAvatar';
import commentInput from './commentInput';
export default {
  name: 'commentItem',
  props: {
    item: Object,
    default: () => ({}),
  },
  components: {
    actionIcon,
    userAvatar,
    commentInput,
  },
  data() {
    return {
      toggleReply: false,
      openReply: false,
      replyName: '',
    };
  },
  methods: {
    handleOpenReply(name) {
      this.replyName = name;
      this.openReply = !this.openReply;
    },
    handleCloseReply() {
      this.openReply = false;
    },
    handleReplyComment(replyContent) {
      if (typeof replyContent === 'object') {
        this.$emit('onReplyComment', replyContent);
      } else {
        const params = {
          replyId: this.item.id,
          replyContent,
        };
        this.$emit('onReplyComment', params);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.commentItem-wrapper {
  padding: 10px 10px 0 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
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
.children-item-container {
  background-color: #fafbfc;
}
</style>
