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
          <el-select
            v-model="staffForm.roleIds"
            placeholder="请选择角色"
            style="width: 100%"
          >
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
        <el-form-item label="邮箱" prop="email">
          <el-input
            :disabled="actionType === 2"
            v-model="staffForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar" ref="avatar">
          <single-upload
            v-model="staffForm.avatar"
            @onSuccess="handleUploadSuccess"
          />
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
import storage from '@/utils/storage';

export default {
  name: 'staffForm',
  props: {
    id: {
      // 人员id
      type: [String, Number],
      default: '',
    },
    actionType: {
      type: Number,
      default: 1, // 默认是新增
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
        avatar: [
          {
            required: true,
            message: '请上传人员头像',
            trigger: 'change',
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
    ...mapActions([
      'addStaff',
      'editStaff',
      'getRole',
      'assignRoleToStaff',
      'getStaffDetail',
    ]),
    handleUploadSuccess() {
      this.$refs['avatar'] && this.$refs['avatar'].clearValidate();
    },
    handleSuccess(res = {}) {
      const { message } = res;
      message && this.$message.success(message);
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
        companyId: JSON.parse(storage.getCompanyDetail()).id,
        ...otherParams,
      };
      return { params, roleIds: [roleIds] };
    },
    async handleCreateStaff() {
      try {
        const { params, roleIds } = this.assemblyParams();
        this.addLoading = true;
        const res = await this.addStaff(params);
        if (res.data) {
          // 分配角色
          await this.assignRoleToStaff({ id: res.data, roleIds });
        }
        this.handleSuccess(res);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditStaff() {
      try {
        const { params, roleIds } = this.assemblyParams();
        params.id = this.id;
        this.addLoading = true;
        const res = await this.editStaff(params);
        await this.assignRoleToStaff({ id: this.id, roleIds });
        this.handleSuccess(res);
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
    async initStaff() {
      try {
        const res = await this.getStaffDetail(this.id);
        Object.keys(this.staffForm).forEach(item => {
          this.staffForm[item] = res[item] || '';
        });
        const { roles } = res;
        if (roles && roles.length > 0) {
          this.staffForm['roleIds'] = roles[0].id;
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    this.queryRoleList();
    if (this.actionType === 2) {
      this.initStaff();
    }
  },
};
</script>
