<template>
  <div>
    <el-card>
      <div class="header-wrapper" slot="header">
        <div>权限列表</div>
      </div>
      <div>
        <div class="create-role">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            class="btn"
          >
            新增角色
          </el-button>
        </div>
        <div class="role-list">
          <ul>
            <li
              v-for="role in roleList"
              :key="role.id"
              @click="handleRoleClick(role.id)"
              :class="{ active: role.id === activeRole }"
            >
              {{ role.name }}
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Card, Button } from 'element-ui';
export default {
  name: 'roleList',
  components: {
    'el-card': Card,
    'el-button': Button,
  },
  data() {
    return {
      activeRole: '',
      roleList: [],
    };
  },
  methods: {
    ...mapActions(['getRole']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSuccess(res = {}) {
      const { message } = res;
      message && this.$message.success(message);
    },
    handleRoleClick(id) {
      if (this.activeRole === id) {
        return;
      }
      this.activeRole = id;
      this.$emit('onHandleRoleClick', id);
    },
    async queryRoleList() {
      try {
        const res = await this.getRole();
        this.roleList = res;
      } catch (error) {
        this.handleError(error);
      }
    },
  },
  created() {
    // Todo: 设置第一个被选中
    this.queryRoleList();
  },
};
</script>
<style lang="less" scoped>
.create-role {
  .btn {
    width: 100%;
  }
}
.role-list {
  margin-top: 15px;
  ul {
    list-style: none;
    li {
      padding: 10px;
      margin-top: 10px;
      border-radius: 2px;
    }
    li:not(.active):hover {
      background-color: #f5f7fa;
      cursor: pointer;
    }
    .active {
      background-color: #e6f7ff;
      border-right: 3px solid #3a8ee6;
    }
  }
}
</style>
