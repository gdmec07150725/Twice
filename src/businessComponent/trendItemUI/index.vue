<template>
  <div>
    <div
      class="trend-content-wrapper"
      v-for="(item, index) in trendsList"
      :key="index"
    >
      <div class="author-info-block">
        <user-avatar
          :url="
            parentPage === 'trend'
              ? item.user && item.user.avatar
              : curentUserDetail.avatar
          "
        />
        <div class="author-info-box">
          <a target="_blank" class="username ellipsis">
            {{
              parentPage === 'trend'
                ? item.user && item.user.username
                : curentUserDetail.username
            }}
          </a>
          <div class="meta-box">
            <time class="time">{{ item.createdAt | relativeTime }}</time>
          </div>
        </div>
      </div>
      <div class="content-box">
        <template v-if="parentPage === 'trend'">
          <div class="content-text" v-html="item.content" />
          <!-- 图片预览组件 -->
          <trend-image-view :imageList="item.images" />
        </template>
        <template v-else>
          <router-link
            target="_blank"
            :to="{ name: 'publishArticle', query: { articleId: item.id } }"
            class="title"
          >
            {{ item.title }}
          </router-link>
        </template>
      </div>
      <div class="trend-action-wrapper">
        <div class="like action-btn">
          <icon-font icon="icon-zan2" color="#cdcdcd" />
        </div>
        <div class="comment action-btn" @click="toggleShowComment(item.id)">
          <icon-font icon="icon-pinglun" color="#cdcdcd" />
        </div>
      </div>
      <comment-wrapper
        :ref="`commentWrapper${item.id}`"
        :id="item.id"
        :parentPage="parentPage"
      />
    </div>
  </div>
</template>
<script>
import trendImageView from '@/components/trendImageView';
import userAvatar from '@/components/userAvatar';
import commentWrapper from './commentWrapper.vue';
export default {
  name: 'trendItemUI',
  components: {
    userAvatar,
    commentWrapper,
    trendImageView,
  },
  props: {
    parentPage: {
      type: String,
      defalut: 'trend', // 父级页面默认是评论页面
    },
    curentUserDetail: {
      type: Object,
      default: () => ({}),
    },
    trendsList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleShowComment(id) {
      this.$refs[`commentWrapper${id}`] &&
        this.$refs[`commentWrapper${id}`][0].toggleShowComment();
    },
  },
};
</script>
<style lang="less" scoped>
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
    margin: 0 52px 20px 52px;
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
.title {
  color: #2e3135;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.2;
}
</style>
