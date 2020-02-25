<template>
  <div class="company-list">
    <p class="title">提醒事项</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <m-search
            :searchText="filter.name"
            @onHandleSubmitSearch="handleSubmitSearch"
          />
        </div>
      </div>
      <div slot="buttonGroup">
        <edit-button @click="handleAddCompany" icon="el-icon-plus"
          >提醒事项</edit-button
        >
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="companyList"
          :loading="tableLoading"
          ref="remindersTable"
          :actionWidth="210"
          @onHandleFilterChange="handlefilterChange"
          @onHandleFilterInputChange="handleFilterInputChange"
        >
          <template #username="{ row }">
            {{ row.user && row.user.username }}
          </template>
          <template #email="{ row }">{{ row.user && row.user.email }}</template>
          <template #establishAt="{ row }">{{
            row.establishAt | formatDate
          }}</template>
          <template #btnGroup="{ row }">
            <div class="operation">
              <success-button>完成</success-button>
              <edit-button
                @click="handleCompanyEdit(row)"
                class="global_button"
              >
                编辑
              </edit-button>
              <delete-button
                @click="handleCompanyDelete(row)"
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
      <reminders-form
        @onHandleCloseDialog="handleCloseDialog"
        :companyType="companyType"
        :companyNumber="companyNumber"
        :actionType="actionType"
        :companyDetail="companyDetail"
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
import remindersForm from './remindersForm.vue';
import { filterData, calculationPage, getConstantValues } from '@/utils/utils';
export default {
  name: 'remindersList',
  components: {
    MTable,
    MCard,
    MSearch,
    MPagination,
    remindersForm,
  },
  computed: {
    ...mapState({
      companyList: state => state.company.companyList,
      pagination: state => state.company.companyTablePagination,
      filter: state => state.filter.filter.company,
      filterInputValue: state => state.filter.filterInput.company,
    }),
  },
  watch: {
    companyType(newValue) {
      console.log(newValue);
      const copyCompanyType = [...newValue];
      const newFilterList = copyCompanyType.map(item => {
        return {
          text: item.paramValue,
          value: item.paramValue,
        };
      });
      this.tableColumns[2].filters = newFilterList;
    },
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '提醒内容',
          slot: false,
        },
        {
          prop: 'number',
          label: '提醒时间',
          slot: false,
        },
        {
          prop: 'type',
          label: '优先级',
          slot: false,
          filters: [],
          filterValue: [],
          filterInputValue: '',
        },
        {
          prop: 'status',
          label: '状态',
          slot: true,
        },
      ],
      tableLoading: false,
      openFormModal: false,
      companyType: [],
      companyNumber: [],
      actionType: 1,
      companyDetail: {},
    };
  },
  methods: {
    ...mapActions([
      'getConstantBeforeRequest',
      'getAllCompanyList',
      'deleteCompany',
    ]),
    ...mapMutations([
      'CHANGEFILTER',
      'CHANGEFILTERINPUT',
      'SET_COMPANY_PAGINATION',
    ]),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadCompanyList();
      }
    },
    handleAddCompany() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleCompanyEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.companyDetail = { ...row };
    },
    async handleCompanyDelete(row) {
      try {
        await this.$confirm('确认删除该条提醒？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        await this.deleteCompany(row.id);
        // 在删除成功的回调里：判断当前列表是否是一条：调用calculationPage函数去处理分页
        if (this.companyList.length == 1) {
          this.SET_COMPANY_PAGINATION(calculationPage(this.pagination.page));
        }
        this.loadCompanyList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadCompanyList(params);
    },
    handleSubmitSearch(searchValue) {
      this.handlefilterChange('name', searchValue);
    },
    handlefilterChange(filterKey, filterValue) {
      const filterParams = {
        filterKey,
        filterValue,
        page: 'company',
      };
      const params = {
        page: 1,
      };
      this.CHANGEFILTER(filterParams);
      this.loadCompanyList(params);
    },
    handleFilterInputChange(filterInputKey, filterInputValue) {
      const filterInputParams = {
        filterInputKey,
        filterInputValue,
        page: 'company',
      };
      this.CHANGEFILTERINPUT(filterInputParams);
    },
    loadCompanyList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryCompanyList(concatParams);
    },
    async queryCompanyList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
        };
        console.log('concatParams', concatParams);
        this.tableLoading = true;
        await this.getAllCompanyList(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
    async loadConstants() {
      try {
        const constant = await this.getConstantBeforeRequest();
        this.companyType = getConstantValues(constant, 'COMPANY_TYPE');
        this.companyNumber = getConstantValues(constant, 'COMPANY_NUMBER');
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    // 设置filter初始值
    setDefaultFilterValue() {
      const { type } = this.filter;
      this.tableColumns[3].filterValue = type;
      this.tableColumns[3].filterInputValue = this.filterInputValue['type'];
    },
  },
  created() {
    this.loadCompanyList();
    this.loadConstants();
    this.setDefaultFilterValue();
  },
};
</script>
