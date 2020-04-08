<template>
  <div class="searchInput">
    <el-input
      :placeholder="placeholder"
      v-model="inputValue"
      clearable
      type="text"
      maxlength="32"
      @change="onSubmitSearch"
      @keyup.enter.native="isIE && onSubmitSearch()"
      suffix-icon="el-input__icon el-icon-search"
    ></el-input>
  </div>
</template>

<script>
import { Input } from 'element-ui';
import { isIE } from '@/utils/utils';
export default {
  name: 'MSearch',
  components: {
    'el-input': Input,
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索...',
    },
    searchText: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.searchText,
      isIE: isIE(),
    };
  },
  methods: {
    onSubmitSearch() {
      this.$emit('onHandleSubmitSearch', this.inputValue);
    },
  },
};
</script>

<style>
.el-input__icon {
  cursor: pointer;
}
.searchInput {
  width: 324px;
}
</style>
