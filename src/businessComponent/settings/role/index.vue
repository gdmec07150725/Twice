<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <role-list @onHandleRoleClick="handleRoleClick" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="16">
        <auth-list :id="currentRoleId" />
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
    };
  },
  methods: {
    handleRoleClick(id) {
      this.currentRoleId = id;
    },
  },
};
</script>
