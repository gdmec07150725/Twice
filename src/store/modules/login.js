/* eslint-disable no-unused-vars */
import login from '@/api/login';
import Ajax from '@/utils/ajax';
import configs from '@/configs';
const ajax = new Ajax(configs.serverURL);

const state = {};
const mutations = {};
const actions = {
  // 登录
  logIn({ commit }, params) {
    return new Promise((resolve, reject) => {
      const url = '/login-service/login';
      ajax
        .post(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          if (!error.response) {
            return reject(error);
          }
          const body = error.response.data;
          reject(body);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
