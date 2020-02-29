<template>
  <div>
    <parent-constant-list />
  </div>
</template>
<script>
import parentConstantList from '@/views/businessComponent/settings/constant/parentConstantList.vue';
import store from '@/store';
export default {
  name: 'parentConstant',
  components: {
    parentConstantList,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name !== 'childConstant') {
      // 重设表格过滤项和分页
      store.commit('REST_PARENTCONSTANT_PAGINATION');
      const filterParams = {
        key: null,
      };
      store.commit('RESET_FILTER_AND_SORT', {
        filterParams,
        page: 'constant',
      });
    }
    next();
  },
};
</script>
