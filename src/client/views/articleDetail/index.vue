<template>
  <div class="welcome-context">
    <article-suspended />
    <context-left class="ql-snow content-wrapper">
      <article slot="leftContent" class="article">
        <div class="author-info-block">
          <a href="#" target="_blank" class="avatar-link">
            <user-avatar
              :url="articleDetail.user && articleDetail.user.avatar"
            />
          </a>
          <div class="author-info-box">
            <a target="_blank" class="username ellipsis">
              {{ articleDetail.user && articleDetail.user.username }}
            </a>
            <div class="meta-box">
              <time class="time">
                {{ articleDetail.publishedAt | formatTime }}
              </time>
              <span class="views-count">阅读 100</span>
            </div>
          </div>
        </div>
        <div class="lazy article-hero thumb" v-if="articleDetail.image">
          <img :src="articleDetail.image" width="100%" height="auto" />
        </div>
        <h1 class="article-title">
          {{ articleDetail.title }}
        </h1>
        <div
          v-html="articleDetail.content"
          class="ql-editor article-content"
        ></div>
        <div class="article-comment-wrapper" id="article-comment-wrapper">
          <div class="title">评论</div>
          <comment
            :key="commentKey"
            :commentList="commentList"
            @onHandleReplyArticle="handleReplyArticle"
            @onHandleReplyComment="handleReplyComment"
          />
        </div>
      </article>
    </context-left>
    <context-right />
  </div>
</template>
<script>
import articleSuspended from '@/businessComponent/articleSuspended';
import contextLeft from '@/components/context/contextLeft.vue';
import contextRight from '@/components/context/contextRight.vue';
import userAvatar from '@/components/userAvatar';
import comment from '@/components/comment';
import { mapActions } from 'vuex';
import storage from '@/utils/storage';
export default {
  name: 'articleDetail',
  components: {
    articleSuspended,
    contextLeft,
    contextRight,
    comment,
    userAvatar,
  },
  data() {
    return {
      articleDetail: {},
      commentList: [],
      articleId: '',
      commentKey: Date.now(),
    };
  },
  methods: {
    ...mapActions(['getArticleDetail', 'getCommentList', 'publishComment']),
    async handleReplyArticle(content) {
      try {
        const params = {
          content,
          contentId: this.articleId,
          replyId: 0,
          type: 'COMMENT_TYPE_ARTICLE',
          userId: JSON.parse(storage.getUserDetail()).id,
        };
        const res = await this.publishComment(params);
        if (res.code === 200) {
          this.handleGetArticleComment();
          this.commentKey = Date.now();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleReplyComment(params) {
      try {
        const concatParams = {
          replyId: params.replyId,
          content: params.replyContent,
          contentId: this.articleId,
          type: 'COMMENT_TYPE_ARTICLE',
          userId: JSON.parse(storage.getUserDetail()).id,
        };
        const res = await this.publishComment(concatParams);
        if (res.code === 200) {
          this.handleGetArticleComment();
          this.commentKey = Date.now();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetArticleDetail() {
      try {
        const res = await this.getArticleDetail(this.articleId);
        if (res) {
          this.articleDetail = { ...res };
          console.log(this.articleDetail);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetArticleComment() {
      try {
        const params = {
          contentId: this.articleId,
          type: 'COMMENT_TYPE_ARTICLE',
        };
        const res = await this.getCommentList(params);
        this.commentList = res;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const {
      query: { id },
    } = this.$route;
    if (id) {
      this.articleId = id;
      this.handleGetArticleDetail();
      this.handleGetArticleComment();
    }
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
