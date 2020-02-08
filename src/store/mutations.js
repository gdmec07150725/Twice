const mutations = {
  CHANGECOLLAPSE(state) {
    state.collapse = !state.collapse;
  },
  CLOSECOLLAPSE(state, data) {
    state.collapse = data;
  },
};
export default mutations;
