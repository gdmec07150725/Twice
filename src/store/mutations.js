import storage from '@/utils/storage';

const mutations = {
  CHANGECOLLAPSE(state) {
    state.collapse = !state.collapse;
  },
  CLOSECOLLAPSE(state, data) {
    state.collapse = data;
  },
  GET_USER_DETAIL(state) {
    const userStr = storage.getUserDetail();
    state.user = userStr ? JSON.parse(userStr) : {};
  },
};
export default mutations;
