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
    <el-button
      type="primary"
      class="button"
      @click="handleSubmit"
      :loading="loading"
    >
      login
    </el-button>
  </div>
</template>

<script>
import { Input, Button } from 'element-ui';
import storage from '@/utils/storage';
import { mapActions } from 'vuex';
export default {
  name: 'login',
  components: {
    'el-input': Input,
    'el-button': Button,
  },
  watch: {
    $route: {
      handler: function(route) {
        // 立即执行
        console.log(route);
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  methods: {
    ...mapActions(['logIn']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    handleSaveToken(token, refreshToken) {
      /* 保存 token 和refresh token */
      storage.saveAccessToken(token);
      storage.saveRefreshToken(refreshToken);
    },
    handleSubmit() {
      const { username, password } = this;
      if (username && password) {
        // 两小时之后过期 (提前5分钟过期)
        const params = {
          username,
          password,
        };
        this.handleLogin(params);
        // this.$router.replace({ name: 'workplace' });
      }
    },
    async handleLogin(params) {
      try {
        this.loading = true;
        const res = await this.logIn(params);
        const {
          // message,
          data: { refreshToken, token, user, company },
        } = res;
        // message && this.$message.success(message);
        storage.setLogin(1);
        storage.setUserDetail(JSON.stringify(user));
        storage.setCompanyDetail(JSON.stringify(company));
        this.handleSaveToken(token, refreshToken);
        this.loading = false;
        this.handleJumpPage();
      } catch (error) {
        this.loading = false;
        this.handleError(error);
      }
    },
    handleJumpPage() {
      this.$router.push({
        path: this.redirect || '/',
        query: this.otherQuery,
      });
    },
  },
};
</script>
<style scoped lang="less">
.login_wrapper {
  position: absolute;
  width: 350px;
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
