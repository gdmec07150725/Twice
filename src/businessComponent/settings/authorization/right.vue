<template>
  <div>
    <el-card v-loading="dataLoading">
      <div class="header-wrapper" slot="header">
        <div>{{ actionType === 1 ? '新增权限' : '编辑权限' }}</div>
        <el-button
          type="primary"
          size="small"
          @click="handleSave"
          v-permission="['authAdd', 'authEdit']"
        >
          保存
        </el-button>
      </div>
      <div class="operate" v-if="isMenu">
        <el-button
          size="small"
          :type="actionType === 1 ? 'primary' : ''"
          @click="modifyActionType(1)"
          v-permission="['authAdd']"
        >
          新增
        </el-button>
        <el-button
          size="small"
          :type="actionType === 2 ? 'primary' : ''"
          @click="modifyActionType(2)"
          v-permission="['authEdit']"
        >
          编辑
        </el-button>
      </div>
      <div class="form-wrapper">
        <el-form
          ref="authForm"
          :model="authForm"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="权限类型" prop="type">
            <el-select v-model="authForm.type" :disabled="actionType === 2">
              <el-option :value="1" label="菜单"></el-option>
              <el-option :value="2" label="按钮"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求方法" prop="method">
            <el-select v-model="authForm.method">
              <el-option value="GET">GET</el-option>
              <el-option value="POST">POST</el-option>
              <el-option value="PUT">PUT</el-option>
              <el-option value="DELETE">DELETE</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求路径" prop="path">
            <el-input v-model="authForm.path" />
          </el-form-item>
          <el-form-item label="权限ID" prop="name">
            <el-input v-model="authForm.name" :disabled="actionType === 2" />
          </el-form-item>
          <el-form-item label="权限名称" prop="description">
            <el-input v-model="authForm.description" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  Card,
  Button,
  Form,
  FormItem,
  Select,
  Option,
  Input,
} from 'element-ui';
import { mapActions } from 'vuex';
export default {
  name: 'authorizationRight',
  components: {
    'el-card': Card,
    'el-button': Button,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-select': Select,
    'el-option': Option,
    'el-input': Input,
  },
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
  },
  watch: {
    id(newVal) {
      this.queryAuthById(newVal);
    },
  },
  data() {
    return {
      authForm: {
        type: 1,
        id: '',
        description: '',
        path: '',
        method: '',
        name: '',
      },
      defaultAuthForm: {
        type: 1,
        id: '',
        description: '',
        path: '',
        method: '',
        name: '',
      },
      temporary: {}, // 临时保存authForm的值
      rules: {
        name: [
          {
            required: true,
            message: '请输入权限ID',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入权限名称',
            trigger: 'blur',
          },
        ],
      },
      isMenu: false,
      dataLoading: false,
      actionType: 1, // 默认是新增
    };
  },
  methods: {
    ...mapActions(['getAuthById', 'editAuth', 'createAuth']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSuccess(res = {}) {
      const { message } = res;
      message && this.$message.success(message);
    },
    modifyActionType(value) {
      if (this.actionType === value) {
        return;
      }
      if (value === 1) {
        this.temporary = { ...this.authForm };
        this.authForm = { ...this.defaultAuthForm };
      } else {
        this.authForm = { ...this.temporary };
      }
      this.actionType = value;
    },
    initPage(res = {}) {
      // 判读权限类型，控制UI显示
      const { type } = res;
      if (type && Number(type) === 1) {
        this.isMenu = true;
      } else {
        this.isMenu = false;
      }
      this.actionType = 2; // 默认是编辑
      this.authForm = { ...res, type: type ? Number(type) : 1 };
    },
    async queryAuthById(id) {
      try {
        this.dataLoading = true;
        const res = await this.getAuthById(id);
        this.dataLoading = false;
        this.initPage(res);
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
    handleSave() {
      this.$refs['authForm'].validate(pass => {
        if (pass) {
          const params = { ...this.authForm };
          params.id = Number(params.id);
          this.handleJudgeAction(params);
        }
      });
    },
    handleJudgeAction(params) {
      // 判断操作类型
      if (this.actionType === 1) {
        params.pid = this.id;
        this.handleCreateAuth(params);
      } else {
        this.handleEditAuth(params);
      }
    },
    async handleEditAuth(params) {
      try {
        this.dataLoading = true;
        const res = await this.editAuth(params);
        this.dataLoading = false;
        this.handleSuccess(res);
        // 刷新权限列表数据
        this.$emit('onHandleRefreshAuth', params.id);
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
    async handleCreateAuth(params) {
      try {
        this.dataLoading = true;
        const res = await this.createAuth(params);
        this.dataLoading = false;
        this.handleSuccess(res);
        // 刷新权限列表数据
        this.$emit('onHandleRefreshAuth', params.pid);
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
  },
};
</script>
<style lany="less" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
