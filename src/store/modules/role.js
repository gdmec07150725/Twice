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
};

export default {
  state,
  mutations,
  actions,
};
