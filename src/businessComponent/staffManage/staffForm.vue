<template>
  <div>
    <m-dialog
      :title="actionType === 1 ? '新增人员' : '编辑人员'"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="staffForm"
        :model="staffForm"
        label-width="100px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="人员名称" prop="username">
          <el-input
            v-model="staffForm.username"
            placeholder="请输入人员名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="staffForm.roleIds" placeholder="请选择角色">
            <template v-for="item in roleList">
              <el-option
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="所属职位" prop="job">
          <el-input
            v-model="staffForm.job"
            placeholder="请输入所属职位"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="staffForm.phone"
            placeholder="请输入手机号码"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar" ref="avatar">
          <single-upload
            v-model="staffForm.avatar"
            @onSuccess="handleUploadSuccess"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            :disabled="actionType === 2"
            v-model="staffForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button @click="handleSave" :loading="addLoading">
          {{ actionType === 1 ? '创建' : '保存' }}
        </edit-button>
      </div>
    </m-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Form, FormItem, Input, Select, Option } from 'element-ui';
import MDialog from '_c/dialog';
import singleUpload from '_c/upload/singleUpload.vue';
import regExp from '@/utils/regExp';

export default {
  name: 'staffForm',
  props: {
    actionType: {
      type: Number,
      default: 1, // 默认是新增
    },
    staffDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
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
      roleList: [],
      staffForm: {
        username: '',
        roleIds: '',
        job: '',
        phone: '',
        avatar: '',
        email: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入人员名称',
            trigger: 'blur',
          },
        ],
        roleIds: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change',
          },
        ],
        // avatar: [
        //   {
        //     required: true,
        //     message: '请上传公司logo',
        //     trigger: 'change',
        //   },
        // ],
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
    ...mapActions(['addStaff', 'editStaff', 'getRole']),
    handleUploadSuccess() {
      this.$refs['avatar'] && this.$refs['avatar'].clearValidate();
    },
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSave() {
      this.$refs['staffForm'].validate(pass => {
        if (pass) {
          this.judgeAction();
        }
      });
    },
    judgeAction() {
      if (this.actionType === 1) {
        this.handleCreateStaff();
      } else {
        this.handleEditStaff();
      }
    },
    assemblyParams() {
      const { roleIds, ...otherParams } = this.staffForm;
      const params = {
        companyId: 0, // 暂时写死
        roleIds: [roleIds],
        ...otherParams,
      };
      return params;
    },
    async handleCreateStaff() {
      try {
        const params = this.assemblyParams();
        this.addLoading = true;
        const res = await this.addStaff(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditStaff() {
      try {
        const { id } = this.staffDetail;
        const params = this.assemblyParams();
        params.id = id;
        this.addLoading = true;
        const res = await this.editStaff(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async queryRoleList() {
      try {
        const res = await this.getRole();
        this.roleList = res;
        return;
      } catch (error) {
        this.handleError(error);
      }
    },
    initCompany() {
      Object.keys(this.staffForm).forEach(item => {
        this.staffForm[item] = this.staffDetail[item] || '';
      });
      const { roleIds } = this.staffDetail;
      if (roleIds) {
        this.staffForm['roleIds'] = roleIds[0];
      }
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    this.queryRoleList();
    if (this.actionType === 2) {
      this.initCompany();
    }
  },
};
</script>
