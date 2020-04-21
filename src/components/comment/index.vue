<template>
  <div class="comment-wrapper">
    <div class="reply-article">
      <user-avatar />
      <div class="reply-article-input">
        <comment-input
          :isReplyArticle="true"
          @onReplyArticle="handReplyArticle"
        />
      </div>
    </div>
    <div class="reply-comment">
      <comment-item
        v-for="item in commentList"
        :item="item"
        :key="item.id"
        @onReplyComment="handleReplyComment"
      />
    </div>
  </div>
</template>
<script>
import userAvatar from '@/businessComponent/userAvatar';
import commentItem from './item.vue';
import commentInput from './commentInput';
export default {
  name: 'comment',
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    userAvatar,
    commentItem,
    commentInput,
  },
  methods: {
    handReplyArticle(replyContent) {
      this.$emit('onHandleReplyArticle', replyContent);
    },
    handleReplyComment(params) {
      this.$emit('onHandleReplyComment', params);
    },
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
