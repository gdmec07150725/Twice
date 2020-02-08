<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
export default {
  name: 'icon-font',
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
    },
  },
  computed: {
    classes() {
      return ['iconfont', `${this.icon}`];
    },
    styles() {
      return {
        color: this.color,
        fontSize: `${this.size}px`,
      };
    },
  },
};
</script>
