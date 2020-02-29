<template>
  <div class="constant-list">
    <p class="title">字典值管理</p>
    <m-card>
      <div slot="search">
        <router-link
          class="link"
          :to="{
            name: 'constant',
          }"
        >
          {{ $route.query.paramToken }}
        </router-link>
      </div>
      <div slot="buttonGroup">
        <edit-button @click="handleAddChildConstant" icon="el-icon-plus"
          >新增字典值</edit-button
        >
      </div>
      <div slot="content">
        <m-table
          :tableColumns="tableColumns"
          :tableData="childConstantList"
          :loading="tableLoading"
          ref="childConstantTable"
          :actionWidth="145"
        >
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button @click="handleChildConstantEdit(row)"
                >编辑</edit-button
              >
              <delete-button
                @click="handleChildConstantDelete(row)"
                class="global_button"
                >删除</delete-button
              >
            </div>
          </template>
        </m-table>
      </div>
    </m-card>
    <template v-if="openFormModal">
      <child-constant-form
        @onHandleCloseDialog="handleCloseDialog"
        :actionType="actionType"
        :childConstantDetail="childConstantDetail"
        :paramToken="$route.query.paramToken"
      />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import MTable from '_c/table/table.vue';
import MCard from '_c/card';
import childConstantForm from './childConstantForm';
import { filterData } from '@/utils/utils';
export default {
  name: 'childConstantList',
  components: {
    MTable,
    MCard,
    childConstantForm,
  },
  computed: {
    ...mapState({
      childConstantList: state => state.constant.childConstantList,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'paramToken',
          label: '参数标识',
          slot: false,
        },
        {
          prop: 'paramKey',
          label: 'key值',
          slot: false,
        },
        {
          prop: 'paramValue',
          label: '显示文字',
          slot: false,
        },
        {
          prop: 'remark',
          label: '备注信息',
          slot: false,
        },
      ],
      tableLoading: false,
      childConstantDetail: {},
      openFormModal: false,
    };
  },
  methods: {
    ...mapActions(['getChildConstantList', 'deleteChildConstant']),
    handleCloseDialog(refresh) {
      this.openFormModal = false;
      if (refresh) {
        this.queryChildConstantList();
      }
    },
    handleAddChildConstant() {
      this.actionType = 1;
      this.openFormModal = true;
    },
    handleChildConstantEdit(row) {
      this.actionType = 2;
      this.openFormModal = true;
      this.childConstantDetail = { ...row };
    },
    async handleChildConstantDelete(row) {
      try {
        await this.$confirm('确认删除该常量值？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        await this.deleteChildConstant(row.id);
        this.queryChildConstantList();
      } catch (error) {
        const { message = '' } = error;
        message && this.$message.error(message);
      }
    },
    async queryChildConstantList() {
      try {
        const {
          query: { paramToken },
        } = this.$route;
        const concatParams = {
          param_token: paramToken,
        };
        this.tableLoading = true;
        await this.getChildConstantList(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
  },
  created() {
    this.queryChildConstantList();
  },
};
</script>
