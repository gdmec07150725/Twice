<template>
  <div :class="`${language}_${formName}`" style="position: relative;">
    <el-upload
      class="quill-avatar-uploader"
      :action="baseURL"
      :multiple="true"
      :show-file-list="false"
      accept=".png, .jpg, .bmp, .gif, .webp"
      :on-success="handleQuillAvatarSuccess"
      :before-upload="beforeQuillAvatarUpload"
    >
      <i class="el-icon-plus avatar-uploader-icon" style="display: none"></i>
    </el-upload>

    <div
      :id="`${language}_parent_${formName}`"
      :ref="`${language}_parent_${formName}`"
    >
      <quill-editor
        :id="`${language}_${formName}`"
        v-if="reload"
        class="ql-editor quill-editor-wrapper"
        :content="content"
        :options="editorOption"
        :ref="`${language}_${formName}`"
        @change="handleChange($event)"
        @ready="onHandleReady($event)"
      ></quill-editor>
      <span
        :id="`${language}_full_btn_${formName}`"
        class="normal-screenfull-btn"
        @click="toggleFullScreen"
      >
        <icon-font
          :size="16"
          :icon="isFullScreen ? 'icon-suoxiao' : 'icon-fangda'"
        />
      </span>
      <div class="resizable-b" ref="refresizable">
        <span class="resizable-cursor">
          <icon-font class="resizable-b-arrow" :icon="'icon-icon'" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{'direction': 'rtl'}],                         // text direction

  // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{'font': []}],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'], // remove formatting button
];

import { Upload } from 'element-ui';
import configs from '@/configs';
import Quill from 'quill';
import { quillEditor } from './vue-quill-editor';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
import iconFont from '_c/icon-font';
import jQuery from 'jquery';

import hljs from 'highlight.js';

let Link = Quill.import('formats/link');
class FileBlot extends Link {
  // 继承Link Blot
  static create(value) {
    let node = undefined;
    if (value && !value.href) {
      // 适应原本的Link Blot
      node = super.create(value);
    } else {
      // 自定义Link Blot
      node = super.create(value.href);
      node.setAttribute('download', true); // 左键点击即下载
      node.innerText = value.innerText;
    }
    return node;
  }
}
FileBlot.blotName = 'link';
FileBlot.tagName = 'A';
Quill.register(FileBlot);

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'editor',
  components: {
    'quill-editor': quillEditor,
    'el-upload': Upload,
    iconFont,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    formName: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
    },
    needReload: {
      type: Boolean,
      default: false,
    },
    defaultHeight: {
      type: [Number, String],
      default: 100,
    },
  },
  watch: {
    value(newVal) {
      // console.log("needReload value", newVal);
      // 存储到临时变量，如果需要重绘，在重绘里面重新赋值
      this._content = newVal;
    },
    needReload(newVal) {
      // 富文本初始化touch问题已经修复，不再需要重新reload路由了
      if (newVal) {
        this.reload = false;
        this.$nextTick(() => {
          this.content = this._content;
          this.reload = true;
        });
      }
    },
    defaultHeight(newVal) {
      this.height = newVal;
    },
  },
  data() {
    return {
      isFullScreen: false,
      link: '',
      tempLinkText: '',
      dialogFormVisible: false,
      reload: true,
      // eslint-disable-next-line vue/no-reserved-keys
      _content: '', // 临时存储，为了reload的情况
      content: '',
      baseURL: `${configs.serverURL}/upload-service/upload`,
      editorOption: {
        placeholder: '',
        bounds: `#${this.language}_parent_${this.formName} .quill-editor-wrapper`,
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: value => {
                if (value) {
                  document
                    .querySelector(
                      `.${this.language}_${this.formName} .quill-avatar-uploader .avatar-uploader-icon`
                    )
                    .click();
                } else {
                  this.quill.format('image', false);
                }
              },
            },
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value,
          },
        },
      },
      dataLoading: '',
      height: 100,
      maxH: 600,
      minH: 100,
      resizeState: 0,
      h: this.height,
      mouseX: 0,
      mouseY: 0,
      offsetX: 0,
      offsetY: 0,
      diffY: 0,
      toolbarTip: [
        {
          Choice: '.ql-bold',
          title: '加粗',
        },
        {
          Choice: '.ql-italic',
          title: '斜体',
        },
        {
          Choice: '.ql-underline',
          title: '下划线',
        },
        {
          Choice: '.ql-header',
          title: '段落格式',
        },
        {
          Choice: '.ql-strike',
          title: '删除线',
        },
        {
          Choice: '.ql-blockquote',
          title: '块引用',
        },
        {
          Choice: '.ql-code',
          title: '插入代码',
        },
        {
          Choice: '.ql-code-block',
          title: '插入代码段',
        },
        {
          Choice: '.ql-font',
          title: '字体',
        },
        {
          Choice: '.ql-size',
          title: '字体大小',
        },
        {
          Choice: '.ql-list[value="ordered"]',
          title: '编号列表',
        },
        {
          Choice: '.ql-list[value="bullet"]',
          title: '项目列表',
        },
        {
          Choice: '.ql-direction',
          title: '文本方向',
        },
        { Choice: '.ql-header[value="1"]', title: 'h1' },
        { Choice: '.ql-header[value="2"]', title: 'h2' },
        {
          Choice: '.ql-align',
          title: '对齐方式',
        },
        {
          Choice: '.ql-color',
          title: '字体颜色',
        },
        {
          Choice: '.ql-background',
          title: '背景颜色',
        },
        {
          Choice: '.ql-image',
          title: '图片',
        },
        {
          Choice: '.ql-video',
          title: '视频',
        },
        {
          Choice: '.ql-link',
          title: '插入超链接',
        },
        { Choice: '.ql-formula', title: '插入公式' },
        {
          Choice: '.ql-clean',
          title: '清除字体格式',
        },
        {
          Choice: '.ql-script[value="sub"]',
          title: '下标',
        },
        {
          Choice: '.ql-script[value="super"]',
          title: '上标',
        },
        {
          Choice: '.ql-indent[value="-1"]',
          title: '向左缩进',
        },
        {
          Choice: '.ql-indent[value="+1"]',
          title: '向右缩进',
        },
        {
          Choice: '.ql-header .ql-picker-label',
          title: '标题大小',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="1"]',
          title: '标题一',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="2"]',
          title: '标题二',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="3"]',
          title: '标题三',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="4"]',
          title: '标题四',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="5"]',
          title: '标题五',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="6"]',
          title: '标题六',
        },
        {
          Choice: '.ql-header .ql-picker-item:last-child',
          title: '标准',
        },
        {
          Choice: '.ql-size .ql-picker-item[data-value="small"]',
          title: '小号',
        },
        {
          Choice: '.ql-size .ql-picker-item[data-value="large"]',
          title: '大号',
        },
        {
          Choice: '.ql-size .ql-picker-item[data-value="huge"]',
          title: '超大号',
        },
        { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
        {
          Choice: '.ql-align .ql-picker-item:first-child',
          title: '居左对齐',
        },
        {
          Choice: '.ql-align .ql-picker-item[data-value="center"]',
          title: '居中对齐',
        },
        {
          Choice: '.ql-align .ql-picker-item[data-value="right"]',
          title: '居右对齐',
        },
        {
          Choice: '.ql-align .ql-picker-item[data-value="justify"]',
          title: '两端对齐',
        },
      ],
    };
  },
  computed: {
    editor() {
      return this.$refs[`${this.language}_${this.formName}`].quill;
    },
  },
  methods: {
    handleEnter(range) {
      let quill = this.$refs[`${this.language}_${this.formName}`].quill;
      quill.insertText(range.index, '\n ');
      setTimeout(() => {
        let nowRange = quill.getSelection().index;
        quill.setSelection(nowRange);
      }, 0);
    },
    handleQuillAvatarSuccess(res) {
      console.log(res);
      const { data } = res;
      // 获取富文本组件实例
      let quill = this.$refs[`${this.language}_${this.formName}`].quill;
      if (data) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，http为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', data);
        // 调整光标到最后
        quill.setSelection(length + 1);
        this.closeLoading();
      } else {
        this.$message.error('图片插入失败');
        this.closeLoading();
      }
    },
    beforeQuillAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG && !isPNG) {
        this.$message.error(
          this.$t('components_upload_index_err_check_format')
        );
        return false;
      }
      if (!isLt10M) {
        this.$message.error(this.$t('components_upload_index_err_check_size'));
        return false;
      }
      this.openLoading();
      return (isJPG || isPNG) && isLt10M;
    },
    // 打开loading
    openLoading() {
      this.dataLoading = '';
      this.dataLoading = this.$loading({
        // lock: true,
        target: this.isFullScreen
          ? document.getElementById(`${this.language}_parent_${this.formName}`)
          : document.getElementById(`${this.language}_${this.formName}`),
      });
    },
    closeLoading() {
      this.dataLoading.close();
    },
    handleChange({ html }) {
      this.content = html;
      this.$emit('input', html);
    },
    fullScreen() {
      document
        .getElementById(`${this.language}_${this.formName}`)
        .setAttribute(
          'class',
          'quill-editor quill-editor-wrapper full-screenfull'
        );
      document
        .getElementById(`${this.language}_parent_${this.formName}`)
        .setAttribute('class', 'parent-full-screenfull');
      document
        .getElementById(`${this.language}_full_btn_${this.formName}`)
        .setAttribute('class', 'full-screenfull-btn');
      jQuery(`#${this.language}_parent_${this.formName} .ql-container`).css({
        height: '100%',
        'padding-bottom': '57px',
      });
    },
    exitFullScreen() {
      document
        .getElementById(`${this.language}_${this.formName}`)
        .setAttribute('class', 'quill-editor quill-editor-wrapper');
      document
        .getElementById(`${this.language}_parent_${this.formName}`)
        .setAttribute('class', '');
      document
        .getElementById(`${this.language}_full_btn_${this.formName}`)
        .setAttribute('class', 'normal-screenfull-btn');
      jQuery(`#${this.language}_parent_${this.formName} .ql-container`).css({
        height: this.height + 'px',
        'padding-bottom': '15px',
      });
    },
    toggleFullScreen() {
      if (this.isFullScreen) {
        this.exitFullScreen();
        this.isFullScreen = false;
      } else {
        this.fullScreen();
        this.isFullScreen = true;
      }
    },
    handleMove(event) {
      if (this.resizeState !== 0) {
        // let diffX = event.clientX - this.mouseX + this.offsetX;
        let diffY = event.clientY - this.mouseY + this.offsetY;
        if (diffY <= this.minH) {
          diffY = this.minH;
        } else if (diffY >= this.maxH) {
          diffY = this.maxH;
        } else {
          this.h = diffY;
        }
        jQuery(`#${this.language}_parent_${this.formName} .ql-container`).css({
          height: this.h + 'px',
        });
      }
    },
    handleDown(event) {
      if (
        this.$refs[`${this.language}_parent_${this.formName}`] &&
        this.$refs[`${this.language}_parent_${this.formName}`].contains(
          event.target
        ) &&
        (event.target.classList.contains('resizable-b-arrow') ||
          event.target.classList.contains('resizable-b'))
      ) {
        this.resizeState = 1;
        document.body.style.cursor = 's-resize';
        event.preventDefault && event.preventDefault();
        this.offsetX = this.offsetY = 0;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.offsetY = document.querySelector(
          `#${this.language}_parent_${this.formName} .ql-container`
        ).offsetHeight;
      }
    },
    handleUp() {
      document.body.style.cursor = '';
      this.resizeState = 0;
      this.diffY = 0;
    },
    initEditorEvent() {
      // this.editor.addContainer(this.$refs.refresizable);
      jQuery(`#${this.language}_parent_${this.formName} .ql-container`).append(
        this.$refs.refresizable
      );
      jQuery('.ql-container').css({ height: this.height });
      document.documentElement.removeEventListener(
        'mousemove',
        this.handleMove
      );
      document.documentElement.addEventListener(
        'mousemove',
        this.handleMove,
        true
      );
      document.documentElement.removeEventListener(
        'mousedown',
        this.handleDown
      );
      document.documentElement.addEventListener(
        'mousedown',
        this.handleDown,
        true
      );
      document.documentElement.removeEventListener('mouseup', this.handleUp);
      document.documentElement.addEventListener('mouseup', this.handleUp, true);
    },
    onHandleReady() {
      this.initEditorEvent();
    },
    // 工具栏提示
    autoTip() {
      // document.getElementsByClassName(`#${this.language}_parent_${this.formName} .ql-editor`)[0].dataset.placeholder = '';
      for (let item of this.toolbarTip) {
        let tip = document.querySelector(
          `#${this.language}_parent_${this.formName} .quill-editor ` +
            item.Choice
        );
        if (!tip) continue;
        tip.setAttribute('title', item.title);
      }
    },
  },
  updated() {
    // console.log('重新更新');
    this.$nextTick(() => {
      this.autoTip();
    });
  },
  created() {
    this.content = this.value;
    this._content = this.value;
    this.height = this.defaultHeight;
  },
  mounted() {
    this.initEditorEvent();
    this.$nextTick(() => {
      this.autoTip();
    });
  },
};
</script>
<style type="text/less" lang="less" scoped>
.quill-avatar-uploader {
  display: none;
}
</style>
<style type="text/less" lang="less">
.quill-link-dailog .el-dialog__body {
  padding: 10px 20px !important;
}
.quill-link-dailog .el-dialog {
  width: 600px !important;
}
.full-screenfull .ql-container {
  max-height: 100%;
  height: calc(100% - 42px);
}
.full-screenfull {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 1901;
  width: 100%;
  height: 100%;
}
.parent-full-screenfull {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1900;
}
.full-screenfull-btn {
  position: absolute;
  top: 2px;
  right: 10px;
  cursor: pointer;
  z-index: 1990;
}
.normal-screenfull-btn {
  position: absolute;
  top: 2px;
  right: 10px;
  cursor: pointer;
}
.quill-editor-wrapper {
  height: 100%;
  //   min-height: 150px;
  //   max-height: 800px;
}
.quill-editor-wrapper .ql-container {
  padding-bottom: 15px;
  overflow-x: hidden;
}
.ql-toolbar {
  white-space: normal !important;
}

// 隐藏link tooltip
// .quill-editor-wrapper .ql-container .ql-tooltip {
//   display: none;
// }
.resizable-b {
  display: block;
  position: absolute;
  z-index: 90;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: s-resize;
  height: 25px;
  bottom: 0;
  width: 100%;
  left: 0;
  text-align: right;
  /* background: #ccc; */
}

.resizable-cursor {
  color: #bcbcbc;
  display: block;
  width: 22px;
  height: 22px;
  padding: 3px;
  float: right;
}
.ql-toolbar.ql-snow,
.ql-container.ql-snow {
  border: none !important;
}
</style>
