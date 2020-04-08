<template>
  <div class="paginationPosition" v-if="total > 0">
    <div class="paginationMain">
      <div class="paginationMain-right page">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :hide-on-single-page="true"
          :current-page="currentPage"
          :total="total"
          :pageSize="pageSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
export default {
  name: 'MPagination',
  components: {
    'el-pagination': Pagination,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('onHandleSizeChane', size);
    },
    handleCurrentChange(currentPage) {
      this.$emit('onHandleCurrentChange', currentPage);
    },
  },
};
</script>

<style lang="less">
.paginationPosition {
  margin-top: 15px;
}
.paginationMain {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
