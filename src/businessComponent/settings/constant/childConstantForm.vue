<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增字典值' : '编辑字典值'"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="childConstantForm"
        label-width="100px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="key值" prop="paramKey">
          <el-input
            v-model="childConstantForm.paramKey"
            placeholder="请输入key值"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示文字" prop="paramValue">
          <el-input
            v-model="childConstantForm.paramValue"
            placeholder="请输入显示文字"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input
            v-model="childConstantForm.remark"
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
            actionType === 1 ? handleCreateClick() : handleEditChildConstant()
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
  name: 'childConstantForm',
  props: {
    actionType: {
      type: Number,
      default: 1, // 默认是新增
    },
    childConstantDetail: {
      type: Object,
      default: () => ({}),
    },
    paramToken: {
      type: String,
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
      childConstantForm: {
        paramKey: '',
        paramValue: '',
        remark: '',
      },
      rules: {
        paramKey: [
          {
            required: true,
            message: '请输入key值',
            trigger: 'blur',
          },
        ],
        paramValue: [
          {
            required: true,
            message: '请输入显示文字',
            trigger: 'blur',
          },
        ],
      },
      addLoading: false,
    };
  },
  methods: {
    ...mapActions(['createChildConstant', 'editChildConstant']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleCreateClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          this.handleCreateChildConstant();
        }
      });
    },
    assemblyParams() {
      const params = {
        paramToken: this.paramToken,
        ...this.childConstantForm,
      };
      return params;
    },
    async handleCreateChildConstant() {
      try {
        const params = this.assemblyParams();
        this.addLoading = true;
        const res = await this.createChildConstant(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditChildConstant() {
      try {
        const { id } = this.childConstantDetail;
        const params = this.assemblyParams();
        params.id = id;
        this.addLoading = true;
        const res = await this.editChildConstant(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    initChildConstant() {
      Object.keys(this.childConstantForm).forEach(item => {
        this.childConstantForm[item] = this.childConstantDetail[item] || '';
      });
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initChildConstant();
    }
  },
};
</script>
