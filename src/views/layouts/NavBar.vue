<template>
  <div class="header_content">
    <icon-font
      class="trigger-icon"
      :icon="collapseIcon"
      :size="25"
      @click.native="handleCollapse"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'Navbar',
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
  methods: {
    ...mapMutations(['CHANGECOLLAPSE', 'CLOSECOLLAPSE', 'RESETUSER']),
    ...mapActions(['logout']),
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
    collapse(newVal) {
      if (newVal) {
        this.collapseIcon = 'icon-menu-fold';
      } else {
        this.collapseIcon = 'icon-menu-fold-left';
      }
    },
  },
  created() {
    this.screenWidth = document.body.clientWidth;
    if (this.screenWidth < 992) {
      this.CLOSECOLLAPSE(true);
    } else {
      this.CLOSECOLLAPSE(false);
    }
  },
};
</script>
<style lang="less">
.trigger-icon {
  cursor: pointer;
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
