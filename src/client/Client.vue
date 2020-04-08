<template>
  <div id="client" @click="handleAppClick">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'client',
  methods: {
    ...mapMutations(['CLOSEDROUPDOWN']),
    handleAppClick() {
      this.CLOSEDROUPDOWN();
    },
  },
};
</script>
