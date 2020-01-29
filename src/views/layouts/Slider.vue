<template>
  <el-menu
    :default-active="activeRouteName || $route.meta.activeMenu || $route.name"
    class="el-menu-vertical-demo"
    :background-color="routerBg"
    text-color="#BBC7CD"
    active-text-color="#FFF"
    :collapse="collapse"
    :default-openeds="openNames"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <!-- Logo -->
    <div class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span v-if="collapse" class="logo-mini"></span>
      <!--  logo for regular state and mobile devices -->
      <span v-else class="logo-lg"></span>
    </div>
    <template v-for="item in list">
      <template v-if="!item.hidden">
        <slide-item
          v-if="item.children && (item.alwaysShow || item.children.length > 1)"
          :key="`menu_${item.name}`"
          :parent="item"
        ></slide-item>
        <el-menu-item
          v-else-if="
            item.children &&
              item.children.length === 1 &&
              item.children[0].meta.title
          "
          :key="`menu_${item.children[0].name}`"
          :index="item.children[0].name"
        >
          <!-- <icon-font :icon="item.children[0].icon" /> -->
          <span slot="title" style="margin-left: 10px">
            {{ item.children[0].meta.title }}
          </span>
        </el-menu-item>
        <el-menu-item
          v-else-if="!item.children"
          :key="`menu_${item.name}`"
          :index="item.name"
        >
          <!-- <icon-font :icon="item.icon" /> -->
          <span slot="title" style="margin-left: 10px">
            {{ item.meta.title }}
          </span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { Menu, MenuItem } from 'element-ui';
import SlideItem from '@/views/businessComponent/SlideItem.vue';
import { mapState, mapMutations } from 'vuex';
import { getOpenArrByName } from '@/lib/router';
import { isIE } from '@/utils/utils';

export default {
  name: 'Slider',
  components: {
    'slide-item': SlideItem,
    'el-menu': Menu,
    'el-menu-item': MenuItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      routers: state => state.router.routers,
      collapse: state => state.collapse,
      activeRouteName: state => state.router.activeRouteName,
      routerBg: state => state.router.routerBg,
    }),
    openNames() {
      return getOpenArrByName(this.$route.name, this.routers);
    },
  },
  data() {
    return {
      activeRouter: '',
      isIE: isIE(),
    };
  },
  methods: {
    ...mapMutations(['CHANGETABS']),
    handleSelect(name) {
      window.stateConfirm = '';
      if (name === 'userPermission') {
        // 如果点击的是 userPermission 切换tabs位置
        this.CHANGETABS('role');
      }
      this.$router.push({
        name,
      });
    },
    handleOpen() {},
    handleClose() {},
  },
  created() {},
};
</script>
<style lang="less">
.logo {
  height: 47px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-lg {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 154px;
    object-fit: cover;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 231px;
  min-height: 400px;
}
.el-menu-vertical-demo > .is-active,
.el-menu--inline > .is-active {
  background: rgb(28, 34, 37) !important;
}
.el-menu-item,
.el-submenu__title {
  height: 37px;
  line-height: 37px;
}
.icon-users {
  font-size: 14px !important;
}
</style>
