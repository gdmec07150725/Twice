<template>
  <div class="staff-list">
    <p class="title">人员管理</p>
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
        <edit-button @click="handleAddStaff" icon="el-icon-plus">
          新增人员
        </edit-button>
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="staffList"
          :loading="tableLoading"
          ref="staffTable"
          :actionWidth="145"
          @onHandleFilterChange="handlefilterChange"
        >
          <template #roleNameList="{ row }">
            {{ row.roleNameList && row.roleNameList[0] }}
          </template>
          <template #createdAt="{ row }">
            {{ row.createdAt && row.createdAt | formatTime }}
          </template>
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button @click="handleStaffEdit(row)">编辑</edit-button>
              <delete-button
                @click="handleStaffDelete(row)"
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
      <staff-form
        @onHandleCloseDialog="handleCloseDialog"
        :actionType="actionType"
        :staffDetail="staffDetail"
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
import staffForm from './staffForm.vue';
import { filterData, calculationPage } from '@/utils/utils';
import storage from '@/utils/storage';

export default {
  name: 'staffList',
  components: {
    MTable,
    MCard,
    MSearch,
    MPagination,
    staffForm,
  },
  computed: {
    ...mapState({
      staffList: state => state.staff.staffList,
      pagination: state => state.staff.staffPagination,
      filter: state => state.filter.filter.staff,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'username',
          label: '人员名称',
          slot: false,
        },
        {
          prop: 'phone',
          label: '手机号码',
        },
        {
          prop: 'email',
          label: '邮箱',
        },
        {
          prop: 'job',
          label: '所属职位',
        },
        {
          prop: 'roleNameList',
          label: '角色',
          slot: true,
        },
        {
          prop: 'createdAt',
          label: '创建时间',
          slot: true,
        },
      ],
      tableLoading: false,
      openFormModal: false,
      actionType: 1,
      staffDetail: {},
    };
  },
  methods: {
    ...mapActions(['getStaffListByCompanyId', 'deleteStaff']),
    ...mapMutations(['CHANGEFILTER', 'SET_STAFF_PAGINATION']),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.loadStaffList();
      }
    },
    handleAddStaff() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleStaffEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.staffDetail = { ...row };
    },
    async handleStaffDelete(row) {
      try {
        await this.$confirm('确认删除该用户？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        await this.deleteStaff(row.id);
        // 在删除成功的回调里：判断当前列表是否是一条：调用calculationPage函数去处理分页
        if (this.staffList.length == 1) {
          this.SET_STAFF_PAGINATION(calculationPage(this.pagination.page));
        }
        this.loadStaffList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadStaffList(params);
    },
    handleSubmitSearch(searchValue) {
      this.handlefilterChange('username', searchValue);
    },
    handlefilterChange(filterKey, filterValue) {
      const filterParams = {
        filterKey,
        filterValue,
        page: 'staff',
      };
      const params = {
        page: 1,
      };
      this.CHANGEFILTER(filterParams);
      this.loadStaffList(params);
    },
    loadStaffList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryStallList(concatParams);
    },
    async queryStallList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          ...params,
          companyId: JSON.parse(storage.getCompanyDetail()).id,
        };
        console.log('concatParams', concatParams);
        this.tableLoading = true;
        await this.getStaffListByCompanyId(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
  },
  created() {
    this.loadStaffList();
  },
};
</script>
