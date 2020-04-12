/* eslint-disable no-unused-vars */
import authorization from '@/api/authorization';
const state = {};
const mutations = {};
const actions = {
  /* 获取所有权限点数据 */
  getAllAuth({ commit }) {
    return new Promise((resolve, reject) => {
      authorization
        .getAllAuth()
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 根据权限id查询权限信息 */
  getAuthById({ commit }, id) {
    return new Promise((resolve, reject) => {
      authorization
        .getAuthById(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 修改权限信息 */
  editAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      authorization
        .editAuth(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 新增权限点 */
  createAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      authorization
        .createAuth(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 删除权限 */
  deleteAuth({ commit }, id) {
    return new Promise((resolve, reject) => {
      authorization
        .deleteAuth(id)
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
