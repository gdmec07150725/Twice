import storage from '@/utils/storage';

const mutations = {
  CHANGECOLLAPSE(state) {
    state.collapse = !state.collapse;
  },
  CLOSECOLLAPSE(state, data) {
    state.collapse = data;
  },
  CHANGESHOWADDLIST(state) {
    state.toggleShowAddList = !state.toggleShowAddList;
  },
  CHANGESHOWUSERDROPDOWN(state) {
    state.toggleShowUserDropDown = !state.toggleShowUserDropDown;
  },
  CLOSEDROUPDOWN(state) {
    state.toggleShowAddList = false;
    state.toggleShowUserDropDown = false;
  },
  GET_USER_DETAIL(state) {
    const userStr = storage.getUserDetail();
    state.user = userStr ? JSON.parse(userStr) : {};
  },
};
export default mutations;
