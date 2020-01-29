<template>
  <el-main>
    <template v-if="!isIE">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </el-main>
</template>

<script>
import { isIE } from '@/utils/utils';
import { Main } from 'element-ui';
export default {
  name: 'content-wrap',
  components: {
    'el-main': Main,
  },
  data() {
    return {
      isIE: isIE(),
    };
  },
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
/* .content{
  padding: 0 30px;
} */
.el-main {
  background: #edf0f4;
  padding-top: 0;
}
</style>
