<template>
  <div class="welcome-context">
    <div class="trend-suspended">
      <ul class="navigation">
        <li
          class="nav-item"
          :class="{ active: navigationAction === item.value }"
          v-for="item in navigationList"
          :key="item.value"
          @click="navigationAction = item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <context-left>
      <div slot="leftContent" class="leftContent">
        <div class="trend-main">
          <div class="trend-editor-wrapper">
            <div class="trend-editor">
              <div
                class="trend-input"
                contenteditable="true"
                @input="handleInput($event)"
              />
              <div class="trend-image-wrapper" v-if="imageList.length > 0">
                <div
                  class="image-item"
                  v-for="(item, index) in imageList"
                  :key="index"
                >
                  <img :src="item" width="100%" height="100%" />
                  <span class="delete" @click="handleDelete(index)">
                    <icon-font
                      icon="icon-close"
                      :size="10"
                      class="image-close-icon"
                      color="#fff"
                    />
                  </span>
                </div>
                <div class="image-item" @click="handleImageClick">
                  <icon-font
                    icon="icon-add"
                    :size="20"
                    class="image-add-icon"
                    color="#8c939d"
                  />
                </div>
              </div>
            </div>
            <action
              :show="true"
              :showImageIcon="true"
              @onHandleImageClick="handleImageClick"
              @onHandleSubmit="handleSubmit"
            />
            <customizeUpload
              ref="customizeUpload"
              @onHandleStartUpload="handleStartUpload"
              @onHandleImageUrl="handleImageUrl"
            />
          </div>
          <template v-if="trendsList.length > 0">
            <div
              class="trend-content-wrapper"
              v-for="(item, index) in trendsList"
              :key="index"
            >
              <div class="author-info-block">
                <user-avatar :url="avatarImage" />
                <div class="author-info-box">
                  <a target="_blank" class="username ellipsis">
                    Tony
                  </a>
                  <div class="meta-box">
                    <time class="time">8小时前</time>
                  </div>
                </div>
              </div>
              <div class="content-box">
                <div class="content-text">
                  {{ item.content }}
                </div>
                <div class="content-image"></div>
              </div>
              <div class="trend-action-wrapper">
                <div class="like action-btn">
                  <icon-font icon="icon-zan2" color="#cdcdcd" />
                </div>
                <div
                  class="comment action-btn"
                  @click="toggleShowComment(item.id)"
                >
                  <icon-font icon="icon-pinglun" color="#cdcdcd" />
                </div>
              </div>
              <div class="trend-comment-wrapper" v-if="showComment">
                <comment
                  :key="commentKey"
                  :commentList="commentList"
                  @onHandleReplyArticle="
                    content => handleReplyArticle(content, item.id)
                  "
                  @onHandleReplyComment="
                    content => handleReplyComment(content, item.id)
                  "
                />
                <div class="container">
                  <em class="triangle"></em>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </context-left>
    <context-right />
  </div>
</template>
<script>
import contextLeft from '@/components/context/contextLeft.vue';
import contextRight from '@/components/context/contextRight.vue';
import action from '@/components/comment/action.vue';
import customizeUpload from '@/components/customizeUpload';
import userAvatar from '@/components/userAvatar';
import comment from '@/components/comment';
import { mapActions } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'trend',
  components: {
    contextLeft,
    contextRight,
    action,
    customizeUpload,
    userAvatar,
    comment,
  },
  data() {
    return {
      imageList: [
        'https://forum-dev.oss-cn-shenzhen.aliyuncs.com/test/2020-04-28/ff452c831d274186b20d6c44a1f95ef6-banner3.jpg',
      ],
      avatarImage:
        'https://forum-dev.oss-cn-shenzhen.aliyuncs.com/test/2020-04-24/158c77064a6c4c9589ca102f29f97f5d-u=4021323957,90575369&fm=15&gp=0.jpg',
      trendContent: '',
      trendsList: [],
      commentList: [],
      commentKey: Date.now(),
      showComment: false,
      navigationList: [
        {
          label: '全部',
          value: 1,
        },
        {
          label: '自己',
          value: 2,
        },
        {
          label: '关注',
          value: 3,
        },
      ],
      navigationAction: 1,
    };
  },
  methods: {
    ...mapActions([
      'addTrend',
      'getAllTrendByCompany',
      'publishComment',
      'getCommentList',
    ]),
    toggleShowComment(id) {
      this.showComment = !this.showComment;
      this.handleGetTrendComment(id);
    },
    handleInput(e) {
      this.trendContent = e.target.innerHTML;
    },
    handleImageClick() {
      this.$refs['customizeUpload'] &&
        this.$refs['customizeUpload'].handleUpload();
    },
    handleStartUpload() {
      // this.openLoading();
    },
    handleImageUrl(url) {
      // this.closeLoading();
      this.imageList.push(url);
    },
    handleDelete(index) {
      this.imageList.splice(index, 1);
      console.log(this.imageList);
    },
    handleSubmit() {
      if (this.trendContent) {
        const params = {
          content: this.trendContent,
          userId: JSON.parse(storage.getUserDetail()).id,
          companyId: JSON.parse(storage.getCompanyDetail()).id,
        };
        this.createNewTrend(params);
      }
    },
    handleReplyComment(params, contentId) {
      const concatParams = {
        replyId: params.replyId,
        content: params.replyContent,
        contentId,
        type: 'COMMENT_TYPE_TREND',
        userId: JSON.parse(storage.getUserDetail()).id,
      };
      this.replyTrend(concatParams);
    },
    handleReplyArticle(content, contentId) {
      const params = {
        content,
        contentId,
        replyId: 0,
        type: 'COMMENT_TYPE_TREND',
        userId: JSON.parse(storage.getUserDetail()).id,
      };
      this.replyTrend(params);
    },
    async replyTrend(params) {
      try {
        await this.publishComment(params);
        this.handleGetTrendComment(params.contentId);
      } catch (error) {
        console.log(error);
      }
    },
    async createNewTrend(params) {
      try {
        await this.addTrend(params);
        this.trendContent = '';
        this.queryAllTrend();
      } catch (error) {
        console.log(error);
      }
    },
    async queryAllTrend() {
      try {
        const id = JSON.parse(storage.getCompanyDetail()).id;
        this.trendsList = this.trendsList.concat(
          await this.getAllTrendByCompany(id)
        );
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetTrendComment(articleId) {
      try {
        const params = {
          contentId: articleId,
          type: 'COMMENT_TYPE_TREND',
        };
        const res = await this.getCommentList(params);
        this.commentList = res;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.queryAllTrend();
  },
};
</script>
<style lang="less" scoped>
.trend-suspended {
  position: fixed;
  top: 75px;
  width: 110px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 2px;
  .navigation {
    padding: 12px;
    .nav-item {
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-radius: 3px;
      font-size: 14px;
      color: #909090;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &.active {
        background-color: #007fff;
        color: #fff;
      }
      &:hover {
        color: #007fff;
        background: hsla(0, 0%, 94.9%, 0.6);
      }
    }
  }
}
.leftContent {
  display: flex;
  justify-content: flex-end;
  .trend-main {
    width: 570px;
  }
}
.trend-editor-wrapper {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  .trend-editor {
    min-height: 90px;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 10px;
    .trend-input {
      flex: 1;
      min-height: 75px;
      padding: 8px 10px;
    }
    .trend-image-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 12px;
      .image-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 2px;
        border: 1px dashed #c5c5c5;
        background: #f8f8f9;
        margin-right: 10px;
        .image-add-icon {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 80px;
          text-align: center;
          cursor: pointer;
        }
        .delete {
          width: 18px;
          height: 18px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 5px;
          right: 5px;
          border-radius: 50%;
          border: 1px solid #c5c5c5;
          background: rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }
      }
    }
  }
}
.trend-content-wrapper {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px 15px 0 15px;
  .author-info-block {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .author-info-box {
      min-width: 0;
      flex-grow: 1;
      .username {
        display: inline-block;
        max-width: 100%;
        font-size: 15px;
        font-weight: 700;
        color: #333;
      }
      .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta-box {
        font-size: 13px;
        color: #909090;
      }
      .time {
        letter-spacing: 1px;
      }
    }
  }
  .content-box {
    margin-left: 52px;
    margin-bottom: 20px;
    font-size: 16px;
  }
}
.trend-action-wrapper {
  height: 35px;
  border-top: 1px solid #eee;
  margin: 0 -15px;
  display: flex;
  .action-btn {
    position: relative;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -12px;
      width: 1px;
      height: 24px;
      background-color: #ebebeb;
    }
  }
}
.trend-comment-wrapper {
  position: relative;
  padding: 15px;
  margin: 0 -15px;
  border-top: 1px solid #eee;
  .container {
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
}
</style>
