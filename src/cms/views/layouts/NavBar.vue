<template>
  <div class="header_content">
    <icon-font
      class="trigger-icon"
      :icon="collapseIcon"
      :size="25"
      @click.native="handleCollapse"
    />
    <div class="user-wrapper">
      <div class="user-name">
        {{ user.username }}
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="user-avatar">
          <img :src="user.avatar" width="100%" height="100%" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import storage from '@/utils/storage';
export default {
  name: 'Navbar',
  components: {
    'el-dropdown': Dropdown,
    'el-dropdown-menu': DropdownMenu,
    'el-dropdown-item': DropdownItem,
  },
  data() {
    return {
      isReset: false,
      screenWidth: 0,
      timer: null,
      collapseIcon: 'icon-menu-fold-left',
    };
  },
  computed: {
    ...mapState({
      collapse: state => state.collapse,
    }),
    ...mapGetters(['user']),
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          console.log(that.screenWidth);
          if (that.screenWidth < 992) {
            that.CLOSECOLLAPSE(true);
          } else {
            that.CLOSECOLLAPSE(false);
          }
          that.timer = false;
        }, 400);
      }
    },
    collapse() {
      this.handleJudgeCollapse();
    },
  },
  methods: {
    ...mapMutations([
      'CHANGECOLLAPSE',
      'CLOSECOLLAPSE',
      'RESETUSER',
      'GET_USER_DETAIL',
    ]),
    handleJudgeCollapse() {
      if (this.collapse) {
        this.collapseIcon = 'icon-menu-fold';
      } else {
        this.collapseIcon = 'icon-menu-fold-left';
      }
    },
    handleLogout() {
      storage.clear();
      window.location.reload();
    },
    handleCollapse() {
      this.CHANGECOLLAPSE();
    },
    handleCommand(command) {
      if (command === 'reset') {
        this.handleResetPassword();
      } else {
        this.handleLogout();
      }
    },
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    };
  },
  created() {
    this.GET_USER_DETAIL(); // 获取用户信息
    this.screenWidth = document.body.clientWidth;
    if (this.screenWidth < 992) {
      this.CLOSECOLLAPSE(true);
      this.collapseIcon = 'icon-menu-fold';
    } else {
      this.collapseIcon = 'icon-menu-fold-left';
      this.CLOSECOLLAPSE(false);
    }
  },
};
</script>
<style lang="less">
.trigger-icon {
  cursor: pointer;
}
.user-wrapper {
  display: flex;
  align-items: center;
  .user-name {
    margin-right: 15px;
    color: #999;
  }
  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
}
.header_content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .user_dropdown {
    display: flex;
    justify-content: space-between;
    .lang_select {
      margin-right: 15px;
    }
    .setting {
      cursor: pointer;
    }
  }
  .userNameData {
    padding-right: 32px;
    span {
      font-size: 14px;
      color: #9c9c9c;
    }
  }
  .settingIcon {
    color: #9c9c9c;
  }
}
</style>
