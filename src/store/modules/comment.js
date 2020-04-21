/* eslint-disable no-unused-vars */
import comments from '@/api/comment';
const state = {};
const mutations = {};
const actions = {
  /* 获取评论列表 */
  getCommentList({ comment }, params) {
    return new Promise((resolve, reject) => {
      comments
        .getCommentList(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 发布评论 */
  publishComment({ commit }, params) {
    return new Promise((resolve, reject) => {
      comments
        .publishComment(params)
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
