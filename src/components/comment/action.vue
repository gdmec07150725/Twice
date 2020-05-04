<template>
  <div class="reply-action" v-if="show">
    <div class="replay-icon-wrapper">
      <div class="reply-icon emoji" @click.stop="toggleShowEmoji">
        <div
          class="icon"
          style="background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/emoji.5594dbb.svg)"
        ></div>
        <span>表情</span>
        <div
          class="emoji-selector"
          v-if="showEmoji"
          v-click-out="handleCloseEmoji"
          @click.stop="() => {}"
        >
          <div class="triangle"></div>
          <div class="emoji-content">
            <ul class="category">
              <li class="item" @click="handleSelectedEmoji">
                <img
                  class="emoji-item"
                  src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg"
                />
              </li>
              <li class="item">
                <img
                  class="emoji-item"
                  src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg"
                />
              </li>
              <li class="item">
                <img
                  class="emoji-item"
                  src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg"
                />
              </li>
              <li class="item">
                <img
                  class="emoji-item"
                  src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg"
                />
              </li>
              <li class="item">
                <img
                  class="emoji-item"
                  src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="reply-icon" v-if="showImageIcon" @click="handleImageClick">
        <div
          class="icon"
          style="background-image: url(https://b-gold-cdn.xitu.io/v3/static/img/active_file.d265f4e.svg)"
        ></div>
        <span>图片</span>
      </div>
    </div>
    <div class="reply-button">
      <button class="submit-btn" @click="handleSubmit">评论</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'action',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showImageIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showEmoji: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('onHandleSubmit');
    },
    toggleShowEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    handleSelectedEmoji() {
      this.$emit(
        'onHandleSelectedEmoji',
        'https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f603.svg'
      );
    },
    handleCloseEmoji() {
      if (this.showEmoji) {
        this.showEmoji = false;
      }
    },
    handleImageClick() {
      this.$emit('onHandleImageClick');
    },
  },
};
</script>
<style lang="less" scoped>
.reply-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .replay-icon-wrapper {
    display: flex;
    flex: 1;
    .reply-icon {
      display: flex;
      color: #027fff;
      margin-right: 20px;
      cursor: pointer;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        background-repeat: no-repeat;
        background-size: cover;
      }
      span {
        font-size: 13px;
      }
    }
    .emoji {
      position: relative;
      .emoji-selector {
        position: absolute;
        padding: 12px;
        top: 30px;
        z-index: 1;
        bottom: 0;
        width: 280px;
        height: 210px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.16);
        cursor: default;
        & .triangle {
          position: absolute;
          top: -10px;
          left: 12%;
          width: 0;
          height: 0;
          transform: translate(-50%, -50%);
          border: 10px solid transparent;
          border-bottom-color: #fff;
        }
        & .emoji-content {
          margin-bottom: 10px;
          .category {
            max-width: 280px;
            max-height: 225px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            .item {
              font-size: 16px;
              padding: 5px;
              cursor: pointer;
              .emoji-item {
                display: block;
                width: 22px;
                height: 22px;
              }
            }
            .item:hover .emoji-item {
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
  .reply-button {
    .submit-btn {
      padding: 8px 16px;
      color: #fff;
      background-color: #027fff;
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
