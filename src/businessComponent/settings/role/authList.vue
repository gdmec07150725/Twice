<template>
  <div>
    <el-card>
      <div class="header-wrapper" slot="header">
        <div v-if="!showForm" class="header-action">
          <div>{{ roleForm.name }}</div>
          <div>
            <el-link icon="el-icon-edit" class="edit" @click="editClick">
              编辑
            </el-link>
            <el-link
              icon="el-icon-delete"
              class="delete"
              @click="handleDeleteRole"
            >
              删除
            </el-link>
          </div>
        </div>
        <div class="form-wrapper" v-else>
          <el-form
            ref="roleForm"
            :model="roleForm"
            label-width="80px"
            :rules="rules"
            class="name-input"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
            </el-form-item>
          </el-form>
          <edit-button @click="handleSave" :loading="saveLoading">
            保存
          </edit-button>
        </div>
      </div>
      <div class="auth-wrapper" v-loading="dataLoading">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-expanded-keys="[2, 3]"
          :props="defaultProps"
        >
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script>
import { Card, Link, Tree, Form, FormItem, Input } from 'element-ui';
import { mapActions } from 'vuex';
export default {
  name: 'authList',
  components: {
    'el-card': Card,
    'el-tree': Tree,
    'el-link': Link,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
  },
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  watch: {
    id(newVal) {
      this.handleReset();
      if (newVal) {
        this.queryRoleAuth(newVal);
      }
    },
    name(newVal) {
      this.roleForm.name = newVal;
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'description',
      },
      dataLoading: false,
      saveLoading: false,
      actionType: 1,
      showForm: false, // 是否显示表单
      defaultForm: {
        name: '',
      },
      roleForm: {
        name: '',
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
    };
  },
  methods: {
    ...mapActions([
      'getAllAuth',
      'getRoleAuth',
      'addRole',
      'editRole',
      'deleteRole',
      'assignAuth',
    ]),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSuccess(res = {}) {
      const { message } = res;
      message && this.$message.success(message);
    },
    filterPid(res = [], pidArr = []) {
      // 去除父节点
      if (res.length > 0) {
        res.forEach(item => {
          if (item.pid) {
            pidArr.push(item.pid);
          }
          if (item.childList && item.childList.length > 0) {
            this.filterPid(item.childList, pidArr);
          }
        });
      }
      console.log('pidArr', pidArr);
      return pidArr;
    },
    filterChecked(res = [], checked = [], pidArr = []) {
      // 获取角色的已选权限
      if (res.length > 0) {
        res.forEach(item => {
          const isP = pidArr.includes(item.id);
          if (!isP) {
            checked.push(item.id);
          }
          if (item.childList && item.childList.length > 0) {
            this.filterChecked(item.childList, checked, pidArr);
          }
        });
      }
      console.log('checked', checked);
      return checked;
    },
    handleReset() {
      this.handleCancelChecked();
      this.showForm = false;
    },
    handleCancelChecked() {
      this.$refs['tree'] && this.$refs['tree'].setCheckedKeys([]);
    },
    handleGetChecked() {
      return this.$refs['tree']
        .getCheckedKeys()
        .concat(this.$refs['tree'].getHalfCheckedKeys());
    },
    addClick() {
      this.actionType = 1;
      this.showForm = true;
      this.handleCancelChecked();
      this.roleForm = { ...this.defaultForm };
    },
    editClick() {
      this.actionType = 2;
      this.showForm = true;
      this.roleForm.name = this.name;
    },
    handleSave() {
      this.$refs['roleForm'].validate(pass => {
        if (pass) {
          this.judgePermission();
        }
      });
    },
    judgePermission() {
      console.log('handleGetChecked', this.handleGetChecked());
      const finalChecked = this.handleGetChecked();
      if (finalChecked.length > 0) {
        if (this.actionType === 1) {
          this.handleAddRole(finalChecked);
        } else {
          this.handleEditRole(finalChecked);
        }
      } else {
        this.handleError({ message: '请勾选权限' });
      }
    },
    async handleDeleteRole() {
      try {
        await this.$confirm('确认删除该角色？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        const res = this.deleteRole(this.id);
        this.handleSuccess(res);
        this.$emit('refreshRole');
      } catch (error) {
        this.handleError(error);
      }
    },
    async handleAddRole(finalChecked) {
      try {
        const { name } = this.roleForm;
        this.saveLoading = true;
        const res = await this.addRole({ name });
        if (res && res.data) {
          // 为用户分配权限
          const params = { id: res.data, permissionIds: finalChecked };
          await this.assignAuth(params);
        }
        this.handleSuccess(res);
        this.saveLoading = false;
        this.showForm = false;
        this.$emit('refreshRole');
      } catch (error) {
        this.saveLoading = false;
        this.handleError(error);
      }
    },
    async handleEditRole() {
      try {
        const { name } = this.roleForm;
        const params = {
          name,
          id: this.id,
        };
        this.saveLoading = true;
        const res = await this.editRole(params);
        this.handleSuccess(res);
        this.saveLoading = false;
        this.showForm = false;
        this.$emit('refreshRole');
      } catch (error) {
        this.saveLoading = false;
        this.handleError(error);
      }
    },
    async queryAllAuth() {
      try {
        this.dataLoading = true;
        const res = await this.getAllAuth();
        this.dataLoading = false;
        this.treeData = res;
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
    async queryRoleAuth(id) {
      try {
        this.dataLoading = true;
        const res = await this.getRoleAuth(id);
        const finalChecked = this.filterChecked(res, [], this.filterPid(res));
        console.log('finalChecked', finalChecked);
        this.$refs['tree'].setCheckedKeys(finalChecked);
        this.dataLoading = false;
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
  },
  created() {
    this.queryAllAuth();
  },
};
</script>
<style lang="less" scoped>
.header-action {
  display: flex;
  justify-content: space-between;
  .edit {
    margin-right: 15px;
  }
  .delete {
    color: #f56c6c;
  }
}
.form-wrapper {
  display: flex;
  align-items: center;
  .name-input {
    .el-form-item {
      margin-bottom: 0 !important;
    }
    margin-right: 15px;
  }
}
</style>
