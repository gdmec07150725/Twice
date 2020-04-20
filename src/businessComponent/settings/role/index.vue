<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <role-list
          ref="roleList"
          @onHandleRoleClick="handleRoleClick"
          @onHandleRoleAdd="handleRoleAdd"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="16">
        <auth-list
          ref="authList"
          :id="currentRoleId"
          :name="currentRoleName"
          @refreshRole="handleRefreshRole"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Row, Col } from 'element-ui';
import roleList from './roleList';
import authList from './authList';
export default {
  name: 'rolePage',
  components: {
    'el-row': Row,
    'el-col': Col,
    roleList,
    authList,
  },
  data() {
    return {
      currentRoleId: '',
      currentRoleName: '',
    };
  },
  methods: {
    handleRoleClick(params) {
      const { id, name } = params;
      this.currentRoleId = id;
      this.currentRoleName = name;
    },
    handleRoleAdd() {
      this.handleRoleClick({ id: '', name: '' });
      this.$refs['authList'] && this.$refs['authList'].addClick();
    },
    handleRefreshRole(id) {
      this.$refs['roleList'] && this.$refs['roleList'].refreshRole(id);
    },
  },
};
</script>
