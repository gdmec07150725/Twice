<template>
  <div class="login_wrapper">
    <div class="login_title">Login</div>
    <el-input v-model="username" placeholder="admin" class="input"></el-input>
    <el-input
      v-model="password"
      placeholder="admin"
      type="password"
      class="input"
    ></el-input>
    <el-button type="primary" class="button" @click="handleSubmit">
      login
    </el-button>
  </div>
</template>

<script>
import { Input, Button } from 'element-ui';
import { setCookie } from '@/utils/utils';
import moment from 'moment';
export default {
  name: 'login',
  components: {
    'el-input': Input,
    'el-button': Button,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      const { username, password } = this;
      if (username === 'admin' && password === 'admin') {
        // 两小时之后过期 (提前5分钟过期)
        setCookie(true, 'isLogin', new Date(moment().add(115, 'minutes')));
        this.$router.replace({ name: 'workplace' });
      }
    },
  },
};
</script>
<style scoped lang="less">
.login_wrapper {
  position: absolute;
  width: 480px;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  .login_title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .input {
    margin-bottom: 15px;
  }
  .button {
    width: 100%;
  }
}
</style>
