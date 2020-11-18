<template>
  <div v-click-out="handleCloseAvatar">
    <user-avatar :url="user.avatar" @click.native="handleAvatarClick" />
    <ul class="nav-menu user-dropdown-list" v-if="showAvatar">
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <a>
            <icon-font icon="iconxiewenzhang" class="nav-menu-item-icon" />
            <span>写文章</span>
          </a>
        </li>
        <li class="nav-menu-item">
          <a>
            <icon-font icon="iconcaogao" class="nav-menu-item-icon" />
            <span>草稿</span>
          </a>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <a>
            <icon-font icon="iconwodezhuye" class="nav-menu-item-icon" />
            <span>我的主页</span>
          </a>
        </li>
        <li class="nav-menu-item">
          <a @click="handleJumpToMyArticle">
            <icon-font icon="icondianzan3" class="nav-menu-item-icon" />
            <span>我的文章</span>
          </a>
        </li>
        <li class="nav-menu-item">
          <a>
            <icon-font
              icon="iconshoucangxuanzhong"
              class="nav-menu-item-icon"
            />
            <span>我的收藏集</span>
          </a>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <a>
            <icon-font icon="iconshezhi" class="nav-menu-item-icon" />
            <span>设置</span>
          </a>
        </li>
        <li class="nav-menu-item">
          <a>
            <icon-font icon="iconguanyu" class="nav-menu-item-icon" />
            <span>关于</span>
          </a>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item" @click="handleJumpToCms">
          <a>
            <icon-font icon="icondengchu" class="nav-menu-item-icon" />
            <span>打开管理后台</span>
          </a>
        </li>
        <li class="nav-menu-item" @click="handleLogout">
          <a>
            <icon-font icon="icondengchu" class="nav-menu-item-icon" />
            <span>登出</span>
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import userAvatar from '@/components/userAvatar';
import { mapGetters } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'avatarNavigation',
  components: {
    userAvatar,
  },
  data() {
    return {
      showAvatar: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    handleAvatarClick() {
      this.showAvatar = !this.showAvatar;
    },
    handleCloseAvatar() {
      this.showAvatar = false;
    },
    handleJumpToCms() {
      const url = '/cms.html#/workplace';
      window.open(url);
    },
    handleJumpToMyArticle() {
      this.handleCloseAvatar();
      this.$router.push({ name: 'myArticle' });
    },
    handleLogout() {
      storage.clear();
      window.location.reload();
    },
  },
};
</script>
<style lang="less" scoped>
.nav-menu {
  position: absolute;
  top: 100%;
  margin: 0;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(177, 180, 185, 0.45);
  border-radius: 4px;
  font-size: 14px;
  .nav-menu-item-group {
    padding: 12px 0;
  }
  .nav-menu-item-group:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }
  .nav-menu-item {
    font-size: 16px;
    cursor: pointer;
    a {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      color: #71777c;
      .nav-menu-item-icon {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        color: #b2bac2;
      }
    }
  }
}
.nav-menu.user-dropdown-list {
  width: 157px;
  right: 0;
  left: auto;
}
</style>
