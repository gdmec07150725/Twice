<template>
  <div class="welcome-context">
    <div class="trend-suspended">
      <ul class="navigation">
        <li
          class="nav-item"
          :class="{ active: navigationAction === item.value }"
          v-for="item in navigationList"
          :key="item.value"
          @click="navigationAction = item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <context-left>
      <div slot="leftContent" class="leftContent">
        <div class="trend-main">
          <div class="trend-editor-wrapper">
            <div class="trend-editor">
              <div
                id="trend-input"
                class="trend-input"
                contenteditable="true"
                @blur="handleBlur"
                @input="handleInput($event)"
              />
              <div class="trend-image-wrapper" v-if="imageList.length > 0">
                <div
                  class="image-item"
                  v-for="(item, index) in imageList"
                  :key="index"
                >
                  <img :src="item" width="100%" height="100%" />
                  <span class="delete" @click="handleDelete(index)">
                    <icon-font
                      icon="icon-close"
                      :size="10"
                      class="image-close-icon"
                      color="#fff"
                    />
                  </span>
                </div>
                <div class="image-item" @click="handleImageClick">
                  <icon-font
                    icon="icon-add"
                    :size="20"
                    class="image-add-icon"
                    color="#8c939d"
                  />
                </div>
              </div>
            </div>
            <action
              :show="true"
              :showImageIcon="true"
              @onHandleSelectedEmoji="handleSelectedEmoji"
              @onHandleImageClick="handleImageClick"
              @onHandleSubmit="handleSubmit"
            />
            <customizeUpload
              ref="customizeUpload"
              @onHandleStartUpload="handleStartUpload"
              @onHandleImageUrl="handleImageUrl"
            />
          </div>
          <template v-if="trendsList.length > 0">
            <div :canScroll="canScroll" v-scroll-to-load="judgePagination">
              <trendItemUI parentPage="trend" :trendsList="trendsList" />
            </div>
          </template>
        </div>
      </div>
    </context-left>
    <context-right />
  </div>
</template>
<script>
import contextLeft from '@/components/context/contextLeft.vue';
import contextRight from '@/components/context/contextRight.vue';
import action from '@/components/comment/action.vue';
import customizeUpload from '@/components/customizeUpload';
import trendItemUI from '@/businessComponent/trendItemUI';
import { mapActions } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'trend',
  components: {
    contextLeft,
    contextRight,
    action,
    customizeUpload,
    trendItemUI,
  },
  data() {
    return {
      page: 1,
      size: 10,
      totalPage: 0,
      imageList: [],
      trendContent: '',
      trendsList: [],
      showComment: false,
      navigationList: [
        {
          label: '全部',
          value: 1,
        },
        {
          label: '自己',
          value: 2,
        },
        {
          label: '关注',
          value: 3,
        },
      ],
      navigationAction: 1,
      sel: '',
      range: '',
      textContent: '',
      canScroll: true,
    };
  },
  methods: {
    ...mapActions(['addTrend', 'getAllTrendByCompany']),
    handleBlur() {
      this.sel = window.getSelection()
        ? window.getSelection()
        : document.selection;
      this.range = this.sel.createRange
        ? this.sel.createRange()
        : this.sel.getRangeAt(0);
      // this.range.deleteContents();
    },
    insertHtmlAtCaret(html) {
      if (window.getSelection) {
        // IE9 and non-IE
        if (this.sel.getRangeAt && this.sel.rangeCount) {
          var el = document.createElement('div');
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          this.range.insertNode(frag);
          // Preserve the selection
          if (lastNode) {
            this.range = this.range.cloneRange();
            this.range.setStartAfter(lastNode);
            this.range.collapse(true);
            this.sel.removeAllRanges();
            this.sel.addRange(this.range);
          }
        }
      } else if (document.selection && document.selection.type != 'Control') {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
      this.textContent = document.getElementById('trend-input').innerHTML;
      this.trendContent = this.textContent;
    },
    handleInput(e) {
      this.trendContent = e.target.innerHTML;
    },
    handleSelectedEmoji(url) {
      if (!this.range) {
        document.getElementById('trend-input').focus();
        document.getElementById('trend-input').blur();
      }
      this.textContent = `<img class="emoji" src="${url}" width="20px" height="20px" style="vertical-align: sub; margin: 0 1px" />`;
      this.insertHtmlAtCaret(this.textContent);
    },
    handleImageClick() {
      this.$refs['customizeUpload'] &&
        this.$refs['customizeUpload'].handleUpload();
    },
    handleStartUpload() {
      // this.openLoading();
    },
    handleImageUrl(url) {
      // this.closeLoading();
      this.imageList.push(url);
    },
    handleDelete(index) {
      this.imageList.splice(index, 1);
      console.log(this.imageList);
    },
    resetData() {
      this.page = 1;
      this.totalPage = 0;
      this.trendsList = [];
      this.imageList = [];
    },
    handleSubmit() {
      if (this.trendContent) {
        const params = {
          content: this.trendContent,
          userId: JSON.parse(storage.getUserDetail()).id,
          companyId: JSON.parse(storage.getCompanyDetail()).id,
        };
        if (this.imageList.length > 0) {
          params.images = this.imageList.map(item => ({ url: item }));
        } else {
          params.images = [];
        }
        this.createNewTrend(params);
      }
    },
    async createNewTrend(params) {
      try {
        await this.addTrend(params);
        this.trendContent = '';
        document.getElementById('trend-input').innerHTML = '';
        this.resetData();
        this.queryAllTrend();
      } catch (error) {
        console.log(error);
      }
    },
    judgePagination() {
      console.log('触发了');
      // 判断页码，当前页码加1如果大于或总页码就不能请求了
      const { page, totalPage } = this;
      if (totalPage && page + 1 > totalPage) {
        return;
      }
      const params = {
        page: page + 1,
      };
      this.queryAllTrend(params);
    },
    async queryAllTrend(params) {
      try {
        const id = JSON.parse(storage.getCompanyDetail()).id;
        const concatParams = {
          id,
          page: this.page,
          size: this.size,
          ...params,
        };
        this.canScroll = false;
        const res = await this.getAllTrendByCompany(concatParams);
        const { currentPage, result, totalPage } = res || {};
        this.page = currentPage;
        this.trendsList = this.trendsList.concat(result);
        this.totalPage = totalPage;
        this.canScroll = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.queryAllTrend();
  },
};
</script>
<style lang="less" scoped>
.welcome-context {
  margin-top: 15px;
}
.trend-suspended {
  position: fixed;
  top: 75px;
  width: 110px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 2px;
  .navigation {
    padding: 12px;
    .nav-item {
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-radius: 3px;
      font-size: 14px;
      color: #909090;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &.active {
        background-color: #007fff;
        color: #fff;
      }
      &:hover {
        color: #007fff;
        background: hsla(0, 0%, 94.9%, 0.6);
      }
    }
  }
}
.leftContent {
  display: flex;
  justify-content: flex-end;
  .trend-main {
    width: 570px;
  }
}
.trend-editor-wrapper {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  .trend-editor {
    min-height: 90px;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 10px;
    .trend-input {
      flex: 1;
      min-height: 75px;
      padding: 8px 10px;
      font-size: 15px;
    }
    .trend-image-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 12px;
      .image-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 2px;
        border: 1px dashed #c5c5c5;
        background: #f8f8f9;
        margin-right: 10px;
        .image-add-icon {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 80px;
          text-align: center;
          cursor: pointer;
        }
        .delete {
          width: 18px;
          height: 18px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 5px;
          right: 5px;
          border-radius: 50%;
          border: 1px solid #c5c5c5;
          background: rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
