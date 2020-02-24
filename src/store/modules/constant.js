/**
 * 常量
 */
import constant from '@/api/constant';

const state = {
  constant: {},
};

const mutations = {
  SAVECONSTANT(state, constantValue) {
    state.constant = constantValue;
  },
};

const actions = {
  // 获取所有常量数据
  getAllConstant({ commit }) {
    return new Promise(() => {
      constant
        .getAllConstant()
        .then(res => {
          commit('SAVECONSTANT', res);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  getConstantBeforeRequest({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 有常量直接返回
      if (JSON.stringify(state.constant) !== '{}') {
        resolve(state.constant);
      } else {
        // 触发常量请求
        constant
          .getAllConstant()
          .then(res => {
            resolve(res);
            commit('SAVECONSTANT', res);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
