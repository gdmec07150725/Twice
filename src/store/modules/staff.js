/* eslint-disable no-unused-vars */
import staff from '@/api/staff';

const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};

const state = {
  staffList: [],
  staffPagination: { ...defaultPagination },
};
const mutations = {
  SAVE_STAFF_LIST(state, data) {
    if (!data) return;
    const { staffPagination } = state;
    let { staffList } = state;
    staffPagination.page = data.currentPage;
    staffPagination.total = data.total;
    staffList = data.result;
    state.staffPagination = { ...staffPagination };
    state.staffList = [...staffList];
  },
  SET_STAFF_PAGINATION(state, currentPage) {
    const { staffPagination } = state;
    staffPagination.page = currentPage;
    state.staffPagination = { ...staffPagination };
  },
  REST_STAFF_PAGINATION(state) {
    const { staffPagination } = state;
    staffPagination.page = 1;
    staffPagination.total = 0;
    state.staffPagination = { ...staffPagination };
  },
};
const actions = {
  // 根据公司id获取公司的所有用户
  getStaffListByCompanyId({ commit }, params) {
    return new Promise((resolve, reject) => {
      staff
        .getStaffListByCompanyId(params)
        .then(res => {
          commit('SAVE_STAFF_LIST', res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 新增用户
  addStaff({ commit }, params) {
    return new Promise((resolve, reject) => {
      staff
        .addStaff(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 修改用户信息
  editStaff({ commit }, params) {
    return new Promise((resolve, reject) => {
      staff
        .editStaff(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 删除用户
  deleteStaff({ commit }, id) {
    return new Promise((resolve, reject) => {
      staff
        .deleteStaff(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据用户id获取用户详情
  getStaffDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      staff
        .getStaffDetail(id)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 为用户分配角色
  assignRoleToStaff({ commit }, params) {
    return new Promise((resolve, reject) => {
      staff
        .assignRoleToStaff(params)
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
