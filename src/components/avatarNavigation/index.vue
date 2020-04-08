<template>
  <div>
    <div class="avatar">
      <img
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3617305860,3974013488&fm=26&gp=0.jpg"
      />
    </div>
    <ul class="nav-menu user-dropdown-list" v-if="toggleShowUserDropDown">
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
          <a>
            <icon-font icon="icondianzan3" class="nav-menu-item-icon" />
            <span>我赞过的</span>
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
        <li class="nav-menu-item">
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
import { mapState } from 'vuex';
export default {
  name: 'avatarNavigation',
  computed: {
    ...mapState({
      toggleShowUserDropDown: state => state.toggleShowUserDropDown,
    }),
  },
};
</script>
<style lang="less" scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
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
