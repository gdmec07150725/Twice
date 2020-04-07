<template>
  <div>
    <custom-drawer
      :openDrawer="openDrawer"
      :destryAfterClose="false"
      @beforeClose="handleCloseDrawer"
      style="overflow-y: 'auto'"
    >
      <div slot="title" class="title-wrapper">
        <div class="title-desc">文章详情</div>
        <div class="title-action">
          <template v-if="articleContent.status === 'ARTICLE_STATUS_CHECKING'">
            <edit-button @click="handleAgree(articleContent)" class="btn">
              同意
            </edit-button>
            <delete-button @click="openRejectModal(articleContent)" class="btn">
              拒绝
            </delete-button>
          </template>
          <primary-button @click="handleCloseDrawer">关闭</primary-button>
        </div>
      </div>
      <div slot="content" id="content" v-loading="dataLoading">
        <custom-article-detail :articleDetail="articleContent" />
      </div>
    </custom-drawer>
  </div>
</template>
<script>
import customDrawer from '_c/drawer';
import customArticleDetail from '_c/customArticleDetail';
import { mapActions } from 'vuex';
export default {
  name: 'articleDetail',
  props: {
    articleId: {
      type: [String, Number],
      default: '',
    },
    openDrawer: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    customDrawer,
    customArticleDetail,
  },
  watch: {
    articleId(newVal) {
      this.queryArticleDetail(newVal);
    },
  },
  data() {
    return {
      articleContent: {},
      dataLoading: false,
    };
  },
  methods: {
    ...mapActions(['getArticleDetail']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    async queryArticleDetail(articleId) {
      try {
        this.dataLoading = true;
        const res = await this.getArticleDetail(articleId || this.articleId);
        this.dataLoading = false;
        if (res) {
          this.articleContent = res;
        }
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
    handleAgree(articleContent) {
      this.$emit('onHandleAgree', articleContent);
    },
    openRejectModal(articleContent) {
      this.$emit('onOpenRejectModal', articleContent);
    },
    handleCloseDrawer() {
      this.$emit('onHandleCloseDrawer');
    },
    // // 打开loading
    // openLoading() {
    //   this.dataLoading = this.$loading({
    //     lock: true,
    //     target: document.getElementById('content'),
    //   });
    // },
    // closeLoading() {
    //   this.dataLoading.close();
    // },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     if (this.articleId) {
  //       this.queryArticleDetail(this.articleId);
  //     }
  //   });
  // },
};
</script>
<style lang="less" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-desc {
    font-size: 18px;
    font-weight: 600;
  }
  .title-action {
    display: flex;
    .btn {
      margin-right: 15px;
    }
  }
}
</style>
