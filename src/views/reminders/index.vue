<template>
  <div>
    <reminders-list />
  </div>
</template>

<script>
import remindersList from '@/views/businessComponent/reminders/remindersList.vue';
export default {
  name: 'reminders',
  components: {
    remindersList,
  },
};
</script>
