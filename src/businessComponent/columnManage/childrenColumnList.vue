<template>
  <div class="constant-list">
    <p class="title">专栏管理</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <router-link :to="{ name: 'columnManage' }">
            {{ $route.query.pname }}
          </router-link>
        </div>
      </div>
      <div slot="buttonGroup">
        <edit-button @click="handleAddChildColumn" icon="el-icon-plus"
          >新增二级专栏</edit-button
        >
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="childColumnList"
          :loading="tableLoading"
          ref="childColumnTable"
          :actionWidth="145"
          @onHandleFilterChange="handlefilterChange"
        >
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button @click="handleChildColumnEdit(row)"
                >编辑</edit-button
              >
              <delete-button
                @click="handleChildColumnDelete(row)"
                class="global_button"
                >删除</delete-button
              >
            </div>
          </template>
        </m-table>
        <m-pagination
          :currentPage="pagination.page"
          :pageSize="pagination.rows"
          :total="pagination.total"
          @onHandleCurrentChange="handleCurrentChange"
        />
      </div>
    </m-card>
    <template v-if="openFormModal">
      <children-column-form
        @onHandleCloseDialog="handleCloseDialog"
        :actionType="actionType"
        :pid="$route.query.pid"
        :childColumnDetail="childColumnDetail"
      />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import MTable from '_c/table/table.vue';
import MCard from '_c/card';
import childrenColumnForm from './childrenColumnForm';
import { filterData } from '@/utils/utils';
export default {
  name: 'childrenColumnList',
  components: {
    MTable,
    MCard,
    childrenColumnForm,
  },
  computed: {
    ...mapState({
      childColumnList: state => state.column.childColumnList,
      pagination: state => state.column.childTablePagination,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '专栏名称',
          slot: false,
        },
        {
          prop: 'remark',
          label: '文章总数',
          slot: false,
        },
        {
          prop: 'createdAt',
          label: '创建时间',
          slot: false,
        },
      ],
      tableLoading: false,
      childColumnDetail: {},
      openFormModal: false,
    };
  },
  methods: {
    ...mapActions(['getChildColumn', 'delColumn']),
    ...mapMutations(['CHANGEFILTER', 'CHANGEFILTERINPUT']),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadChildColumnList();
      }
    },
    handleAddChildColumn() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleChildColumnEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.childColumnDetail = { ...row };
    },
    async handleChildColumnDelete(row) {
      try {
        await this.$confirm(
          '确认删除该二级专栏？ 该专栏下的文章将会一并删除！',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
          }
        );
        await this.delColumn(row.id);
        this.loadChildColumnList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadChildColumnList(params);
    },
    handleSubmitSearch(searchValue) {
      this.handlefilterChange('key', searchValue);
    },
    handlefilterChange(filterKey, filterValue) {
      const filterParams = {
        filterKey,
        filterValue,
        page: 'constant',
      };
      const params = {
        page: 1,
      };
      this.CHANGEFILTER(filterParams);
      this.loadChildColumnList(params);
    },
    loadChildColumnList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryChildColumnList(concatParams);
    },
    async queryChildColumnList(params = {}) {
      try {
        const {
          query: { pid },
        } = this.$route;
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
          pid,
        };
        this.tableLoading = true;
        await this.getChildColumn(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
  },
  created() {
    const {
      query: { pid },
    } = this.$route;
    if (pid) {
      this.loadChildColumnList();
    }
  },
};
</script>
