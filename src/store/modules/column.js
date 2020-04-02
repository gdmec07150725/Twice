/* eslint-disable no-unused-vars */
/**
 * 审计日志
 */
import column from '@/api/column';

const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};
const state = {
  parentTablePagination: { ...defaultPagination },
  parentColumnList: [],
  childColumnList: [],
  childTablePagination: { ...defaultPagination },
};

const mutations = {
  SAVE_PARENT_COLUMN(state, data) {
    const { parentTablePagination } = state;
    let { parentColumnList } = state;
    parentTablePagination.page = data.currentPage;
    parentTablePagination.total = data.total;
    parentColumnList = data.result;
    state.parentTablePagination = { ...parentTablePagination };
    state.parentColumnList = [...parentColumnList];
  },
  SAVE_CHILD_COLUMN(state, data) {
    const { childTablePagination } = state;
    let { childColumnList } = state;
    childTablePagination.page = data.currentPage;
    childTablePagination.total = data.total;
    childColumnList = data.result;
    state.childTablePagination = { ...childTablePagination };
    state.childColumnList = [...childColumnList];
  },
  SET_PARENT_PAGINATION(state, currentPage) {
    const { parentTablePagination } = state;
    parentTablePagination.page = currentPage;
    state.parentTablePagination = { ...parentTablePagination };
  },
  REST_PARENT_PAGINATION(state) {
    const { parentTablePagination } = state;
    parentTablePagination.page = 1;
    parentTablePagination.total = 0;
    state.parentTablePagination = { ...parentTablePagination };
  },
};
const actions = {
  // 获取父级专栏
  getParentColumn({ commit }, params) {
    return new Promise((resolve, reject) => {
      params.companyId = 1; // 后面做好登录之后需要去掉
      column
        .getParentColumn(params)
        .then(res => {
          resolve(res);
          commit('SAVE_PARENT_COLUMN', res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取二级专栏
  getChildColumn({ commit }, params) {
    return new Promise((resolve, reject) => {
      column
        .getChildrenColumn(params)
        .then(res => {
          commit('SAVE_CHILD_COLUMN', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 新增专栏
  addColumn({ commit }, params) {
    return new Promise((resolve, reject) => {
      params.companyId = 1; // 后面做好登录之后需要去掉
      column
        .addColumn(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 编辑专栏
  editColumn({ commit }, params) {
    return new Promise((resolve, reject) => {
      column
        .editColumn(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 删除专栏
  delColumn({ commit }, id) {
    return new Promise((resolve, reject) => {
      column
        .delColumn(id)
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
