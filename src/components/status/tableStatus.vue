<template>
  <div v-if="statusLabel">
    <span class="statusWrapper" :class="backgroundClass">
      {{ statusLabel }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'tableStatus',
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  computed: {
    statusLabel() {
      if (this.status) {
        if (this.status === 'ARTICLE_STATUS_DRAFT') {
          return '草稿';
        }
        if (this.status === 'ARTICLE_STATUS_CHECKING') {
          return '待审核';
        }
        if (this.status === 'ARTICLE_STATUS_REJECT') {
          return '拒绝';
        }
        if (this.status === 'ARTICLE_STATUS_ADOPT') {
          return '发布';
        }
      }
      return '';
    },
    backgroundClass() {
      if (this.status) {
        if (this.status === 'ARTICLE_STATUS_DRAFT') {
          return 'draft';
        }
        if (this.status === 'ARTICLE_STATUS_CHECKING') {
          return 'submited';
        }
        if (this.status === 'ARTICLE_STATUS_REJECT') {
          return 'rejected';
        }
        if (this.status === 'ARTICLE_STATUS_ADOPT') {
          return 'published';
        }
      }
      return '';
    },
  },
};
</script>
<style scoped>
.statusWrapper {
  display: inline-block;
  padding: 0 9px;
  color: #fff;
  border: 1px;
  border-radius: 3px;
  font-size: 12px;
}
.draft {
  background-color: #6261ae;
}
.published {
  background-color: #5fb7c7;
}
.submited {
  background-color: #e89648;
}
.rejected {
  background-color: #c86552;
}
.approved {
  background-color: #69ac6f;
}
</style>
