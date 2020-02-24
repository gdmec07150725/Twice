<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'app',
  methods: {
    ...mapActions(['getAllConstant']),
  },
  created() {
    this.getAllConstant(); // 获取常量
  },
};
</script>
