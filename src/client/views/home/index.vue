<template>
  <div class="view welcome-view">
    <second-nav>
      <template slot="list">
        <li
          v-for="item in categoryList"
          :key="item.id"
          :class="['nav-item', secondItem === item.id ? 'nav-item-active' : '']"
          @click="() => handleSecondNavClick(item.id)"
        >
          <div class="category-popover-box">{{ item.name }}</div>
        </li>
      </template>
    </second-nav>
    <div class="timeline-container" v-if="childCategory.length > 0">
      <third-nav>
        <template slot="list">
          <li
            :class="[
              'nav-item',
              'tag',
              secondItem && !thirdItem ? 'active' : '',
            ]"
            @click="() => handleThirdNavClick('')"
          >
            <a>全部</a>
          </li>
          <li
            v-for="item in childCategory"
            :key="item.id"
            :class="['nav-item', 'tag', thirdItem === item.id ? 'active' : '']"
            @click="() => handleThirdNavClick(item.id)"
          >
            <a>{{ item.name }}</a>
          </li>
        </template>
      </third-nav>
    </div>
    <!-- 列表 -->
    <div class="welcome-context">
      <context-left>
        <div slot="leftContent">
          <nav class="category-nav nav">
            <header class="list-header">
              <nav class="list-nav">
                <ul class="filter-list left">
                  <li class="filter-item">
                    <a>热门</a>
                  </li>
                  <li class="filter-item">
                    <a>最新</a>
                  </li>
                  <li class="filter-item">
                    <a>热榜</a>
                  </li>
                </ul>
              </nav>
            </header>
          </nav>
          <ul
            class="context-list"
            :canScroll="canScroll"
            v-scroll-to-load="judgePagination"
          >
            <li
              class="context-item"
              v-for="item in articleList"
              :key="item.id"
              @click="() => handleReadDetail(item)"
            >
              <div class="context">
                <a class="context-link">
                  <div class="context-detail">
                    <div class="context-info">
                      <div class="meta-row">
                        <ul class="meta-list">
                          <li class="item post">专栏</li>
                          <li class="item username">
                            <div class="user-popover-box">
                              <a href="#">Tony</a>
                            </div>
                          </li>
                          <li class="item time">5分钟前</li>
                          <li class="item tag">
                            <a href="#" class="tag">JavaScript</a>
                          </li>
                        </ul>
                      </div>
                      <div class="title-row">
                        <router-link
                          :to="{ name: 'articleDetail' }"
                          class="title"
                        >
                          {{ item.title }}
                        </router-link>
                      </div>
                      <action-icon />
                    </div>
                    <div data-src class="lazy thumb" v-if="item.image">
                      <img :src="item.image" width="100%" height="100%" />
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </context-left>
      <context-right />
    </div>
  </div>
</template>

<script>
import secondNav from '@/components/NavBar/secondNav';
import thirdNav from '@/components/NavBar/thirdNav';
import contextLeft from '@/components/context/contextLeft.vue';
import contextRight from '@/components/context/contextRight.vue';
import actionIcon from '@/businessComponent/actionIcon';
import { mapState, mapMutations, mapActions } from 'vuex';
import store from '@/store';

export default {
  name: 'home',
  components: {
    secondNav,
    thirdNav,
    contextLeft,
    contextRight,
    actionIcon,
  },
  computed: {
    ...mapState({
      articleList: state => state.article.clientArticleList,
      categoryList: state => state.article.categoryList,
      childCategory: state => state.article.childCategory,
      pagination: state => state.article.clientArticlePagination,
      secondItem: state => state.article.secondItem,
      thirdItem: state => state.article.thirdItem,
    }),
  },
  beforeRouteEnter(to, from, next) {
    // 重设文章数据和分页
    store.commit('REST_CLIENT_ARTICLE_LIST');
    store.commit('REST_CLIENT_PAGINATION');
    next();
  },
  data() {
    return {
      canScroll: true,
    };
  },
  methods: {
    ...mapActions([
      'getClientArticleList',
      'getCategoryList',
      'getChildCategory',
    ]),
    ...mapMutations([
      'SET_SECOND_CATEGORY',
      'SET_THIRD_CATEGORY',
      'REST_CLIENT_ARTICLE_LIST',
      'REST_CLIENT_PAGINATION',
    ]),
    handleSecondNavClick(id) {
      this.SET_SECOND_CATEGORY(id);
      // 请求二级分类
      this.querChildCategoryList(id);
      this.REST_CLIENT_ARTICLE_LIST(); // 清空文章数据
      this.loadListData({ page: 1 });
    },
    handleThirdNavClick(id) {
      this.SET_THIRD_CATEGORY(id);
      this.REST_CLIENT_ARTICLE_LIST(); // 清空文章数据
      // 请求文章数据
      this.loadListData({ page: 1 });
    },
    judgePagination() {
      // 判断页码，当前页码加1如果大于或总页码就不能请求了
      const { page, totalPage } = this.pagination;
      if (totalPage && page + 1 > totalPage) {
        return;
      }
      const params = {
        page: page + 1,
      };
      this.loadListData(params);
    },
    loadListData(params = {}) {
      const concatParams = {
        ...params,
        categoryId: this.thirdItem || this.secondItem,
        status: 'ARTICLE_STATUS_ADOPT', // 获取发布状态的文章
      };
      this.queryListData(concatParams);
    },
    async queryListData(params) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          companyId: 1,
          ...params,
        };
        this.canScroll = false;
        await this.getClientArticleList(concatParams);
        this.canScroll = true;
      } catch (error) {
        console.log(error);
      }
    },
    handleReadDetail(item) {
      const { id } = item;
      if (id) {
        this.$router.replace({ name: 'articleDetail', query: { id } });
      }
    },
    queryCategoryList() {
      const params = {
        companyId: 1,
        page: 1,
        rows: 999, // 最大程度获取所有数据（一级一般不会很多数据）
      };
      this.getCategoryList(params);
    },
    querChildCategoryList(pId) {
      if (pId) {
        const params = {
          page: 1,
          rows: 999, // 最大程度获取所有数据(Todo： 后面可以改为更多)
          id: pId,
        };
        this.getChildCategory(params);
      }
    },
  },
  created() {
    this.judgePagination();
    this.queryCategoryList();
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
