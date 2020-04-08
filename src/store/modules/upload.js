/* eslint-disable no-unused-vars */
/**
 * 审计日志
 */
import upload from '@/api/upload';

const state = {};

const mutations = {};
const actions = {
  // 上传单张图片
  uploadSingleImage({ commit }, formData) {
    return new Promise((resolve, reject) => {
      upload
        .uploadSingleImage(formData)
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
