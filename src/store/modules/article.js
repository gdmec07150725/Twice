/* eslint-disable no-unused-vars */
import article from '@/api/article';
const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};

const state = {
  articleList: [],
  pagination: { ...defaultPagination },
};
const mutations = {
  SAVE_ARTICLE_LIST(state, data) {
    const { pagination } = state;
    pagination.page = data.currentPage;
    pagination.total = data.total;
    state.pagination = { ...pagination };
    state.articleList = [...data.result];
  },
};
const actions = {
  // 获取文章列表数据
  getArticleList({ commit }, params) {
    return new Promise((resolve, reject) => {
      article
        .getArticleList(params)
        .then(res => {
          commit('SAVE_ARTICLE_LIST', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
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
};

export default {
  state,
  mutations,
  actions,
};
