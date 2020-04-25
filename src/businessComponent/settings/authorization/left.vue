<template>
  <div class="tree-wrapper">
    <el-card>
      <div class="header-wrapper" slot="header">
        <div>权限列表</div>
        <!-- <edit-button size="small" @click="handleExpandAll">
          全部展开
        </edit-button> -->
      </div>
      <div v-loading="dataLoading">
        <el-tree
          ref="tree"
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
          :data="treeData"
          :props="defaultProps"
          :render-content="cusotmRenderContent"
          :highlight-current="true"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </el-card>
  </div>
</template>
<script>
import { Card, Tree } from 'element-ui';
import { mapActions } from 'vuex';
export default {
  name: 'authorizationLeft',
  components: {
    'el-card': Card,
    'el-tree': Tree,
  },
  data() {
    return {
      defaultExpandKey: [],
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'description',
      },
      dataLoading: false,
    };
  },
  methods: {
    ...mapActions(['getAllAuth', 'deleteAuth']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSuccess(res = {}) {
      const { message } = res;
      message && this.$message.success(message);
    },
    cusotmRenderContent(h, { data }) {
      const { type, description } = data;
      return (
        <div class="custome-tree-label">
          <span class="label-icon">
            <icon-font
              icon={type && Number(type) === 1 ? 'icon-menu' : 'icon-icon'}
            />
          </span>
          <span class="label">{description}</span>
          <span class="delete-icon" on-click={() => this.handleRemove(data)}>
            <icon-font icon="icon-shanchu" size={13} />
          </span>
        </div>
      );
    },
    async handleRemove(data) {
      try {
        const { id } = data;
        await this.$confirm('确认删除该权限？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        const res = await this.deleteAuth(id);
        this.handleSuccess(res);
        this.queryAllAuth();
      } catch (error) {
        this.handleError(error);
      }
    },
    handleNodeClick(data) {
      const { id } = data;
      this.setCurrentKey(id);
      this.$emit('onHandleTreeNodeclick', id);
    },
    setCurrentKey(key) {
      this.$nextTick(() => {
        const store = this.$refs['tree'].store;
        const node = store.getNode(key);
        store.setCurrentNode(node);
      });
    },
    // handleNodeExpand(data) {
    //   const { id } = data;
    //   const expendArr = this.defaultExpandKey;
    //   expendArr.push(id);
    //   this.defaultExpandKey = [...expendArr];
    // },
    // handleNodeCollapse(data) {
    //   const { id } = data;
    //   const expendArr = this.defaultExpandKey;
    //   let currentKey = '';
    //   this.defaultExpandKey.forEach((item, index) => {
    //     if (item === id) {
    //       currentKey = index;
    //       return;
    //     }
    //   });
    //   if (currentKey) {
    //     expendArr.splice(currentKey, 1);
    //     this.defaultExpandKey = expendArr;
    //   }
    // },
    async queryAllAuth(id) {
      try {
        this.dataLoading = true;
        const res = await this.getAllAuth();
        this.dataLoading = false;
        this.treeData = res;
        if (id) {
          this.setCurrentKey(id);
        }
      } catch (error) {
        this.dataLoading = false;
        this.handleError(error);
      }
    },
  },
  async created() {
    await this.queryAllAuth();
    if (this.treeData.length > 0) {
      this.handleNodeClick(this.treeData[0]);
    }
  },
};
</script>
<style lang="less">
.tree-wrapper {
  .el-card__header {
    padding: 24px 20px;
  }
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .custome-tree-label {
    font-size: 14px;
    .label-icon,
    .label {
      margin-right: 10px;
    }
    .delete-icon {
      color: #ff0000;
    }
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #e6f7ff;
  }
}
</style>
