<template>
  <div class="drawer-wrapper">
    <el-drawer
      :visible.sync="openDrawer"
      :direction="direction"
      :before-close="handleClose"
      :destroy-on-close="destryAfterClose"
      :show-close="false"
      :size="width"
    >
      <div slot="title">
        <slot name="title"></slot>
      </div>
      <slot name="content"></slot>
    </el-drawer>
  </div>
</template>
<script>
import { Drawer } from 'element-ui';
export default {
  name: 'customDrawer',
  props: {
    openDrawer: {
      // 是否打开Drawer
      type: Boolean,
      default: false,
    },
    direction: {
      // 打开的方向
      type: String,
      default: 'rtl',
    },
    width: {
      type: [Number, String],
      default: '40%',
    },
    destryAfterClose: {
      // 关闭摧毁子元素
      type: Boolean,
      default: true,
    },
  },
  components: {
    'el-drawer': Drawer,
  },
  methods: {
    handleClose() {
      // 关闭前的回调
      this.$emit('beforeClose');
    },
  },
};
</script>
