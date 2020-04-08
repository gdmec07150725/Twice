<template>
  <div class="editor-wrapper">
    <div class="rich-text-editor">
      <header class="rich-text-editor-header">
        <div class="header-content">
          <div class="logo" @click="handleGoHome"></div>
          <div class="status-text with-padding">
            文章将会自动保存至
            <a>草稿</a>
          </div>
          <div class="main-image-selector with-padding unset">
            <div
              class="toggle-btn"
              :class="{ hasCoverImage: richForm.coverImage ? true : false }"
              @click.stop="handleToggleCoverImage"
            ></div>
            <div class="panel" v-if="toggleCoverImage">
              <div class="title">添加封面大图</div>
              <div id="coverImage-wrapper">
                <template v-if="!richForm.coverImage">
                  <button class="select-btn" @click.stop="handleUpload">
                    点击此处添加图片
                  </button>
                </template>
                <template v-else>
                  <img
                    :src="richForm.coverImage"
                    width="240"
                    @click.stop="handleUpload"
                    class="coverImage"
                  />
                </template>
              </div>
            </div>
            <customizeUpload
              ref="customizeUpload"
              @onHandleStartUpload="handleStartUpload"
              @onHandleImageUrl="handleImageUrl"
            />
          </div>
          <div class="publish-popup with-padding">
            <div class="toggle-btn" @click.stop="handleTogglePublish">
              <span class="title">
                发布
              </span>
              <icon-font
                :icon="
                  togglePublish ? 'iconsanjiao_up_s' : 'iconsanjiao_down_s'
                "
                :size="18"
              />
            </div>
            <div
              class="panel"
              v-if="togglePublish"
              v-click-out="handleTogglePublish"
            >
              <div class="title">发布文章</div>
              <div class="category-box">
                <template v-for="item in categoryList">
                  <div :key="item.id">
                    <div class="sub-title">{{ item.name }}</div>
                    <div
                      class="category-list"
                      v-if="item.secondCategoriesList.length > 0"
                    >
                      <div
                        :class="[
                          'item',
                          itemActive === child.id ? 'itemActive' : '',
                        ]"
                        v-for="child in item.secondCategoriesList"
                        :key="child.id"
                        @click="itemActive = child.id"
                      >
                        {{ child.name }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <button class="publish-btn" @click="handleInsertArticle">
                确定并发布
              </button>
            </div>
          </div>
          <nav
            class="navigator main-navigator with-padding"
            @click="e => handleAvatarClick(e)"
          >
            <avatar-navigation />
          </nav>
        </div>
      </header>
      <main class="rich-text-editor-main">
        <textarea
          placeholder="请输入标题"
          maxlength="80"
          rows="1"
          class="title-input"
          v-model="richForm.title"
        ></textarea>
        <quill-editor
          :value="richForm.content"
          :needReload="false"
          formName="article"
          language="zh_cn"
          defaultHeight="calc(100vh - 190px)"
          @input="value => handleQuillEditorInput(value)"
          class="quillEditor"
        />
      </main>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import avatarNavigation from '@/components/avatarNavigation';
import quillEditor from '_c/quillEditor/quillEditor.vue';
import customizeUpload from '_c/customizeUpload';
export default {
  name: 'publishArticleDetail',
  components: {
    avatarNavigation,
    quillEditor,
    customizeUpload,
  },
  computed: {
    ...mapState({
      categoryList: state => state.article.categoryList,
    }),
  },
  data() {
    return {
      richForm: {
        title: '',
        content: '',
        coverImage: '',
      },
      toggleCoverImage: false,
      togglePublish: false,
      coverLoading: '', // 上传封面图片的loading
      itemActive: '',
    };
  },
  methods: {
    ...mapActions(['insertArticle', 'getCategoryList']),
    ...mapMutations(['CHANGESHOWUSERDROPDOWN']),
    // 打开loading
    openLoading() {
      this.coverLoading = '';
      this.coverLoading = this.$loading({
        target: document.getElementById('coverImage-wrapper'),
      });
    },
    closeLoading() {
      this.coverLoading.close();
    },
    handleToggleCoverImage() {
      this.toggleCoverImage = !this.toggleCoverImage;
    },
    handleTogglePublish() {
      this.togglePublish = !this.togglePublish;
    },
    handleQuillEditorInput(value) {
      if (value) {
        console.log(value);
        this.richForm.content = value;
      }
    },
    handleGoHome() {
      this.$router.push({ name: 'home' });
    },
    handleUpload() {
      this.$refs['customizeUpload'] &&
        this.$refs['customizeUpload'].handleUpload();
    },
    handleStartUpload() {
      this.openLoading();
    },
    handleImageUrl(url) {
      this.closeLoading();
      this.richForm.coverImage = url;
    },
    handleAvatarClick(e) {
      e.stopPropagation();
      this.CHANGESHOWUSERDROPDOWN();
    },
    async handleInsertArticle() {
      try {
        const { title, content, coverImage } = this.richForm;
        const { itemActive } = this;
        if (title && content && itemActive) {
          const params = {
            categoryId: itemActive,
            companyId: 1,
            userId: 1,
            title,
            content,
            image: coverImage,
            status: 'ARTICLE_STATUS_CHECKING', // 待审核状态
          };
          const res = await this.insertArticle(params);
          this.handleTogglePublish();
          if (res && res.message) {
            alert(res.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    queryCategoryList() {
      // 做好登录之后需要去掉这个参数
      const params = {
        companyId: 1,
      };
      this.getCategoryList(params);
    },
  },
  created() {
    this.queryCategoryList();
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
