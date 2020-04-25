<template>
  <div class="article-suspended-panel">
    <div class="like-btn panel-btn with-badge" badge="1"></div>
    <div class="comment-btn panel-btn" badge="0" @click="jumpToComment"></div>
    <div class="collect-btn panel-btn"></div>
  </div>
</template>
<script>
export default {
  name: 'articleSuspended',
  methods: {
    jumpToComment() {
      document.querySelector('#article-comment-wrapper').scrollIntoView(true);
    },
  },
};
</script>
<style lang="less" scoped>
.article-suspended-panel {
  position: fixed;
  margin-left: -5rem;
  top: 16rem;
}
.panel-btn {
  position: relative;
  margin-bottom: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  background-repeat: no-repeat;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
  &.with-badge:after {
    content: attr(badge);
    position: absolute;
    top: 0;
    left: 75%;
    padding: 0.1rem 0.4rem;
    font-size: 1rem;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    background-color: #b2bac2;
    border-radius: 0.7rem;
    transform-origin: left top;
    transform: scale(0.75);
  }
}
.like-btn {
  background-position: 53% 46%;
  background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/zan.b4bb964.svg);
}
.comment-btn {
  background-position: 50% 55%;
  background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/comment.7fc22c2.svg);
}
.collect-btn {
  background-position: 50% 50%;
  background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/collect.1db122b.svg);
}
</style>
