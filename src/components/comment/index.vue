<template>
  <div class="comment-wrapper">
    <div class="reply-article">
      <user-avatar />
      <div class="reply-article-input">
        <comment-input :isReplyArticle="true" />
      </div>
    </div>
    <div class="reply-comment">
      <comment-item />
      <comment-item />
      <comment-item />
      <comment-item />
      <comment-item />
    </div>
  </div>
</template>
<script>
import userAvatar from '@/businessComponent/userAvatar';
import commentItem from './item.vue';
import commentInput from './commentInput';
export default {
  name: 'comment',
  components: {
    userAvatar,
    commentItem,
    commentInput,
  },
};
</script>
<style lang="less" scoped>
.comment-wrapper {
  .reply-article {
    display: flex;
    margin: 20px 0;
    .reply-article-input {
      flex: 1;
    }
  }
  .reply-comment {
    margin-left: 52px;
  }
}
</style>
