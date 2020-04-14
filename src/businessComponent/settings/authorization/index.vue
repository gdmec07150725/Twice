<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <authorization-left
          ref="authLeft"
          @onHandleTreeNodeclick="handleTreeNodeClick"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <authorization-right
          :id="currentNodeId"
          @onHandleRefreshAuth="handleRefreshAuth"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Row, Col } from 'element-ui';
import authorizationLeft from './left.vue';
import authorizationRight from './right.vue';
export default {
  name: 'authorizationPage',
  components: {
    authorizationLeft,
    authorizationRight,
    'el-row': Row,
    'el-col': Col,
  },
  data() {
    return {
      currentNodeId: '',
    };
  },
  methods: {
    handleTreeNodeClick(id) {
      this.currentNodeId = id;
    },
    handleRefreshAuth() {
      this.$refs['authLeft'] && this.$refs['authLeft'].queryAllAuth();
    },
  },
};
</script>
