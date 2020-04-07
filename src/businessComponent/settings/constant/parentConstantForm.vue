<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增字典' : '编辑字典'"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="parentConstantForm"
        label-width="100px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="参数标识" prop="paramToken">
          <el-input
            v-model="parentConstantForm.paramToken"
            placeholder="请输入参数标识"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="参数名称" prop="paramName">
          <el-input
            v-model="parentConstantForm.paramName"
            placeholder="请输入参数名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input
            v-model="parentConstantForm.remark"
            placeholder="请输入备注信息"
            type="textarea"
            maxlength="64"
            :rows="3"
            :show-word-limit="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button
          @click="
            actionType === 1 ? handleCreateClick() : handleEditParentConstant()
          "
          :loading="addLoading"
        >
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
  name: 'parentConstantForm',
  props: {
    actionType: {
      type: Number,
      default: 1, // 默认是新增
    },
    parentConstantDetail: {
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
      parentConstantForm: {
        paramToken: '',
        paramName: '',
        remark: '',
      },
      rules: {
        paramToken: [
          {
            required: true,
            message: '请输入参数标识',
            trigger: 'blur',
          },
        ],
        paramName: [
          {
            required: true,
            message: '请输入参数名称',
            trigger: 'blur',
          },
        ],
      },
      addLoading: false,
    };
  },
  methods: {
    ...mapActions(['createParentConstant', 'editParentConstant']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleCreateClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          this.handleCreateParentConstant();
        }
      });
    },
    assemblyParams() {
      return this.parentConstantForm;
    },
    async handleCreateParentConstant() {
      try {
        const params = this.assemblyParams();
        this.addLoading = true;
        const res = await this.createParentConstant(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditParentConstant() {
      try {
        const { id } = this.parentConstantDetail;
        const params = this.assemblyParams();
        params.id = id;
        this.addLoading = true;
        const res = await this.editParentConstant(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    initParentConstant() {
      Object.keys(this.parentConstantForm).forEach(item => {
        this.parentConstantForm[item] = this.parentConstantDetail[item] || '';
      });
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initParentConstant();
    }
  },
};
</script>
