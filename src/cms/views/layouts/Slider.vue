<template>
  <div class="sidebar-container">
    <!-- Logo -->
    <div class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span v-if="collapse" class="logo-mini"></span>
      <!--  logo for regular state and mobile devices -->
      <span v-else class="logo-lg"></span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.meta.activeMenu || $route.name"
        :background-color="routerBg"
        text-color="#BBC7CD"
        active-text-color="#FFF"
        :collapse="collapse"
        :default-openeds="openNames"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <template v-for="item in list">
          <template v-if="!item.hidden">
            <slide-item
              v-if="
                item.children && (item.alwaysShow || item.children.length > 1)
              "
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
              <icon-font :icon="item.children[0].icon" />
              <span slot="title" style="margin-left: 12px">
                {{ item.children[0].meta.title }}
              </span>
            </el-menu-item>
            <el-menu-item
              v-else-if="!item.children"
              :key="`menu_${item.name}`"
              :index="item.name"
            >
              <icon-font :icon="item.icon" />
              <span slot="title" style="margin-left: 10px">
                {{ item.meta.title }}
              </span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { Scrollbar, Menu, MenuItem } from 'element-ui';
import SlideItem from '@/businessComponent/slideItem';
import { mapState, mapMutations } from 'vuex';
import { getOpenArrByName } from '@/lib/router';
import { isIE } from '@/utils/utils';

export default {
  name: 'Slider',
  components: {
    'el-scrollbar': Scrollbar,
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
      routers: state => state.cmsRouter.routers,
      collapse: state => state.collapse,
      routerBg: state => state.cmsRouter.routerBg,
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
.sidebar-container {
  .el-scrollbar__view,
  .el-menu {
    height: 100%;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar {
    height: calc(100% - 47px);
  }
}

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
.el-menu:not(.el-menu--collapse) {
  min-width: 231px;
}
.el-menu > .is-active,
.el-menu--inline > .is-active {
  background: #409eff !important;
}
</style>
