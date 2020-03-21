<template>
  <div class="constant-list">
    <p class="title">专栏管理</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <!-- <m-search
            :searchText="filter.key"
            @onHandleSubmitSearch="handleSubmitSearch"
          /> -->
        </div>
      </div>
      <div slot="buttonGroup">
        <edit-button @click="handleAddParentColumn" icon="el-icon-plus">
          新增一级专栏
        </edit-button>
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="parentColumnList"
          :loading="tableLoading"
          ref="parentColumnTable"
          :actionWidth="145"
          @onHandleFilterChange="handlefilterChange"
        >
          <template #name="{ row }">
            <router-link
              class="link"
              :to="{
                name: 'childColumn',
                query: {
                  pid: row.id,
                },
              }"
            >
              {{ row.name && row.name }}
            </router-link>
          </template>
          <template #childTotal="{ row }">
            {{ row.secondCategoriesList && row.secondCategoriesList.length }}
          </template>
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button @click="handleParentColumnEdit(row)">
                编辑
              </edit-button>
              <delete-button
                @click="handleParentColumnDelete(row)"
                class="global_button"
              >
                删除
              </delete-button>
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
      <parent-column-form
        @onHandleCloseDialog="handleCloseDialog"
        :actionType="actionType"
        :parentColumnDetail="parentColumnDetail"
      />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import MTable from '_c/table/table.vue';
import MCard from '_c/card';
// import MSearch from '_c/search';
import MPagination from '_c/pagination';
import parentColumnForm from './parentColumnForm';
import { filterData, calculationPage } from '@/utils/utils';
export default {
  name: 'parentColumnList',
  components: {
    MTable,
    MCard,
    // MSearch,
    MPagination,
    parentColumnForm,
  },
  computed: {
    ...mapState({
      parentColumnList: state => state.column.parentColumnList,
      pagination: state => state.column.parentTablePagination,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '专栏名称',
          slot: true,
        },
        {
          prop: 'childTotal',
          label: '子专栏总数',
          slot: true,
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
      parentColumnDetail: {},
      openFormModal: false,
    };
  },
  methods: {
    ...mapActions(['getParentColumn', 'delColumn']),
    ...mapMutations([
      'CHANGEFILTER',
      'CHANGEFILTERINPUT',
      'SET_PARENT_PAGINATION',
    ]),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadParentColumnList();
      }
    },
    handleAddParentColumn() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleParentColumnEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.parentColumnDetail = { ...row };
    },
    async handleParentColumnDelete(row) {
      try {
        await this.$confirm(
          '确认删除该一级专栏？ 该专栏下的二级专栏和文章都会一并删除！',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
          }
        );
        await this.delColumn(row.id);
        // 在删除成功的回调里：判断当前列表是否是一条：调用calculationPage函数去处理分页
        if (this.parentColumnList.length == 1) {
          this.SET_PARENT_PAGINATION(calculationPage(this.pagination.page));
        }
        this.loadParentColumnList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadParentColumnList(params);
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
      this.loadParentColumnList(params);
    },
    loadParentColumnList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryParentColumnList(concatParams);
    },
    async queryParentColumnList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
        };
        this.tableLoading = true;
        await this.getParentColumn(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
  },
  created() {
    this.loadParentColumnList();
  },
};
</script>
