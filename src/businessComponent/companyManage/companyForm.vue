<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增公司' : '编辑公司'"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="companyForm"
        label-width="100px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input
            v-model="companyForm.name"
            placeholder="请输入公司名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司人数" prop="number">
          <el-select v-model="companyForm.number" placeholder="请选择公司人数">
            <template v-for="item in companyNumber">
              <el-option
                :label="item.paramValue"
                :value="item.paramValue"
                :key="item.paramValue"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业" prop="type">
          <el-select v-model="companyForm.type" placeholder="请选择行业">
            <template v-for="item in companyType">
              <el-option
                :label="item.paramValue"
                :value="item.paramValue"
                :key="item.paramValue"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="成立时间" prop="establishAt">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="companyForm.establishAt"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="公司logo" prop="logo" ref="companyLogo">
          <single-upload
            v-model="companyForm.logo"
            @onSuccess="handleUploadSuccess"
          />
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input
            :disabled="actionType === 2"
            v-model="companyForm.username"
            placeholder="请输入管理员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员邮箱" prop="email">
          <el-input
            :disabled="actionType === 2"
            v-model="companyForm.email"
            placeholder="请输入管理员邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button
          @click="actionType === 1 ? handleCreateClick() : handleEditCompany()"
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
import { Form, FormItem, Input, DatePicker, Select, Option } from 'element-ui';
import MDialog from '_c/dialog';
import singleUpload from '_c/upload/singleUpload.vue';
import regExp from '@/utils/regExp';
import * as filter from '@/utils/filter';

export default {
  name: 'companyForm',
  props: {
    actionType: {
      type: Number,
      default: 1, // 默认是新增
    },
    companyDetail: {
      type: Object,
      default: () => ({}),
    },
    companyType: {
      type: Array,
      default: () => [],
    },
    companyNumber: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-date-picker': DatePicker,
    'el-select': Select,
    'el-option': Option,
    MDialog,
    singleUpload,
  },
  data() {
    const validEmail = (rule, value, callback) => {
      if (value) {
        if (!regExp.email.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      companyForm: {
        name: '',
        number: '',
        type: '',
        establishAt: '',
        logo: '',
        username: '',
        email: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur',
          },
        ],
        number: [
          {
            required: true,
            message: '请选择公司人数',
            trigger: 'change',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择所属行业',
            trigger: 'change',
          },
        ],
        establishAt: [
          {
            required: true,
            message: '请选择成立时间',
            trigger: 'change',
          },
        ],
        logo: [
          {
            required: true,
            message: '请上传公司logo',
            trigger: 'change',
          },
        ],
        username: [
          {
            required: true,
            message: '请输入管理员名称',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入管理员邮箱',
            trigger: 'blur',
          },
          { validator: validEmail, trigger: 'change' },
        ],
      },
      addLoading: false,
    };
  },
  methods: {
    ...mapActions(['addNewCompany', 'modifyCompany']),
    handleUploadSuccess() {
      this.$refs['companyLogo'] && this.$refs['companyLogo'].clearValidate();
    },
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleCreateClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          this.handleCreateComapny();
        }
      });
    },
    assemblyParams() {
      const { username, email, ...otherParams } = this.companyForm;
      const params = {
        ...otherParams,
        user: {
          username,
          email,
        },
      };
      return params;
    },
    async handleCreateComapny() {
      try {
        const params = this.assemblyParams();
        this.addLoading = true;
        const res = await this.addNewCompany(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditCompany() {
      try {
        const { id } = this.companyDetail;
        const params = this.assemblyParams();
        params.id = id;
        this.addLoading = true;
        const res = await this.modifyCompany(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    initCompany() {
      Object.keys(this.companyForm).forEach(item => {
        this.companyForm[item] = this.companyDetail[item] || '';
      });
      const { user: { username = '', email = '' } = {} } = this.companyDetail;
      this.companyForm['username'] = username;
      this.companyForm['email'] = email;
      this.companyForm['establishAt'] = filter.timestampDate(
        this.companyDetail['establishAt'] || ''
      );
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initCompany();
    }
  },
};
</script>
