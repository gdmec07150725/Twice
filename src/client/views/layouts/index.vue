<template>
  <div class="main-wrapper">
    <navbar />
    <container />
  </div>
</template>
<script>
import navbar from './navbar';
import container from './container';
export default {
  name: 'layouts',
  components: {
    navbar,
    container,
  },
};
</script>
