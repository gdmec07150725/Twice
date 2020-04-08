<template>
  <div class="deleteButton_wrapper">
    <el-button
      type="danger"
      :disabled="disabled"
      :icon="icon"
      :size="size"
      :loading="loading"
      @click.stop="handleClick"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui';
export default {
  name: 'deleteButton',
  components: {
    'el-button': Button,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    permission: {
      // 权限
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
