<template>
  <div class="constant-list">
    <p class="title">字典管理</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <m-search
            :searchText="filter.key"
            @onHandleSubmitSearch="handleSubmitSearch"
          />
        </div>
      </div>
      <div slot="buttonGroup">
        <edit-button @click="handleAddParentConstant" icon="el-icon-plus">
          新增字典
        </edit-button>
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="parentConstantList"
          :loading="tableLoading"
          ref="parentConstantTable"
          :actionWidth="145"
          @onHandleFilterChange="handlefilterChange"
        >
          <template #paramToken="{ row }">
            <router-link
              class="link"
              :to="{
                name: 'childConstant',
                query: {
                  paramToken: row.paramToken,
                },
              }"
            >
              {{ row.paramToken && row.paramToken }}
            </router-link>
          </template>
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button @click="handleParentConstantEdit(row)">
                编辑
              </edit-button>
              <delete-button
                @click="handleParentConstantDelete(row)"
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
      <parent-constant-form
        @onHandleCloseDialog="handleCloseDialog"
        :actionType="actionType"
        :parentConstantDetail="parentConstantDetail"
      />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import MTable from '_c/table/table.vue';
import MCard from '_c/card';
import MSearch from '_c/search';
import MPagination from '_c/pagination';
import parentConstantForm from './parentConstantForm';
import { filterData, calculationPage } from '@/utils/utils';
export default {
  name: 'parentConstantList',
  components: {
    MTable,
    MCard,
    MSearch,
    MPagination,
    parentConstantForm,
  },
  computed: {
    ...mapState({
      parentConstantList: state => state.constant.parentConstantList,
      pagination: state => state.constant.parentConstantTablePagination,
      filter: state => state.filter.filter.constant,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'paramToken',
          label: '参数标识',
          slot: true,
        },
        {
          prop: 'paramName',
          label: '参数名称',
          slot: false,
        },
        {
          prop: 'remark',
          label: '备注信息',
          slot: false,
        },
      ],
      tableLoading: false,
      parentConstantDetail: {},
      openFormModal: false,
    };
  },
  methods: {
    ...mapActions(['getParentConstantList', 'deleteParentConstant']),
    ...mapMutations([
      'CHANGEFILTER',
      'CHANGEFILTERINPUT',
      'SET_PARENTCONSTANT_PAGINATION',
    ]),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadParentConstantList();
      }
    },
    handleAddParentConstant() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleParentConstantEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.parentConstantDetail = { ...row };
    },
    async handleParentConstantDelete(row) {
      try {
        await this.$confirm('确认删除该常量？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        await this.deleteParentConstant(row.id);
        // 在删除成功的回调里：判断当前列表是否是一条：调用calculationPage函数去处理分页
        if (this.parentConstantList.length == 1) {
          this.SET_PARENTCONSTANT_PAGINATION(
            calculationPage(this.pagination.page)
          );
        }
        this.loadParentConstantList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadParentConstantList(params);
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
      this.loadParentConstantList(params);
    },
    loadParentConstantList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryParentConstantList(concatParams);
    },
    async queryParentConstantList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
        };
        this.tableLoading = true;
        await this.getParentConstantList(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
  },
  created() {
    this.loadParentConstantList();
  },
};
</script>
