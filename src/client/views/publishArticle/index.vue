<template>
  <div>
    <publish-article-detail :articleId="articleId" />
  </div>
</template>
<script>
import publishArticleDetail from '@/businessComponent/publishArticle';
export default {
  name: 'publishArticle',
  components: {
    publishArticleDetail,
  },
  data() {
    return {
      articleId: '',
    };
  },
  created() {
    const query = this.$route.query;
    if (query.articleId) {
      this.articleId = query.articleId;
    }
  },
};
</script>
