<template>
  <div>
    <parent-column-list />
  </div>
</template>

<script>
import parentColumnList from '@/businessComponent/columnManage/parentColumnList.vue';
export default {
  name: 'columnManage',
  components: {
    parentColumnList,
  },
};
</script>
