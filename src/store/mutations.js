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
};
export default mutations;
