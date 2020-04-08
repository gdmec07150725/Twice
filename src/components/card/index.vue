<template>
  <el-card class="box-card" :body-style="bodyStyle">
    <div class="headerWrapper">
      <div class="searchContent">
        <slot name="search"></slot>
      </div>
      <div class="operationContent">
        <slot name="buttonGroup"></slot>
      </div>
    </div>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </el-card>
</template>

<script>
import { Card } from 'element-ui';
export default {
  name: 'MCard',
  components: {
    'el-card': Card,
  },
  props: {
    bodyStyle: {
      type: Object,
      default: () => ({
        padding: '30px',
      }),
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.headerWrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}
.box-card {
  width: 100%;
}
.searchContent {
  width: 100%;
}
</style>
