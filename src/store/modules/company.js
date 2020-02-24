/* eslint-disable no-unused-vars */
/**
 * 审计日志
 */
import company from '@/api/company';

const defaultPagination = {
  page: 1,
  rows: 10,
  total: 0,
};
const state = {
  companyTablePagination: defaultPagination,
  companyList: [],
};

const mutations = {
  SETCOMPANYLIST(state, data) {
    const { companyTablePagination } = state;
    let { companyList } = state;
    companyTablePagination.page = data.currentPage;
    companyTablePagination.total = data.total;
    companyList = data.result;
    state.companyTablePagination = { ...companyTablePagination };
    state.companyList = [...companyList];
  },
  SET_COMPANY_PAGINATION(state, currentPage) {
    const { companyTablePagination } = state;
    companyTablePagination.page = currentPage;
    state.companyTablePagination = { ...companyTablePagination };
  },
  REST_COMPANY_PAGINATION(state) {
    const { companyTablePagination } = state;
    companyTablePagination.page = 1;
    companyTablePagination.total = 0;
    state.companyTablePagination = { ...companyTablePagination };
  },
};
const actions = {
  // 获取公司数据
  getAllCompanyList({ commit }, params) {
    return new Promise((resolve, reject) => {
      company
        .getAllCompany(params)
        .then(res => {
          resolve(res);
          commit('SETCOMPANYLIST', res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 新增公司
  addNewCompany({ commit }, params) {
    return new Promise((resolve, reject) => {
      company
        .addNewCompany(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 修改公司
  modifyCompany({ commit }, params) {
    return new Promise((resolve, reject) => {
      company
        .modifyCompany(params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 删除公司
  deleteCompany({ commit }, id) {
    return new Promise((resolve, reject) => {
      company
        .deleteCompany(id)
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
