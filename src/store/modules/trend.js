/* eslint-disable no-unused-vars */
import trend from '@/api/trend';
const state = {};
const mutations = {};
const actions = {
  // 新增动态
  addTrend({ commit }, params) {
    return new Promise((resolve, reject) => {
      trend
        .addTrend(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取公司的所有动态
  getAllTrendByCompany({ commit }, id) {
    return new Promise((resolve, reject) => {
      trend
        .getAllTrendByCompany(id)
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
