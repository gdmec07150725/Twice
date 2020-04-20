/* eslint-disable no-unused-vars */
import comments from '@/api/comment';
const state = {};
const mutations = {};
const actions = {
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
};
export default {
  state,
  mutations,
  actions,
};
