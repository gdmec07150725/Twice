/**
 * 页面回显(搜索，排序)
 */
const defaultSort = {
  sortTarget: '',
  targetValue: '',
};

const state = {
  // 检索：区分不同页面
  filter: {
    article: {
      title: null,
    },
    company: {
      name: null,
      type: [],
    },
    reminders: {
      content: null,
      // status: [],
    },
    constant: {
      key: null,
    },
    staff: {
      username: null,
    },
  },
  // 检索的input：区分不同页面
  filterInput: {
    company: {
      type: '',
    },
    reminders: {
      status: '',
    },
  },
  // 排序：区分不同页面
  sort: {
    company: { ...defaultSort },
    reminders: { ...defaultSort },
  },
};

const mutations = {
  // 检索和排序都通过page来区分页面
  CHANGEFILTER(state, filterParams) {
    const { filterKey, filterValue, page } = filterParams;
    const filter = state.filter[page];
    filter[filterKey] = filterValue;
    state.filter[page] = { ...filter };
  },
  CHANGEFILTERINPUT(state, filterInputParams) {
    const { filterInputKey, filterInputValue, page } = filterInputParams;
    const filterInput = state.filterInput[page];
    filterInput[filterInputKey] = filterInputValue;
    state.filterInput[page] = { ...filterInput };
  },
  CHANGESORT(state, sortParams) {
    const { sortKey, sortValue, page } = sortParams;
    state.sort[page].sortTarget = sortKey;
    state.sort[page].targetValue = sortValue;
  },
  RESET_FILTER_AND_SORT(state, defaultParams) {
    const {
      // sortParams,
      filterParams,
      filterInputValueParams,
      page,
    } = defaultParams;
    if (state.filter[page]) {
      state.filter[page] = { ...filterParams };
    }
    // if (state.sort[page]) {
    //   state.sort[page] = { ...sortParams };
    // }
    if (state.filterInput[page]) {
      state.filterInput[page] = { ...filterInputValueParams };
    }
  },
};

export default {
  state,
  mutations,
};
