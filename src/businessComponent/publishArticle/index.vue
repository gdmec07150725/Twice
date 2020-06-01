<template>
  <div class="editor-wrapper">
    <div class="rich-text-editor">
      <header class="rich-text-editor-header">
        <div class="header-content">
          <div class="logo" @click="handleGoHome">
            <img src="@/assets/img/logo_big.png" />
          </div>
          <div class="status-text with-padding">
            文章将会自动保存至
            <a>草稿</a>
          </div>
          <div
            class="main-image-selector with-padding unset"
            v-click-out="handleCloseCoverImage"
          >
            <div
              class="toggle-btn"
              :class="{ hasCoverImage: richForm.coverImage ? true : false }"
              @click="handleToggleCoverImage"
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
          <div
            class="publish-popup with-padding"
            v-click-out="handleClosePublish"
          >
            <div class="toggle-btn" @click="handleTogglePublish">
              <span class="title">
                发布
              </span>
            </div>
            <div class="panel" v-if="togglePublish">
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
          <nav class="navigator main-navigator with-padding">
            <avatar-navigation />
          </nav>
        </div>
      </header>
      <main class="rich-text-editor-main">
        <div id="title-input-hidden" class="title-input" style="height: 0">
          {{ richForm.title }}
        </div>
        <textarea
          placeholder="请输入标题"
          maxlength="80"
          rows="1"
          id="title-input"
          class="title-input"
          v-model="richForm.title"
          @keyup="handleTitleInput"
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
import { mapActions, mapState } from 'vuex';
import avatarNavigation from '@/components/avatarNavigation';
import quillEditor from '_c/quillEditor/quillEditor.vue';
import customizeUpload from '_c/customizeUpload';
import storage from '@/utils/storage';

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
    handleCloseCoverImage() {
      this.toggleCoverImage = false;
    },
    handleTogglePublish() {
      this.togglePublish = !this.togglePublish;
    },
    handleClosePublish() {
      this.togglePublish = false;
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
    handleTitleInput(e) {
      // 通过获取文本域的滚动高度，动态设置文本域的高度
      const target = e.target;
      // const scrollHeight = target.scrollHeight;
      // console.log('height', target.style.height);
      // console.log('scrollHeight', scrollHeight);
      // if (scrollHeight > 61) {
      //   target.style.height = `
      //     ${scrollHeight - 12}px
      //   `;
      // } else {
      //   target.style.height = '49px';
      // }
      this.$nextTick(() => {
        const scrollHeight = document.getElementById('title-input-hidden')
          .scrollHeight;
        console.log('scrollHeight', scrollHeight);
        // const finalHeight = scrollHeight + 12;
        // console.log('finalHeight', finalHeight);
        if (scrollHeight > 55) {
          target.style.height = `${scrollHeight}px`;
        } else {
          target.style.height = '55px';
        }
      });
    },
    async handleInsertArticle() {
      try {
        const { title, content, coverImage } = this.richForm;
        const { itemActive } = this;
        if (title && content && itemActive) {
          const params = {
            categoryId: itemActive,
            companyId: JSON.parse(storage.getCompanyDetail()).id,
            userId: JSON.parse(storage.getUserDetail()).id,
            title,
            content,
            image: coverImage,
            status: 'ARTICLE_STATUS_CHECKING', // 待审核状态
          };
          const res = await this.insertArticle(params);
          this.handleClosePublish();
          if (res && res.message) {
            alert(res.message);
            this.$router.push({ name: 'home' });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    queryCategoryList() {
      // 做好登录之后需要去掉这个参数
      const params = {
        companyId: JSON.parse(storage.getCompanyDetail()).id,
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
