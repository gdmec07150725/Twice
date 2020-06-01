<template>
  <div class="login_wrapper">
    <div class="login_container">
      <div class="login_title">
        <img src="@/assets/img/logo_big.png" />
      </div>
      <el-input
        v-model="email"
        placeholder="请输入邮箱"
        class="input"
        @keyup.enter.native="handleSubmit"
      ></el-input>
      <el-input
        v-model="password"
        placeholder="请输入密码"
        type="password"
        class="input"
        @keyup.enter.native="handleSubmit"
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
      email: '',
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
      const { email, password } = this;
      if (email && password) {
        // 两小时之后过期 (提前5分钟过期)
        const params = {
          email,
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
  created() {
    storage.clear();
  },
};
</script>
<style scoped lang="less">
.login_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #66b1ff;
}
.login_container {
  position: absolute;
  left: 50%;
  top: 200px;
  width: 350px;
  height: 230px;
  padding: 25px;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .login_title {
    font-size: 25px;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
  }
  .input {
    margin-bottom: 15px;
  }
  .button {
    width: 100%;
  }
}
</style>
