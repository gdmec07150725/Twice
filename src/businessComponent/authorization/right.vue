<template>
  <div>
    <el-card>
      <div slot="header">编辑权限</div>
      <div class="operate">
        <el-button>新增</el-button>
        <el-button>编辑</el-button>
      </div>
      <div class="form-wrapper">
        <el-form
          ref="authForm"
          :model="authForm"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="权限类型" prop="type">
            <el-select v-model="authForm.type">
              <el-option :value="1">菜单</el-option>
              <el-option :value="2">按钮</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限ID" prop="id">
            <el-input v-model="authForm.id" />
          </el-form-item>
          <el-form-item label="权限名称" prop="description">
            <el-input v-model="authForm.description" />
          </el-form-item>
          <el-form-item label="请求路径" prop="path">
            <el-input v-model="authForm.path" />
          </el-form-item>
          <el-form-item label="请求方法" prop="method">
            <el-select v-model="authForm.method">
              <el-option :value="GET">GET</el-option>
              <el-option :value="POST">POST</el-option>
              <el-option :value="PUT">PUT</el-option>
              <el-option :value="DELETE">DELETE</el-option>
            </el-select>
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
  data() {
    return {
      authForm: {
        type: 1,
        id: '',
        description: '',
        path: '',
        method: '',
      },
      rules: {
        id: [
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
    };
  },
};
</script>
<style lany="less" scoped>
.operate {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
