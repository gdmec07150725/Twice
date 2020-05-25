<template>
  <div class="announce-container" v-click-out="handleCloseAnnounce">
    <div class="announce-icon" @click="handleToggleAnnounce">
      <icon-font icon="icon-tongzhi" :size="24" />
    </div>
    <div class="announce-wrapper" v-if="showAnnounce">
      <div class="announce-header-wrapper">
        <div class="action-btn">
          用户信息
        </div>
        <div class="action-btn">
          系统信息
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'announce',
  data() {
    return {
      showAnnounce: false,
    };
  },
  methods: {
    handleToggleAnnounce() {
      this.showAnnounce = !this.showAnnounce;
    },
    handleCloseAnnounce() {
      this.showAnnounce = false;
    },
  },
};
</script>
<style lang="less" scoped>
.announce-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  .announce-icon:hover {
    color: #007fff;
    cursor: pointer;
  }
}
.announce-wrapper {
  position: absolute;
  top: 100%;
  right: -20px;
  width: 336px;
  max-height: 400px;
  min-height: 250px;
  z-index: 2;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.announce-header-wrapper {
  height: 35px;
  border-bottom: 1px solid #eee;
  display: flex;
  .action-btn {
    position: relative;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -12px;
      width: 1px;
      height: 24px;
      background-color: #ebebeb;
    }
  }
}
</style>
