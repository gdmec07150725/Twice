<template>
  <div class="dialogPage">
    <el-dialog
      :custom-class="className"
      :title="title"
      :visible.sync="dialogVisible"
      :show-close="showClose"
      :width="width"
      :destroy-on-close="isDestroyClose"
      :before-close="handleClose"
      :close-on-click-modal="closeOnClickModal"
    >
      <slot name="content"></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="action"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from 'element-ui';

export default {
  name: 'Mdialog', // 封装dialog组件
  props: {
    className: {
      type: String,
      default: '',
    },
    title: {
      // 标题
      type: String,
      default: '',
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    showClose: {
      // 是否显示关闭按钮
      type: Boolean,
      default: true,
    },
    isDestroyClose: {
      // 关闭时销毁Dialog中的元素
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      // 是否可以通过点击modal关闭Dialog
      type: Boolean,
      default: false,
    },
    dialogWidth: String, // dialog的宽度
  },
  components: {
    'el-dialog': Dialog,
  },
  data() {
    return {
      width: '30%',
    };
  },
  methods: {
    handleClose() {
      this.$emit('onHandleClose');
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.width = this.dialogWidth ? this.dialogWidth : '30%';
  },
};
</script>

<style lang="less">
.dialogPage {
  .el-dialog {
    width: 95%;
    max-width: 871px;
  }
  .el-dialog__header {
    padding: 9px 24px;
    border-bottom: 1px solid #efefef;
  }
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 0;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
}
</style>
