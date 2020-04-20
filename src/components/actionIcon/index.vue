<template>
  <div>
    <div class="action-row">
      <ul class="action-list">
        <li class="item like">
          <a class="title-box">
            <img
              src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg"
              class="icon"
            />
            <span class="count">10</span>
          </a>
        </li>
        <li class="item comment" @click.stop="handleComment">
          <a class="title-box">
            <img
              src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg"
              class="icon"
            />
            <span class="count">23</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'actionIcon',
  methods: {
    handleComment() {
      this.$emit('onHandleReply');
    },
  },
};
</script>
<style lang="less" scoped>
.action-row {
  a {
    color: inherit;
  }
  .action-list {
    display: inline-flex;
    white-space: nowrap;
  }
  .action-list > .item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 24px;
    line-height: 1;
    white-space: nowrap;
    color: #b2bac2;
    border-radius: 1px;
    // border: 1px solid #edeeef;
  }
  .action-list > .item:hover {
    cursor: pointer;
  }
  .action-list > .item.like {
    padding: 0;
  }
  .action-list > .item .title-box {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
  }
  .action-list > .item .count {
    color: #b2bac2;
    font-weight: 700;
  }
  .action-list > .item.comment {
    margin-left: -1;
    padding: 0;
  }
}
</style>
