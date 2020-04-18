<template>
  <div class="comment-wrapper">
    <div>
      <comment-item />
    </div>
  </div>
</template>
<script>
import commentItem from './item.vue';
export default {
  name: 'comment',
  components: {
    commentItem,
  },
};
</script>
