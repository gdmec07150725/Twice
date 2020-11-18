<template>
  <div class="welcome-context">
    <context-left>
      <div slot="leftContent" class="leftContent">
        <div class="trend-main">
          <trendItemUI
            parentPage="myArticle"
            :trendsList="articleList"
            :curentUserDetail="curentUserDetail"
          />
        </div>
      </div>
    </context-left>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import storage from '@/utils/storage';
import contextLeft from '@/components/context/contextLeft.vue';
import trendItemUI from '@/businessComponent/trendItemUI';
export default {
  name: 'myArticle',
  components: {
    contextLeft,
    trendItemUI,
  },
  computed: {
    curentUserDetail() {
      return JSON.parse(storage.getUserDetail());
    },
  },
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    ...mapActions(['getUserPublishArticle']),
    async getUserAllArticle() {
      try {
        const id = JSON.parse(storage.getUserDetail()).id;
        this.articleList = await this.getUserPublishArticle(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUserAllArticle();
  },
};
</script>
<style lang="less" scoped>
.welcome-context {
  margin-top: 15px;
}
.leftContent {
  display: flex;
  .trend-main {
    width: 570px;
  }
}
</style>
