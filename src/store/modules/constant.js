/* eslint-disable no-unused-vars */
/**
 * 常量
 */
import constant from '@/api/constant';

const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};

const state = {
  constant: {},
  parentConstantList: [],
  childConstantList: [],
  parentConstantTablePagination: { ...defaultPagination },
};

const mutations = {
  SAVECONSTANT(state, constantValue) {
    state.constant = constantValue;
  },
  SET_PARENTCONSTANT_LIST(state, data) {
    const { parentConstantTablePagination } = state;
    let { parentConstantList } = state;
    parentConstantTablePagination.page = data.currentPage;
    parentConstantTablePagination.total = data.total;
    parentConstantList = data.result;
    state.parentConstantTablePagination = { ...parentConstantTablePagination };
    state.parentConstantList = [...parentConstantList];
  },
  SET_CHILDCONSTANT_LIST(state, data) {
    let { childConstantList } = state;
    childConstantList = data;
    state.childConstantList = [...childConstantList];
  },
  SET_PARENTCONSTANT_PAGINATION(state, currentPage) {
    const { parentConstantTablePagination } = state;
    parentConstantTablePagination.page = currentPage;
    state.parentConstantTablePagination = { ...parentConstantTablePagination };
  },
  REST_PARENTCONSTANT_PAGINATION(state) {
    const { parentConstantTablePagination } = state;
    parentConstantTablePagination.page = 1;
    parentConstantTablePagination.total = 0;
    state.parentConstantTablePagination = { ...parentConstantTablePagination };
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
  /* 查询父级常量 */
  getParentConstantList({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .getParentConstantList(params)
        .then(res => {
          commit('SET_PARENTCONSTANT_LIST', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 新增父级常量 */
  createParentConstant({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .createParentConstant(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 编辑父级常量 */
  editParentConstant({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .editParentConstant(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 删除父级常量 */
  deleteParentConstant({ commit }, id) {
    return new Promise((resolve, reject) => {
      constant
        .deleteParentConstant(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 查询子级常量 */
  getChildConstantList({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .getChildConstantList(params)
        .then(res => {
          commit('SET_CHILDCONSTANT_LIST', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 新增子级常量 */
  createChildConstant({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .createChildConstant(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 编辑子级常量 */
  editChildConstant({ commit }, params) {
    return new Promise((resolve, reject) => {
      constant
        .editChildConstant(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /* 删除子级常量 */
  deleteChildConstant({ commit }, id) {
    return new Promise((resolve, reject) => {
      constant
        .deleteChildConstant(id)
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
