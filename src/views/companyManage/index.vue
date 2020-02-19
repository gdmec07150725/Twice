<template>
  <div>
    <card>
      <div slot="search">公司管理</div>
      <div slot="buttonGroup">
        <el-button>新增公司</el-button>
      </div>
    </card>
  </div>
</template>
<script>
import card from '@/components/card';
import { Button } from 'element-ui';
import { mapActions } from 'vuex';
export default {
  name: 'companyManage',
  components: {
    card,
    'el-button': Button,
  },
  methods: {
    ...mapActions(['getAllCompanyList']),
    async handleClick() {
      try {
        const res = await this.getAllCompanyList();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
