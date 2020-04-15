/* eslint-disable no-unused-vars */
import role from '@/api/role';
const state = {};
const mutations = {};
const actions = {
  /* 查询角色 */
  getRole({ commit }) {
    return new Promise((resolve, reject) => {
      role
        .getRole()
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 查询角色权限 */
  getRoleAuth({ commit }, id) {
    return new Promise((resolve, reject) => {
      role
        .getRoleAuth(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 新增角色 */
  addRole({ commit }, params) {
    return new Promise((resolve, reject) => {
      role
        .addRole(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 编辑角色 */
  editRole({ commit }, params) {
    return new Promise((resolve, reject) => {
      role
        .editRole(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 删除角色 */
  deleteRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      role
        .deleteRole(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 给角色分配权限 */
  assignAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      role
        .assignAuth(params)
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
