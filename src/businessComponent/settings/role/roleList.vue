<template>
  <div>
    <el-card>
      <div class="header-wrapper" slot="header">
        <div>权限列表</div>
      </div>
      <div>
        <div class="create-role">
          <el-button
            size="small"
            icon="el-icon-plus"
            class="btn"
            @click="handleRoleAdd"
          >
            新增角色
          </el-button>
        </div>
        <div class="role-list" v-loading="dataLoading">
          <ul>
            <li
              v-for="role in roleList"
              :key="role.id"
              @click="handleRoleClick(role)"
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
      dataLoading: false,
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
    cancelActive() {
      this.activeRole = '';
    },
    handleRoleAdd() {
      this.cancelActive();
      this.$emit('onHandleRoleAdd');
    },
    handleRoleClick(role) {
      const { id, name } = role;
      if (this.activeRole === id) {
        return;
      }
      this.activeRole = id;
      const params = {
        id,
        name,
      };
      this.$emit('onHandleRoleClick', params);
    },
    async refreshRole(id) {
      await this.queryRoleList();
      if (id) {
        this.roleList.length > 0 &&
          this.handleRoleClick(
            this.roleList.filter(item => {
              return item.id === id;
            })
          );
      } else {
        this.roleList.length > 0 && this.handleRoleClick(this.roleList[0]);
      }
    },
    async queryRoleList() {
      try {
        this.dataLoading = true;
        const res = await this.getRole();
        this.roleList = res;
        this.dataLoading = false;
        return;
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
  },
  async created() {
    await this.queryRoleList();
    // 设置第一个被选中
    if (this.roleList.length > 0) {
      this.handleRoleClick(this.roleList[0]);
    }
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
  margin-top: 20px;
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
