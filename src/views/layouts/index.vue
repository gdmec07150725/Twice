<template>
  <div class="layout_wrapper">
    <el-container class="layout_outer">
      <slider :list="routers" class="sider_outer"></slider>
      <el-container style="width:100%;">
        <el-header height="47px" class="header_wrapper">
          <nav-bar />
        </el-header>
        <content-wrap></content-wrap>
        <div class="footerMain">
          <p class="versionMain">
            <span class="versionText">Version</span>
            <span class="versionValue">0.01</span>
          </p>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Container, Header } from 'element-ui';
import NavBar from './NavBar.vue';
import Slider from './Slider.vue';
import ContentWrap from './ContentWrap.vue';
import { mapState } from 'vuex';
import socket from '@/mixin/socket.js';
// import slideMenuItems from '@/lib/slideMenuItems.js'
export default {
  name: 'layout',
  mixins: [socket],
  components: {
    'el-container': Container,
    'el-header': Header,
    NavBar,
    Slider,
    ContentWrap,
  },
  computed: {
    ...mapState({
      routers: state => state.router.routers,
    }),
  },
};
</script>

<style lang="less">
.layout_wrapper,
.layout_outer {
  width: 100%;
  height: 100%;
}
.sider_outer {
  height: 100%;
  // overflow-y: auto;
}
.header_wrapper {
  background-color: #fff;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0 23px;
  line-height: 47px;
}
.footerMain {
  // height: 51px;
  line-height: 51px;
  background: #ffffff;
  // border: 1px solid rgba(151, 143, 130, 0.2);
  padding: 0 6px;
  box-sizing: border-box;
  text-align: right;
  .versionMain {
    text-transform: capitalize;
    .versionText {
      font-weight: bold;
      font-style: normal;
      font-size: 16px;
      color: #6c6c6c;
      padding-right: 5px;
    }
    .versionValue {
      font-size: 16px;
      color: #6c6c6c;
    }
  }
}
</style>
