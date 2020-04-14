<template>
  <div>
    <el-card>
      <div class="header-wrapper" slot="header">
        <div @click="handleGetChecked">获取</div>
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
import { Card, Tree } from 'element-ui';
import { mapActions } from 'vuex';
export default {
  name: 'authList',
  components: {
    'el-card': Card,
    'el-tree': Tree,
  },
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.queryRoleAuth(newVal);
      }
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
    };
  },
  methods: {
    ...mapActions(['getAllAuth', 'getRoleAuth']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleGetChecked() {
      console.log('hadChecked', this.$refs['tree'].getCheckedKeys());
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
        console.log('res', res);
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
