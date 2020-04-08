<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增一级专栏' : '编辑一级专栏'"
      :dialogVisible="true"
      :isDestroyClose="true"
      dialogWidth="400px"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="parentColumnForm"
        label-width="80px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="专栏名称" prop="name">
          <el-input
            v-model="parentColumnForm.name"
            placeholder="请输入专栏名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button @click="handleClick()" :loading="loading">
          {{ actionType === 1 ? '创建' : '保存' }}
        </edit-button>
      </div>
    </m-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Form, FormItem, Input } from 'element-ui';
import MDialog from '_c/dialog';
export default {
  name: 'parentColumnForm',
  props: {
    actionType: {
      type: Number,
      default: null,
    },
    parentColumnDetail: {
      type: Object,
      default: () => ({}),
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
      parentColumnForm: {
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
    handleClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          if (this.actionType === 1) {
            this.handleAddParentColumn();
          } else {
            this.handleEditParentColumn();
          }
        }
      });
    },
    async handleAddParentColumn() {
      try {
        this.loading = true;
        const res = await this.addColumn(this.parentColumnForm);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.loading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    async handleEditParentColumn() {
      try {
        this.loading = true;
        const res = await this.editColumn(this.parentColumnForm);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.loading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    initParentColumn() {
      Object.keys(this.parentColumnDetail).forEach(item => {
        this.parentColumnForm[item] = this.parentColumnDetail[item] || '';
      });
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initParentColumn();
    }
  },
};
</script>
