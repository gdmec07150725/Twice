/* eslint-disable no-unused-vars */
import article from '@/api/article';

const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};
const clientDefaultPagination = {
  page: 0,
  rows: 10,
  total: 0,
  totalPage: 0,
};

const state = {
  cmsArticleList: [],
  cmsArticlePagination: { ...defaultPagination },
  clientArticleList: [],
  clientArticlePagination: { ...clientDefaultPagination },
  categoryList: [],
  childCategory: [],
  secondItem: '', // 选中的一级分类
  thirdItem: '', // 选中的二级分类
};
const mutations = {
  SAVE_CMS_ARTICLE_LIST(state, data) {
    const { cmsArticlePagination } = state;
    cmsArticlePagination.page = data.currentPage;
    cmsArticlePagination.total = data.total;
    state.cmsArticlePagination = { ...cmsArticlePagination };
    state.cmsArticleList = [...data.result];
  },
  SAVE_CLIENT_ARTICLE_LIST(state, data) {
    const { clientArticlePagination } = state;
    let { clientArticleList } = state;
    clientArticlePagination.page = data.currentPage;
    clientArticlePagination.total = data.total;
    clientArticlePagination.totalPage = data.totalPage;
    state.clientArticlePagination = { ...clientArticlePagination };
    state.clientArticleList = [...clientArticleList, ...data.result];
  },
  REST_CLIENT_ARTICLE_LIST(state) {
    state.clientArticleList = [];
  },
  REST_CLIENT_PAGINATION(state) {
    state.clientArticlePagination = { ...clientDefaultPagination };
  },
  REST_CHILD_CATEGORY(state) {
    state.childCategory = [];
  },
  SAVE_CATEGORY_LIST(state, data) {
    let { categoryList } = state;
    categoryList = [...data.result];
    state.categoryList = categoryList;
  },
  SAVE_CHILD_CATEGORY(state, data) {
    let { childCategory } = state;
    childCategory = [...data.result];
    state.childCategory = childCategory;
  },
  SET_SECOND_CATEGORY(state, value) {
    state.secondItem = value;
    // 清空三级导航的选中值
    state.thirdItem = '';
  },
  SET_THIRD_CATEGORY(state, value) {
    state.thirdItem = value;
  },
};
const actions = {
  // 获取文章列表数据
  getCmsArticleList({ commit }, params) {
    return new Promise((resolve, reject) => {
      article
        .getArticleList(params)
        .then(res => {
          commit('SAVE_CMS_ARTICLE_LIST', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取文章列表数据(用户端)
  getClientArticleList({ state, commit }, params) {
    return new Promise((resolve, reject) => {
      // 只选了一级分类没有二级分类
      if (state.secondItem && !state.thirdItem) {
        article
          .getArticleListBySecondCategory(params)
          .then(res => {
            commit('SAVE_CLIENT_ARTICLE_LIST', res);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        article
          .getArticleList(params)
          .then(res => {
            commit('SAVE_CLIENT_ARTICLE_LIST', res);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  },
  // 获取文章详情
  getArticleDetail({ commit }, articleId) {
    return new Promise((resolve, reject) => {
      article
        .getArticleDetail(articleId)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 编辑文章（client用于编辑文章）
  modifyArticleDetail({ commit }, params) {
    return new Promise((resolve, reject) => {
      article
        .editArticleDetail(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 编辑文章（cms用于修改文章审核）
  approveArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      article
        .editArticleDetail(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 新增文章
  insertArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      article
        .insertArticle(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取分类数据
  getCategoryList({ commit }, params) {
    return new Promise((resolve, reject) => {
      article.getCategoryList(params).then(res => {
        commit('SAVE_CATEGORY_LIST', res);
        resolve(res);
      });
    });
  },

  // 通过一级分类查询二级分类
  getChildCategory({ commit }, params) {
    return new Promise((resolve, reject) => {
      article.getChildCategory(params).then(res => {
        commit('SAVE_CHILD_CATEGORY', res);
        resolve(res);
      });
    });
  },

  // 获取用户发布的文章
  getUserPublishArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      article.getUserPublishArticle(params).then(res => {
        resolve(res);
      });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
