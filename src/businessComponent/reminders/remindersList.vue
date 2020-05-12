<template>
  <div class="reminders-list">
    <p class="title">提醒事项</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <m-search
            :searchText="filter.content"
            @onHandleSubmitSearch="handleSubmitSearch"
          />
        </div>
      </div>
      <div slot="buttonGroup">
        <edit-button
          @click="handleAddReminders"
          icon="el-icon-plus"
          :permission="['reminderAdd']"
        >
          提醒事项
        </edit-button>
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="remindersList"
          :loading="tableLoading"
          ref="remindersTable"
          :actionWidth="145"
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
              <edit-button
                @click="handleRemindersEdit(row)"
                :permission="['reminderEdit']"
              >
                编辑
              </edit-button>
              <delete-button
                @click="handleRemindersDelete(row)"
                class="global_button"
                :permission="['reminderDelete']"
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
      <reminders-form
        @onHandleCloseDialog="handleCloseDialog"
        :companyType="companyType"
        :companyNumber="companyNumber"
        :actionType="actionType"
        :remindersDetail="remindersDetail"
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
      remindersList: state => state.reminders.remindersList,
      pagination: state => state.reminders.remindersTablePagination,
      filter: state => state.filter.filter.reminders,
      filterInputValue: state => state.filter.filterInput.reminders,
    }),
  },
  watch: {
    companyType(newValue) {
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
          prop: 'content',
          label: '提醒内容',
          slot: false,
        },
        {
          prop: 'remindAt',
          label: '提醒时间',
          slot: false,
        },
        {
          prop: 'prior',
          label: '权重',
          slot: false,
          filters: [],
          filterValue: [],
          filterInputValue: '',
        },
        {
          prop: 'status',
          label: '状态',
        },
      ],
      tableLoading: false,
      openFormModal: false,
      companyType: [],
      companyNumber: [],
      actionType: 1,
      remindersDetail: {},
    };
  },
  methods: {
    ...mapActions([
      'getConstantBeforeRequest',
      'getAllReminders',
      'deleteReminders',
    ]),
    ...mapMutations([
      'CHANGEFILTER',
      'CHANGEFILTERINPUT',
      'SET_REMINDERS_PAGINATION',
    ]),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadRemindersList();
      }
    },
    handleAddReminders() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleRemindersEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.remindersDetail = { ...row };
    },
    async handleRemindersDelete(row) {
      try {
        await this.$confirm('确认删除该条提醒？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        await this.deleteReminders(row.id);
        // 在删除成功的回调里：判断当前列表是否是一条：调用calculationPage函数去处理分页
        if (this.remindersList.length == 1) {
          this.SET_REMINDERS_PAGINATION(calculationPage(this.pagination.page));
        }
        this.loadRemindersList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadRemindersList(params);
    },
    handleSubmitSearch(searchValue) {
      this.handlefilterChange('content', searchValue);
    },
    handlefilterChange(filterKey, filterValue) {
      const filterParams = {
        filterKey,
        filterValue,
        page: 'reminders',
      };
      const params = {
        page: 1,
      };
      this.CHANGEFILTER(filterParams);
      this.loadRemindersList(params);
    },
    handleFilterInputChange(filterInputKey, filterInputValue) {
      const filterInputParams = {
        filterInputKey,
        filterInputValue,
        page: 'reminders',
      };
      this.CHANGEFILTERINPUT(filterInputParams);
    },
    loadRemindersList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryRemindersList(concatParams);
    },
    async queryRemindersList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
        };
        this.tableLoading = true;
        await this.getAllReminders(filterData(concatParams));
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
    // setDefaultFilterValue() {
    //   const { type } = this.filter;
    //   this.tableColumns[3].filterValue = type;
    //   this.tableColumns[3].filterInputValue = this.filterInputValue['type'];
    // },
  },
  created() {
    this.loadRemindersList();
    this.loadConstants();
    // this.setDefaultFilterValue();
  },
};
</script>
