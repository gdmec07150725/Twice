<template>
  <div>
    <el-button
      v-permission="permission"
      type="success"
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
  name: 'editButton',
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
