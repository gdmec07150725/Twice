<template>
  <div class="article-wrapper ql-snow">
    <article slot="leftContent" class="article">
      <div class="author-info-block">
        <a href="#" target="_blank" class="avatar-link">
          <div class="avatar"></div>
        </a>
        <div class="author-info-box">
          <a target="_blank" class="username ellipsis">Tony</a>
          <div class="meta-box">
            <time class="time">{{
              (articleDetail.publishedAt && articleDetail.publishedAt) ||
                Date.now() | formatTime
            }}</time>
            <span class="views-count">阅读 100</span>
          </div>
        </div>
      </div>
      <div class="lazy article-hero thumb" v-if="articleDetail.image">
        <img :src="articleDetail.image" width="100%" height="auto" />
      </div>
      <h1 class="article-title">{{ articleDetail.title }}</h1>
      <div
        v-html="articleDetail.content"
        class="ql-editor article-content"
      ></div>
    </article>
  </div>
</template>
<script>
export default {
  name: 'customArticleDetail',
  props: {
    articleDetail: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
