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
  remindersTablePagination: defaultPagination,
  remindersList: [],
};

const mutations = {
  SETREMINDERSLIST(state, data) {
    const { remindersTablePagination } = state;
    let { remindersList } = state;
    remindersTablePagination.page = data.currentPage;
    remindersTablePagination.total = data.total;
    remindersList = data.result;
    state.remindersTablePagination = { ...remindersTablePagination };
    state.remindersList = [...remindersList];
  },
  SET_REMINDERS_PAGINATION(state, currentPage) {
    const { remindersTablePagination } = state;
    remindersTablePagination.page = currentPage;
    state.remindersTablePagination = { ...remindersTablePagination };
  },
  REST_REMINDERS_PAGINATION(state) {
    const { remindersTablePagination } = state;
    remindersTablePagination.page = 1;
    remindersTablePagination.total = 0;
    state.remindersTablePagination = { ...remindersTablePagination };
  },
};
const actions = {
  // 获取提醒事项列表数据
  getRemindersList({ commit }, params) {
    return new Promise((resolve, reject) => {
      company
        .getAllCompany(params)
        .then(res => {
          resolve(res);
          commit('SETREMINDERSLIST', res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 新增公司
  addNewReminders({ commit }, params) {
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
  modifyReminders({ commit }, params) {
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
  deleteReminders({ commit }, id) {
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
