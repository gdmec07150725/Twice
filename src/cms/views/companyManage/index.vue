<template>
  <div>
    <company-list />
  </div>
</template>
<script>
import companyList from '@/businessComponent/companyManage/companyList.vue';
import store from '@/store';
export default {
  name: 'companyManage',
  components: {
    companyList,
  },
  beforeRouteEnter(to, from, next) {
    // 重设表格过滤项和分页
    store.commit('REST_COMPANY_PAGINATION');
    const filterParams = {
      type: [],
      name: null,
    };
    const filterInputValueParams = {
      type: '',
    };
    store.commit('RESET_FILTER_AND_SORT', {
      filterParams,
      filterInputValueParams,
      page: 'company',
    });
    next();
  },
};
</script>
