/**
 * 审计日志
 */
import company from '@/api/company';

const defaultPagination = {
  page: 1,
  size: 10,
  total: 0,
};
const state = {
  companyTablePagination: defaultPagination,
  companyList: [],
};

const mutations = {};
const actions = {
  // 获取公司数据
  getAllCompanyList() {
    return new Promise((resolve, reject) => {
      company
        .getAllCompany()
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
