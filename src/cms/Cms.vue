<template>
  <div id="cms">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'cms',
  methods: {
    ...mapActions(['getAllConstant']),
  },
  created() {
    this.getAllConstant(); // 获取常量
  },
};
</script>
