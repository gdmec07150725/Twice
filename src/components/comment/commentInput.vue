<template>
  <div>
    <div class="reply-input-box">
      <div
        :id="_uid"
        class="rich-input"
        :class="{ empty: !replyContent }"
        contenteditable="true"
        spellcheck="fasle"
        :placeholder="isReplyArticle ? '输入评论...' : `回复${replyName}...`"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput($event)"
      ></div>
    </div>
    <action
      :show="showReplyAction"
      @onHandleSubmit="handleSubmit"
      @onHandleSelectedEmoji="handleSelectedEmoji"
    />
  </div>
</template>
<script>
import action from './action.vue';
export default {
  name: 'commentInput',
  components: {
    action,
  },
  props: {
    isReplyArticle: {
      // 是否为回复文章
      type: Boolean,
      default: false,
    },
    replyName: {
      // 被回复人名称
      type: String,
      default: '',
    },
  },
  data() {
    return {
      replyContent: '',
      showReplyAction: !this.isReplyArticle,
      sel: '',
      range: '',
      textContent: '',
    };
  },
  methods: {
    handleInput(e) {
      this.replyContent = e.target.innerHTML;
    },
    handleFocus() {
      if (this.isReplyArticle) {
        this.showReplyAction = true;
      }
    },
    handleSubmit() {
      console.log('replyContent', this.replyContent);
      if (this.isReplyArticle) {
        this.$emit('onReplyArticle', this.replyContent);
      } else {
        this.$emit('onReplyComment', this.replyContent);
      }
    },
    handleBlur() {
      this.sel = window.getSelection();
      this.range = this.sel.getRangeAt(0);
      this.range.deleteContents();
    },
    insertHtmlAtCaret(html) {
      if (window.getSelection) {
        console.log('进来了');
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
      this.textContent = document.getElementById(this._uid).innerHTML;
      console.log('dom', this.textContent);
      this.replyContent = this.textContent;
    },
    handleSelectedEmoji(url) {
      // $('.rich-input').focus();
      this.textContent = `<img class="emoji" src="${url}" width="20px" height="20px" style="vertical-align: sub; margin: 0 1px" />`;
      this.insertHtmlAtCaret(this.textContent);
    },
  },
};
</script>
<style lang="less" scoped>
.reply-input-box {
  display: flex;
  width: 100%;
  border-color: #007fff;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  .rich-input {
    position: relative;
    flex: 1;
    padding: 8px 16px;
    line-height: 1.7;
    color: #17181a;
    outline: none;
    min-height: 18px;
    font-size: 15px;
  }
  .rich-input::before {
    content: attr(placeholder);
    position: absolute;
    opacity: 0.4;
    pointer-events: none;
    user-select: none;
  }
  .rich-input:not(.empty)::before {
    display: none;
  }
}
</style>
