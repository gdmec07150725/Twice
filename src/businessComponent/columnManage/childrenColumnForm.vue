<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增二级专栏' : '编辑二级专栏'"
      :dialogVisible="true"
      :isDestroyClose="true"
      dialogWidth="400px"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="childColumnForm"
        label-width="80px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="专栏名称" prop="name">
          <el-input
            v-model="childColumnForm.name"
            placeholder="请输入专栏名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button @click="handleClick()" :loading="loading">{{
          actionType === 1 ? '创建' : '保存'
        }}</edit-button>
      </div>
    </m-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Form, FormItem, Input } from 'element-ui';
import MDialog from '_c/dialog';
export default {
  name: 'childrenColumnForm',
  props: {
    actionType: {
      type: Number,
      default: null,
    },
    childColumnDetail: {
      type: Object,
      default: () => ({}),
    },
    pid: {
      type: [Number, String],
      default: '',
    },
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    MDialog,
  },
  data() {
    return {
      childColumnForm: {
        id: '',
        name: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入专栏名称',
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(['addColumn', 'editColumn']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    concatParams() {
      const concatParams = {
        ...this.childColumnForm,
        pid: this.pid,
      };
      return concatParams;
    },
    handleClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          if (this.actionType === 1) {
            this.handleAddChildColumn();
          } else {
            this.handleEditChildColumn();
          }
        }
      });
    },
    async handleAddChildColumn() {
      try {
        this.loading = true;
        const res = await this.addColumn(this.concatParams());
        const { message = '' } = res;
        message && this.$message.success(message);
        this.loading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    async handleEditChildColumn() {
      try {
        this.loading = true;
        const res = await this.editColumn(this.concatParams());
        const { message = '' } = res;
        message && this.$message.success(message);
        this.loading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    initChildColumn() {
      Object.keys(this.childColumnDetail).forEach(item => {
        this.childColumnForm[item] = this.childColumnDetail[item] || '';
      });
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initChildColumn();
    }
  },
};
</script>
