<template>
  <div>
    <el-submenu :index="parent.name">
      <template slot="title" v-if="!parent.isHidden">
        <icon-font :icon="parent.icon" />
        <span slot="title" style="margin-left: 10px">
          {{ parent.meta.title }}
        </span>
      </template>
      <!-- <span class="pull-right-container">
        <small v-if="parent.badge && parent.badge.data" class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ parent.badge.data }}</small>
        <i v-else class="fa fa-angle-left pull-right"></i>
      </span>-->
      <template v-for="item in parent.children">
        <template v-if="item.children">
          <slide-item
            v-if="item.children && !item.hidden"
            :key="`menu_${item.name}`"
            :parent="item"
          ></slide-item>
        </template>
        <el-menu-item
          v-else-if="!item.hidden"
          :key="`menu_${item.name}`"
          :index="item.name"
        >
          <icon-font :icon="item.icon" />
          <span slot="title" style="margin-left: 10px">
            {{ item.meta.title }}
          </span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { Submenu, MenuItem } from 'element-ui';
export default {
  name: 'slide-item',
  props: {
    parent: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'el-submenu': Submenu,
    'el-menu-item': MenuItem,
  },
  created() {},
};
</script>

<style lang="less">
// 修复menu收起来字体不隐藏的问题
.el-menu--collapse > div > .el-submenu > .el-submenu__title span,
.el-menu--collapse
  > div
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}
</style>
