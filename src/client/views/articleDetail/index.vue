<template>
  <div class="welcome-context">
    <context-left class="ql-snow content-wrapper">
      <article slot="leftContent" class="article">
        <div class="author-info-block">
          <a href="#" target="_blank" class="avatar-link">
            <div class="avatar"></div>
          </a>
          <div class="author-info-box">
            <a target="_blank" class="username ellipsis">Tony</a>
            <div class="meta-box">
              <time class="time">2020年03月09日</time>
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
      </article>
    </context-left>
    <context-right />
  </div>
</template>
<script>
import contextLeft from '@/components/context/contextLeft.vue';
import contextRight from '@/components/context/contextRight.vue';
import { mapActions } from 'vuex';
export default {
  name: 'articleDetail',
  components: {
    contextLeft,
    contextRight,
  },
  data() {
    return {
      articleDetail: {
        content: '',
        title: '',
        image: '',
      },
    };
  },
  methods: {
    ...mapActions(['getArticleDetail']),
    async handleGetArticleDetail(articleId) {
      try {
        const res = await this.getArticleDetail(articleId);
        if (res) {
          this.articleDetail = { ...res };
          console.log(this.articleDetail);
        }
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
      this.handleGetArticleDetail(id);
    }
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
