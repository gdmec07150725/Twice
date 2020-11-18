<template>
  <div class="trend-comment-wrapper" v-if="showComment">
    <comment
      :key="commentKey"
      :commentList="commentList"
      @onHandleReplyArticle="handleReplyArticle"
      @onHandleReplyComment="handleReplyComment"
    />
    <div class="comment-icon">
      <em class="triangle"></em>
    </div>
  </div>
</template>
<script>
import comment from '@/components/comment';
import { mapActions } from 'vuex';
import storage from '@/utils/storage';
export default {
  name: 'commentWrapper',
  props: {
    parentPage: {
      type: String,
      default: 'trend',
    },
    id: {
      type: [String, Number],
      default: '',
    },
  },
  components: {
    comment,
  },
  data() {
    return {
      commentKey: Date.now(),
      showComment: false,
      commentList: [],
    };
  },
  computed: {
    requireType() {
      return this.parentPage === 'trend'
        ? 'COMMENT_TYPE_TREND'
        : 'COMMENT_TYPE_ARTICLE';
    },
  },
  methods: {
    ...mapActions(['getCommentList', 'publishComment']),
    toggleShowComment() {
      this.showComment = !this.showComment;
      if (this.showComment) {
        this.handleGetTrendComment();
      }
    },
    handleReplyComment(params) {
      const concatParams = {
        replyId: params.replyId,
        content: params.replyContent,
        contentId: this.id,
        type: this.requireType,
        userId: JSON.parse(storage.getUserDetail()).id,
      };
      this.replyTrend(concatParams);
    },
    handleReplyArticle(content) {
      const params = {
        content,
        contentId: this.id,
        replyId: 0,
        type: this.requireType,
        userId: JSON.parse(storage.getUserDetail()).id,
      };
      this.replyTrend(params);
    },
    async replyTrend(params) {
      try {
        await this.publishComment(params);
        this.handleGetTrendComment();
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetTrendComment() {
      try {
        const params = {
          contentId: this.id,
          type: this.requireType,
        };
        const res = await this.getCommentList(params);
        this.commentList = res;
        this.commentKey = Date.now();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="less">
.comment-icon {
  position: absolute;
  top: -8px;
  left: 75%;
  margin: -7px 0 0 -7px;
  width: 14px;
  height: 14px;
  border-top: 1px solid #fff;
  transform: rotate(180deg);
  .triangle {
    position: absolute;
    top: -6px;
    left: 0;
    right: 0;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    background: #fff;
  }
}
.trend-comment-wrapper {
  position: relative;
  padding: 15px;
  margin: 0 -15px;
  border-top: 1px solid #eee;
}
</style>
